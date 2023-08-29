'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cart', {
      id_cart: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      item_price: {
        type: Sequelize.DECIMAL
      },
      request_price: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      status_delivery: {
        type: Sequelize.STRING
      },
      qtd_items: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      type_selected: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_cpf: {
        type: Sequelize.STRING
      },
      fk_id_books: {
        type: Sequelize.INTEGER,
        references: {
          model: 'books',
          key: 'id_books'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      fk_id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', 
          key: 'id_user'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cart');
  }
};
