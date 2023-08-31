'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('users',{
      id_user:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        unique:true
    },
    email:Sequelize.STRING,
    password:Sequelize.STRING,
    username:Sequelize.STRING,
    user_avatar:Sequelize.STRING,
    status:Sequelize.STRING,
    admin:Sequelize.STRING,
    createdAt:Sequelize.DATE,
    updatedAt:Sequelize.DATE,
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('users')
  }
};
