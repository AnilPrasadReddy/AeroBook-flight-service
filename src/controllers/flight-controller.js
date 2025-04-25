const { StatusCodes } = require('http-status-codes');
const { FlightService } = require('../services')
const { ErrorResponse, SuccessResponse } = require('../utils/common')

async function createFlight(req, res) {
    try {
        const { flightNumber, aeroplaneId, departureAirportId, arrivalAirportId, arrivalTime, departureTime, price, boardingGate, totalSeats } = req.body;
        console.log(req.body);
        const flight = await FlightService.createFlight({ flightNumber, aeroplaneId, departureAirportId, arrivalAirportId, arrivalTime, departureTime, price, boardingGate, totalSeats });

        SuccessResponse.message = "Flight created successfully";
        SuccessResponse.data = flight;
        return res.status(StatusCodes.OK).json(SuccessResponse);

    } catch (error) {
        ErrorResponse.message = "Something went wrong while creating the flight";
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAllFlights(req, res) {
    try {
        const query = req.query;
        console.log(query);
        const flights = await FlightService.getAllFlights(query);
        SuccessResponse.message = "Flights fetched successfully";
        SuccessResponse.data = flights;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while fetching the flight";
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getFlight(req, res) {
    try {
        const { id } = req.params;
        const flight = await FlightService.getFlight(id);
        SuccessResponse.message = "Flight fetched successfully";
        SuccessResponse.data = flight;
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.message = "Soming went wrong while getting the fkight";
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function updateFlightSeats(req, res) {
    try {
        const flightId = req.params.id;
        const { seats, dec } = req.body;
        const response = await FlightService.updateFlightSeats({ flightId, seats, dec });
        SuccessResponse.message = "Flight Seats are Updated Successfully";
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while updating the flight seats";
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateFlightSeats
}