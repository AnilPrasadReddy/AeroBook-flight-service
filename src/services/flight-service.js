const moment = require('moment');
const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const { AppError } = require('../utils/error/app-error');
const { compareTimes } = require('../utils/helpers/datetime-helper');
const { Op } = require('sequelize');
const e = require('express');

const flightRepository = new FlightRepository()

async function createFlight(data) {
    try {
        const res = compareTimes(data.arrivalTime, data.departureTime);
        if (!res) {
            throw new AppError('Arrival time should be greater than departure time', StatusCodes.BAD_REQUEST);
        }
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        console.log(error);
        let explaination = [];
        if (error.name == 'SequelizeValidationError') {
            error.errors.forEach((err) => {
                explaination.push(err.message);
            })
            throw new AppError(explaination, StatusCodes.BAD_GATEWAY);
        }
        throw new AppError('Cannot create flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = " 23:59:00";
    // trips=MUM-DEL
    if (query.trips) {

        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
        // TODO: add a check that they are not same
    }
    if (query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice == undefined) ? 20000 : maxPrice)]
        }
    }
    if (query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }
    if (query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }
    if (query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters
    }
    console.log(customFilter, sortFilter);
    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id)
        return flight;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('No flight found', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot get flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateFlightSeats(data) {
    try {
        const { flightId, seats, dec } = data;
        const response = await flightRepository.updateFlightSeats(flightId, seats, dec);
        return response;
    } catch (error) {
        throw new AppError('Cannot update flight seats', StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateFlightSeats
}