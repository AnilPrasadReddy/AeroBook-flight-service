const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const { CityService } = require('../services');

async function createCity(req,res){
    try {
        const {name} = req.body;
        const city = await CityService.createCity({
            name
        })
        SuccessResponse.message="Created Successfully";
        SuccessResponse.data=city;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message="Something went wrong while creating the city";
        ErrorResponse.error=error;
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getAllCities(req,res){
    try {
        const cities = await CityService.getAllCities();
        SuccessResponse.message="Fetched Successfully";
        SuccessResponse.data=cities;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message="Something went wrong while fetching the cities";
        ErrorResponse.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function getCity(req,res){
    try {
        const city = await CityService.getCity(req.params.id);
        SuccessResponse.message="Fetched Successfully";
        SuccessResponse.data=city;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message="Something went wrong while fetching the city";
        ErrorResponse.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function updateCity(req,res){
    try {
        const { id } = req.params;
        const { name } = req.body;
        const city = await CityService.updateCity(id, {
            name
        });
        SuccessResponse.message="Updated Successfully";
        SuccessResponse.data=city;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message="Something went wrong while updating the city";
        ErrorResponse.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

async function deleteCity(req,res){
    try{
        const {id} = req.params;
        const response = await CityService.deleteCity(id);
        SuccessResponse.message="Deleted Successfully";
        SuccessResponse.data=response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.message="Something went wrong while deleting the city";
        ErrorResponse.error=error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports={
    createCity,
    getAllCities,
    getCity,
    updateCity,
    deleteCity
}