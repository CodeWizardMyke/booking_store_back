'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('bestsaler', {
      id_bestsaler:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement:true,
          allowNull:false
      },
      purchasing_score:{
          type:Sequelize.INTEGER,
          allowNull:true
      },
      visited_score:{   
          type:Sequelize.INTEGER,
          allowNull:true
      },
      fk_id_books:{
        type:Sequelize.INTEGER,
        references:{
          model:"books",
          key:"id_books"
        }
      },
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('bestsaler');
  }
};
