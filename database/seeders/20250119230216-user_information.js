'use strict';
const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      const dataPath = path.resolve(__dirname, '../data/user_information.json');
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  
      const formattedData = data.map(item => ({
        ...item,
        createdAt: new Date(item.createdAt),
        updatedAt: new Date(item.updatedAt),
        deletedAt: item.deletedAt ? new Date(item.deletedAt) : null,
      }));
      
     await queryInterface.bulkInsert('user_information', formattedData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_information', null, {});
  }
};
