const { Flight, Aeroplane, Airport } = require('../models')
const CrudRepository = require('./crud-repository')
const {Sequelize, where} = require('sequelize')
const db = require('../models');
const { addRowLockOnFlights } = require('./queries');

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

  async updateFlightSeats(flightId,seats,dec=true){
    await db.sequelize.query(addRowLockOnFlights(flightId));
    const flight = await Flight.findByPk(flightId);
    if(dec){
      await flight.decrement('totalSeats',{
        by:seats,
        where:{
          id:flightId
        }
      })
    }
    else{
     await flight.increment('totalSeats',{
        by:seats,
        where:{
          id:flightId
        }
      });
    }
    return flight;
  }

}

module.exports = FlightRepository;