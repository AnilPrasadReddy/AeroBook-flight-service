const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/error/app-error");

function isValidFlight(req,res,next){
    const { flightNumber, aeroplaneId, departureAirportId, arrivalAirportId, arrivalTime, departureTime, price, boardingGate, totalSeats } = req.body;

    if(!flightNumber||!aeroplaneId||!departureAirportId||!arrivalAirportId||!arrivalTime||!departureTime||!price,!boardingGate||!totalSeats){
        ErrorResponse.message="Something went wrong while creating the Flight";
        ErrorResponse.error=new AppError("Flight details are required",StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

function isValidUpdate(req,res,next){
    const flightId = req.params.id;
    const {seats} = req.body;
    if(!flightId||!seats){
        ErrorResponse.message="Something went wrong while updating the Flight Seats";
        ErrorResponse.error=new AppError("All Flight-Seats Updating details are required",StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports={
    isValidFlight,
    isValidUpdate
}