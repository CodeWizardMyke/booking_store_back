'use strict';
const fs = require('fs');
const path = require('path');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        const dataPath = path.resolve(__dirname, '../data/cart.json');
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
        const formattedData = data.map(item => ({
          ...item,
        }));
     await queryInterface.bulkInsert('cart', formattedData, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cart', null, {});
  }
};
