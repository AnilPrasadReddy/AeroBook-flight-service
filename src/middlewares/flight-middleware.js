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

module.exports={
    isValidFlight
}