const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/error/app-error");


function isValidAirport(req,res,next) {
    if(!req.body.airport_name || !req.body.code || !req.body.address || !req.body.cityId){
        ErrorResponse.message="Something went wrong while creating the Airport";
        ErrorResponse.error=new AppError("Name, Code, Address and City ID are required",StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports={
    isValidAirport
}