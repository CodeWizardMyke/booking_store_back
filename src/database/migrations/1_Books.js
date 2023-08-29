'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('books', {
      id_books: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      publishing_company: {
        type: Sequelize.STRING
      },
      edition: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      synopsis: {
        type: Sequelize.STRING
      },
      front_cover: {
        type: Sequelize.STRING
      },
      genre: {
        type: Sequelize.STRING
      },
      kindle_price: {
        type: Sequelize.DECIMAL
      },
      common_price: {
        type: Sequelize.DECIMAL
      },
      special_price: {
        type: Sequelize.DECIMAL
      },
      publication_date: {
        type: Sequelize.STRING
      },
      dimensions: {
        type: Sequelize.STRING
      },
      number_pages: {
        type: Sequelize.STRING
      },
      inventory: {
        type: Sequelize.INTEGER
      },
      language: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('books');
  }
};
