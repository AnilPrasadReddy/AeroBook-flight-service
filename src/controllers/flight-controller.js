const { StatusCodes } = require('http-status-codes');
const {FlightService} = require('../services')
const { ErrorResponse, SuccessResponse } = require('../utils/common')

async function createFlight(req,res) {
    try {
        const {flightNumber,aeroplaneId,departureAirportId,arrivalAirportId,arrivalTime,departureTime,price,boardingGate,totalSeats} = req.body;
        console.log(req.body);
        const flight = await FlightService.createFlight({flightNumber,aeroplaneId,departureAirportId,arrivalAirportId,arrivalTime,departureTime,price,boardingGate,totalSeats});

        SuccessResponse.message="Flight created successfully";
        SuccessResponse.data=flight;
        return res.status(StatusCodes.OK).json(SuccessResponse);

    } catch (error) {
        ErrorResponse.message="Something went wrong while creating the flight";
        ErrorResponse.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAllFlights(req,res) {
    try {
        const query = req.query;
        console.log(query);
        const flights = await FlightService.getAllFlights(query);
        SuccessResponse.message="Flights fetched successfully";
        SuccessResponse.data=flights;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message="Something went wrong while fetching the flight";
        ErrorResponse.error=error;
        return res.status(error.statusCode||StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports={
    createFlight,
    getAllFlights
}