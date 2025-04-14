const { ErrorResponse } = require("../utils/common");
const { AppError } = require("../utils/error/app-error");

async function isValidCity(req,res,next){
    const { name } = req.body();
    if(!name){
        ErrorResponse.message="Something went wrong while creating the City";
        ErrorResponse.error=new AppError("City name is required",StatusCodes.BAD_REQUEST);
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

module.exports={
    isValidCity,
}