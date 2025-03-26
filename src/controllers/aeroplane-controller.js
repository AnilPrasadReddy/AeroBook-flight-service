const { StatusCodes } = require('http-status-codes');
const {AeroplaneService} = require('../services');
const { response } = require('express');

async function createAeroplane(req,res){
    try {
        const {modelNumber,capacity} = req.body;
        const aeroplane = await AeroplaneService.createPlane({
            modelNumber,capacity
        })
        return res.status(StatusCodes.CREATED).json({
            success:true,
            msg:"Created Successfully",
            response:aeroplane,
            error:{}
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            msg:"Failed Successfully",
            response:{},
            error:error
        });
    }
}

module.exports={
    createAeroplane
}