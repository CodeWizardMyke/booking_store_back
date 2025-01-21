'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('payment', {
      id_payment:{
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
      },
      api_payment_id:Sequelize.INTEGER,
      api_mechant_order:Sequelize.STRING,
      api_payment_type: Sequelize.STRING,
      fk_id_user:{
        type:Sequelize.INTEGER,
        references:{
          model:"users",
          key:"id_user"
        }
      },
      fk_id_cart:Sequelize.STRING,
      status:Sequelize.STRING,
      price: Sequelize.INTEGER,
      createdAt:Sequelize.DATE,
      updatedAt:Sequelize.DATE,
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('payment');
  }
};
