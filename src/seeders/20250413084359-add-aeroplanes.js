'use strict';

const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Aeroplanes',[
      {
        modelNumber: 'Boeing-747',
        capacity: 400,
        createdat: new Date(),
        updatedat: new Date(),
      },
      {
        modelNumber: 'Airbus-A380',
        capacity: 600,
        createdat: new Date(),
        updatedat: new Date(),
      },
      {
        modelNumber: 'Boeing-737',
        capacity: 200,
        createdat: new Date(),
        updatedat: new Date(),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Aeroplanes', {
      [Op.or]: [
        { modelNumber: 'Boeing-747' },
        { modelNumber: 'Airbus-A380' },
        { modelNumber: 'Boeing-737' }
      ]
    });
  }
};
