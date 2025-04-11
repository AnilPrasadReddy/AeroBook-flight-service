const { StatusCodes } = require('http-status-codes');
const {AeroplaneService} = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');


async function createAeroplane(req,res){
    try {
        const {modelNumber,capacity} = req.body;
        const aeroplane = await AeroplaneService.createPlane({
            modelNumber,capacity
        })
        SuccessResponse.message="Created Successfully";
        SuccessResponse.data=aeroplane;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAllAeroplanes(req, res) {
    try {
        const aeroplanes = await AeroplaneService.getAllAeroplanes();
        SuccessResponse.message = "Fetched Successfully";
        SuccessResponse.data = aeroplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse); 
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}


async function getAeroplane(req, res) {
    try {
        const { id } = req.params;
        const aeroplane = await AeroplaneService.getAeroplane(id);
        SuccessResponse.message = "Fetched Successfully";
        SuccessResponse.data = aeroplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while fetching the aeroplane";
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function updateAeroplane(req,res){
    try {
        const { id} = req.params;
        const { modelNumber, capacity } = req.body;
        const aeroplane = await AeroplaneService.updateAeroplane(id, {
            modelNumber, capacity
        });
        SuccessResponse.message = "Updated Successfully";
        SuccessResponse.data = aeroplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while updating the aeroplane";
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function deleteAeroplane(req,res) {
    try {
        const { id } = req.params;
        const aeroplane  = await AeroplaneService.deleteAeroplane(id);
        SuccessResponse.message = "Deleted Successfully";
        SuccessResponse.data = aeroplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while deleting the aeroplane";
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
        
    }
}


module.exports={
    createAeroplane,
    getAeroplane,
    getAllAeroplanes,
    updateAeroplane,
    deleteAeroplane
}