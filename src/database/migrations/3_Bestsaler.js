'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bestsaler', {
      id_bestsaler: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      purchasing_score: {
        type: Sequelize.INTEGER
      },
      visited_score: {
        type: Sequelize.INTEGER
      },
      fk_id_books: {
        type: Sequelize.INTEGER,
        references: {
          model: 'books',
          key: 'id_books'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bestsaler');
  }
};
