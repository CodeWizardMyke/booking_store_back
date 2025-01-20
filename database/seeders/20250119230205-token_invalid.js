'use strict';
const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        const dataPath = path.resolve(__dirname, '../data/token_invalid.json');
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
        const formattedData = data.map(item => ({
          ...item,
          createdAt: new Date(item.createdAt),
          updatedAt: new Date(item.updatedAt),
        }));
     await queryInterface.bulkInsert('token_invalid', formattedData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('token_invalid', null, {});
  }
};
