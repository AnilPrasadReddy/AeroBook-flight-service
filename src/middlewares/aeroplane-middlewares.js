const { StatusCodes } = require("http-status-codes");
const { error } = require("winston");

function isValidCreateReq(req,res,next){
    if(!req.body.modelNumber || !req.body.capacity){
        return res.status(StatusCodes.BAD_REQUEST).json({
            success:false,
            msg:"Something went wrong while creating the Aeroplane",
            data:{},
            error:{explaination:"Invalid or Insufficient Crendentials"}
        });
    }
    next();
}

module.exports={
    isValidCreateReq
}