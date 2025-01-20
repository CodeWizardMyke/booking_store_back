'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cart', {
      id_cart:{
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement:true,
          allowNull:false
      },
      item_price:Sequelize.DECIMAL,
      request_price:Sequelize.DECIMAL,
      qtd_items:Sequelize.INTEGER,
      status:Sequelize.STRING,
      type_selected:Sequelize.STRING,
      user_cpf:{
          type:Sequelize.STRING,
          allowNull:true
      },
      status_delivery:{
          type:Sequelize.STRING,
          allowNull:true
      },
      fk_id_books:{
        type:Sequelize.INTEGER,
        references:{
          model:"books",
          key:"id_books"
        }
      },
      fk_id_user:{
        type:Sequelize.INTEGER,
        references:{
          model:"users",
          key:"id_user"
        }
      },
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cart');
  }
};
