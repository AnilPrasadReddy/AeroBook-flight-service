'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Airports',{
      type:'foreign key',
      fields:['cityId'],
      name:'city_foreign_key',
      references:{
        table:'Cities',
        field:'id'
      },
      onDelete:'cascade',
  
    })
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.removeConstraint('Airports','city_foreign_key');
  }
};
