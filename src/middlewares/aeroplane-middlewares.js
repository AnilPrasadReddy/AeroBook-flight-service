const { StatusCodes } = require("http-status-codes");

const {ErrorResponse} = require('../utils/common');
const { AppError } = require("../utils/error/app-error");

function isValidCreateReq(req,res,next){
    if(!req.body.modelNumber || !req.body.capacity){
        ErrorResponse.message="Something went wrong while creating the Aeroplane";
        ErrorResponse.error=new AppError("Model Number and Capacity are required",StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports={
    isValidCreateReq
}
