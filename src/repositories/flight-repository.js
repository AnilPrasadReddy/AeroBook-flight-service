const { Flight, Aeroplane, Airport } = require('../models')
const CrudRepository = require('./crud-repository')
const {Sequelize} = require('sequelize')

class FlightRepository extends CrudRepository {
  constructor() {
    super(Flight);
  }

  async getAllFlights(filter, sort) {
    const response = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          model: Aeroplane,
          required: true,
          as: 'aeroplaneDetail',
        },
        {
          model: Airport,
          required: true,
          as: 'departureAirport',
          on: {
            col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
          },
        },
        {
          model: Airport,
          required: true,
          as: 'arrivalAirport',
          on: {
            col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
          },
        }
      ]
    });
    return response;
  }

}

module.exports = FlightRepository;