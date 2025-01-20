'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.createTable('users',{
      id_user:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull:false
    },
    email:{
        type: Sequelize.STRING,
        unique:true
    },
    password:Sequelize.STRING,
    username:Sequelize.STRING,
    user_avatar:Sequelize.STRING,
    admin:Sequelize.STRING,
    status:Sequelize.STRING,
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE,
    deletedAt:Sequelize.DATE
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
