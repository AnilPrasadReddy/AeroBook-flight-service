const { StatusCodes } = require('http-status-codes');
const {AirportService} = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');


async function createAirport(req,res){
    try {
        const {airport_name,code,address,cityId} = req.body;
        const airport = await AirportService.createAirport({
            airport_name,code,address,cityId
        })
        SuccessResponse.message="Created Successfully";
        SuccessResponse.data=airport;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getAirports(req, res) {
    try {
        const airports = await AirportService.getAirports();
        SuccessResponse.message = "Fetched Successfully";
        SuccessResponse.data = airports;
        return res.status(StatusCodes.OK).json(SuccessResponse); 
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}


async function getAirport(req, res) {
    try {
        const { id } = req.params;
        const airport = await AirportService.getAirport(id);
        SuccessResponse.message = "Fetched Successfully";
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while fetching the airport";
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function updateAirport(req,res){
    try {
        const { id} = req.params;
        const { airport_name,code,address,cityId } = req.body;
        const airport = await AirportService.updateAirport(id, {
            airport_name,code,address,cityId            
        });
        SuccessResponse.message = "Updated Successfully";
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while updating the airport";
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function deleteAirport(req,res) {
    try {
        const { id } = req.params;
        const airport  = await AirportService.deleteAirport(id);
        SuccessResponse.message = "Deleted Successfully";
        SuccessResponse.data = airport;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Something went wrong while deleting the airport";
        ErrorResponse.error = error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
        
    }
}


module.exports={
    createAirport,
    getAirports,
    getAirport,
    updateAirport,
    deleteAirport
}