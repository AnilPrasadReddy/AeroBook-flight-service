const { raw } = require("mysql2");
const { logger } = require("sequelize/lib/utils/logger");


class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            logger.error("Error in CRUD-repo: 'create'", error);
            throw error;
        }
    }

    async destroy(id) {
        try {
            const response = await this.model.destroy({
                where: {
                    id: id
                }
            });
            return response;
        } catch (error) {
            logger.error("Error in CRUD-repo: 'destroy'", error);
            throw error;
        }
    }

    async get(id) {
        try {
            const response = await this.model.findByPk(id);  // ✅ Fixed typo: getByPk -> findByPk
            return response;
        } catch (error) {
            logger.error("Error in CRUD-repo: 'get'", error);
            throw error;
        }
    }

    async getAll() {
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            logger.error("Error in CRUD-repo: 'getAll'", error);
            throw error;
        }
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
