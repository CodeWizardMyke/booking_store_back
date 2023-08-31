'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('bestsaler', {
      id_bestsaler:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
      },
      purchasing_score:Sequelize.INTEGER,
      visited_score:Sequelize.INTEGER,
      fk_id_books:{
        type:Sequelize.INTEGER,
        references:{
          model:'books',
          key:'id_books'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
      },
      createdAt:Sequelize.DATE,
      updatedAt:Sequelize.DATE,
    })
  },

  async down (queryInterface, Sequelize) {
      return queryInterface.dropTable('bestsaler')
  }
};
