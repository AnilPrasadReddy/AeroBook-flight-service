const { response } = require("express");
const { logger } = require("sequelize/lib/utils/logger");

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data){
        try {
            const response = await this.model.create(data);
            return response;
        } catch (error) {
            logger.error("An error has occured at CRUD-repo : 'create' ");
            throw error;
        }
    }

    async destroy(data){
        try {
            const response = await this.model.destroy({
                where:{
                    id:data
                }
            });
            return response;
        } catch (error) {
            logger.error("An error has occured at CRUD-repo : 'destroy'");
            throw error;
        }
    }

    async get(data){
        try {
            const reponse =  await this.model.getByPk(data);
            return response;
        } catch (error) {
            logger.error("An error has occured at CRUD-repo : 'get'");
            throw error;
        }
    }

    async getAll(){
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            logger.error("An error has occured at CRUD-repo : 'getAll'");
            throw error;
        }
    }

    async update(id,data){
        try {
            const response = await this.model.update(data,{
                where:{
                    id:id
                }
            })
        } catch (error) {
            logger.error("An has occured at CRUD-repo : 'update'");
            throw error;
        }
    }
}
module.exports=CrudRepository;