'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_information', {
        id_user_information:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement:true,
      },
      full_name:Sequelize.STRING,
      email:Sequelize.STRING,
      telephone:Sequelize.STRING,
      birth_date:Sequelize.STRING,
      user_cpf:Sequelize.STRING,
      user_rg:Sequelize.STRING,
      state:Sequelize.STRING,
      city:Sequelize.STRING,
      cep:Sequelize.STRING,
      district:Sequelize.STRING,
      road:Sequelize.STRING,
      number:Sequelize.INTEGER,
      complements:Sequelize.STRING,
      fk_id_user:{
        type:Sequelize.INTEGER,
        references:{
          model:'Users',
          key:"id_user"
        }
      },
      createdAt:Sequelize.DATE,
      updatedAt:Sequelize.DATE,
      deletedAt:Sequelize.DATE
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_information');
  }
};
