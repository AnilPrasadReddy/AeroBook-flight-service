const { StatusCodes } = require('http-status-codes');
const { AeroplaneRepository } = require('../repositories');
const aeroplaneRepository = new AeroplaneRepository();

const { AppError } = require('../utils/error/app-error')

async function createPlane(data) {
    try {
        const aeroplane = await aeroplaneRepository.create(data);
        return aeroplane;
    } catch (error) {
        if (error.name == 'SequelizeValidationError') {
            let explaination = [];
            error.errors.forEach((err) => {
                explaination.push(err.message);
            })
            console.log(explaination);
            throw new AppError(explaination, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create Aeroplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllAeroplanes() {
    try {
        const aeroplanes = await aeroplaneRepository.getAll();
        return aeroplanes;
    } catch (error) {
        throw new AppError('Cannot fetch Aeroplanes', StatusCodes.INTERNAL_SERVER_ERROR);

    }
}

async function getAeroplane(id) {
    try {
        const aeroplane = await aeroplaneRepository.get(id);
        return aeroplane;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('No Aeroplanes found', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot delete Aeroplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }

}

async function updateAeroplane(id, data) {
    try {
        const response = await aeroplaneRepository.update(id, data);
        return response;
    } catch (error) {
        throw new AppError('Cannot update Aeroplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function deleteAeroplane(id) {
    try {
        const resposne = await aeroplaneRepository.destroy(id);
        return resposne;
    } catch (error) {
        if (error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('No Aeroplanes found', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot delete Aeroplane', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createPlane,
    getAeroplane,
    getAllAeroplanes,
    updateAeroplane,
    deleteAeroplane
}