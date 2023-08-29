'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_information', {
      id_user_information: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      full_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      telephone: {
        type: Sequelize.STRING
      },
      birth_date: {
        type: Sequelize.STRING
      },
      user_cpf: {
        type: Sequelize.STRING
      },
      user_rg: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      cep: {
        type: Sequelize.STRING
      },
      district: {
        type: Sequelize.STRING
      },
      road: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.INTEGER
      },
      complements: {
        type: Sequelize.STRING
      },
      fk_id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id_user'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_information');
  }
};
