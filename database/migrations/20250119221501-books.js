'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('books', {
      id_books:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement:true,
          allowNull:false
      },
      title:Sequelize.STRING,
      author:Sequelize.STRING,
      publishing_company:Sequelize.STRING,
      edition:Sequelize.STRING,
      status:Sequelize.STRING,
      synopsis:Sequelize.TEXT,
      front_cover:Sequelize.STRING,
      genre:Sequelize.STRING,
      kindle_price:Sequelize.STRING,
      common_price:Sequelize.STRING,
      special_price:{
          type:Sequelize.STRING,
          allowNull:true
      },
      publication_date:Sequelize.STRING,
      dimensions:Sequelize.STRING,
      number_pages:Sequelize.STRING,
      inventory:Sequelize.STRING,
      language:Sequelize.STRING,
      createdAt:Sequelize.DATE,
      updatedAt:Sequelize.DATE,
      deletedAt:Sequelize.DATE
     });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('books');
  }
};
