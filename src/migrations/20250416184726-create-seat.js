'use strict';

const {ENUMS} = require('../utils/common')

const {BUSINESS,ECONOMIC,PREMIUM_ECONOMY,FIRST_CLASS} = ENUMS.SEAT_TYPE;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Seats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      aeroplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'Aeroplanes',
          key:'id'
        },
        onDelete:'CASCADE'
      },
      row: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      col: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.ENUM,
        values: [BUSINESS, ECONOMIC, PREMIUM_ECONOMY, FIRST_CLASS],
        defaultValue: ECONOMIC,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Seats');
  }
};