const { raw } = require("mysql2");
const { logger } = require("sequelize/lib/utils/logger");
const { AppError } = require("../utils/error/app-error");
const { StatusCodes } = require("http-status-codes");


class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;
    }

    async destroy(id) {
        const response = await this.model.destroy({
            where: {
                id: id
            }
        });
        if(!response){
            throw new AppError(`No record found with id: ${id}`, StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async get(id) {

        const response = await this.model.findByPk(id);
        if (!response) {
            throw new AppError(`No record found with id: ${id}`, StatusCodes.NOT_FOUND);
        }
        return response;

    }

    async getAll() {

        const response = await this.model.findAll();
        return response;
    }

    async update(id, data) {
        try {
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            return response; 
        } catch (error) {
            logger.error("Error in CRUD-repo: 'update'", error);
            throw error;
        }
    }
    
}

module.exports = CrudRepository;
