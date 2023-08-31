'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('token_invalid', {
      id_token_invalid:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        unique:true
    },
    code:Sequelize.STRING,
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE,
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('token_invalid')
  }
};
