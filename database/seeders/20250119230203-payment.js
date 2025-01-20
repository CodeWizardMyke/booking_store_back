'use strict';
const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        const dataPath = path.resolve(__dirname, '../data/payment.json');
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
        const formattedData = data.map(item => ({
          ...item,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        }));
     await queryInterface.bulkInsert('payment', formattedData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('payment', null, {});
  }
};
