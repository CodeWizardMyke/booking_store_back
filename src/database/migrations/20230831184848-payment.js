'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('payment',{
      id_payment:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        unique:true
      },
      api_payment_id:Sequelize.INTEGER,
      api_mechant_order:Sequelize.STRING,
      api_payment_type:Sequelize.STRING,
      fk_id_user:{
        type:Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id_user'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
      },
      fk_id_cart:{
        type:Sequelize.INTEGER,
        references:{
          model:'cart',
          key:'id_cart'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
      },
      status:Sequelize.STRING,
      price:Sequelize.DECIMAL,
      createdAT:Sequelize.DATE,
      updatedAt:Sequelize.DATE,
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('payment')
  }
};
