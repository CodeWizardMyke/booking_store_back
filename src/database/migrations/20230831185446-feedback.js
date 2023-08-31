'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('feedback',{
      id_feedback:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        unique:true
    },
    subject:Sequelize.STRING,
    msg:Sequelize.STRING,
    status:Sequelize.STRING,
    fk_id_user:{
      type:Sequelize.INTEGER,
      references:{
        model:'users',
        key:'id_user'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE',
    },
    createdAT:Sequelize.DATE,
    updatedAt:Sequelize.DATE,
    })
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('feedback')
  }
};
