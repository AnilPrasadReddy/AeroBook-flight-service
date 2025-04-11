const { StatusCodes } = require("http-status-codes");

const {ErrorResponse} = require('../utils/common')

function isValidCreateReq(req,res,next){
    if(!req.body.modelNumber || !req.body.capacity){
        ErrorResponse.message="Something went wrong while creating the Aeroplane";
        ErrorResponse.error={explaination:"Invalid or Insufficient Crendentials"};
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports={
    isValidCreateReq
}