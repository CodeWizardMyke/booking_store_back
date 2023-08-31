'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('cart', {
      id_cart:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
        unique:true
      },
      item_price:Sequelize.DECIMAL,
      request_price:Sequelize.INTEGER,
      status:Sequelize.STRING,
      status_delivery:Sequelize.STRING,
      qtd_items:{
          type:Sequelize.INTEGER,
          allowNull:false
      },
      type_selected:{
          type:Sequelize.STRING,
          allowNull:false
      },
      user_cpf:Sequelize.STRING,
      fk_id_books:{
        type:Sequelize.INTEGER,
        references:{
          model:'books',
          key:'id_books'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
      },
      fk_id_user:{
        type:Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id_user'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      createdAt:Sequelize.DATE,
      updatedAt:Sequelize.DATE,
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('cart')
  }
};
