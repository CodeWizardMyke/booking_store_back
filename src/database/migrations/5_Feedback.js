'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('feedback', {
      id_feedback: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      subject: {
        type: Sequelize.STRING
      },
      msg: {
        type: Sequelize.STRING
      },
      status: {
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
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('feedback');
  }
};
