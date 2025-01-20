'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('token_invalid', {
      id_token_invalid:{
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true
      },
      code:Sequelize.STRING,
      createdAt:Sequelize.DATE,
      updatedAt:Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('token_invalid');
  }
};
