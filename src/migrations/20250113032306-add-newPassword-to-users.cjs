'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'newPassword', {
      type: Sequelize.STRING,
      allowNull: true, // ou false, dependendo de como você vai usar
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'newPassword');
  },
};