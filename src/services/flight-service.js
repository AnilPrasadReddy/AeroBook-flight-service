const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const { AppError } = require('../utils/error/app-error');
const { compareTimes } = require('../utils/helpers/datetime-helper');
const { Op } = require('sequelize');

const flightRepository = new FlightRepository()

async function createFlight(data) {
    try {
        const res = compareTimes(data.arrivalTime, data.departureTime);
        if(!res){
            throw new AppError('Arrival time should be greater than departure time', StatusCodes.BAD_REQUEST);
        }
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        console.log(error);
        let explaination = [];
        if(error.name=='SequelizeValidationError'){
            error.errors.forEach((err)=>{
                explaination.push(err.message);
            })
            throw new AppError(explaination,StatusCodes.BAD_GATEWAY);
        }
        throw new AppError('Cannot create flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query){
    let customFilter = {};
    if(!query){
        throw new AppError('Query is required', StatusCodes.BAD_REQUEST);
    }
    if(query.trips){
        [departureAirportId,arrivalAirportId]=query.trips.split('-');
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
        if(customFilter.departureAirportId == customFilter.arrivalAirportId){
            throw new AppError('Departure and Arrival airport cannot be same', StatusCodes.BAD_REQUEST);
        }
        if(!customFilter.departureAirportId || !customFilter.arrivalAirportId){
            throw new AppError('Departure and Arrival airport cannot be empty', StatusCodes.BAD_REQUEST);
        }
    }
    
    if(query.price){
        [minPrice,maxPrice]=query.price.split('-');
        customFilter.price={
            [Op.between]: [minPrice,(maxPrice == undefined ? 10000000 : maxPrice)]
        }
    }

    if(query.travellers){
        customFilter.totalSeats ={
            [Op.gte]: query.travellers
        }
    }

    try {
        const flights= await flightRepository.getAllFlights(customFilter);
        console.log(flights);
        if(flights==[]){
            throw new AppError('No Flights found', StatusCodes.NOT_FOUND);
        }
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights
}