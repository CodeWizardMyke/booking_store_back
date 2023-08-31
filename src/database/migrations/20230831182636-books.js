'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('books',{
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
    synopsis:Sequelize.STRING,
    front_cover:Sequelize.STRING,
    genre:Sequelize.STRING,
    kindle_price:Sequelize.DECIMAL,
    common_price:Sequelize.DECIMAL,
    special_price:{
        type:Sequelize.DECIMAL,
        allowNull:true
    },
    publication_date:Sequelize.STRING,
    dimensions:Sequelize.STRING,
    number_pages:Sequelize.STRING,
    inventory:Sequelize.INTEGER,
    language:Sequelize.STRING,
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE,
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('books')
  }
};
