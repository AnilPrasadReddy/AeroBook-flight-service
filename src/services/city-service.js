const { StatusCodes } = require("http-status-codes");
const { CityRepository } = require("../repositories");
const { AppError } = require("../utils/error/app-error");

const cityRepository = new CityRepository()

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            let explaination = [];
            error.errors.forEach((err) => {
                explaination.push(err.message);
            })
            console.log(explaination);
            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllCities() {
    try {
        const cities = await cityRepository.getAll();
        return cities;
    } catch (error) {
        throw new AppError('Cannot fetch Cities', StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function getCity(id) {
    try {
        const city = await cityRepository.get(id);
        return city;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('No Citites found', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot get City', StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

async function updateCity(id, data) {
    try {
        const response = await cityRepository.update(id, data);
        return response;
    } catch (error) {
        throw new AppError('Cannot update City', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function deleteCity(id) {
    try {
        const resposne = await cityRepository.destroy(id);
        return resposne;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('No Citites found', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot delete City', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createCity,
    getAllCities,
    getCity,
    updateCity,
    deleteCity
}