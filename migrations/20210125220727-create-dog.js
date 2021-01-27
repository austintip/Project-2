'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dogs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      bredfor: {
        type: Sequelize.STRING
      },
      lifespan: {
        type: Sequelize.STRING
      },
      temperament: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      },
      dogId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('dogs');
  }
};