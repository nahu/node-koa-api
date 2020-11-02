/* eslint-disable no-unused-vars */

const { genders } = require('../constants/model');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'name',
      },
      lastname: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'lastname',
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'email',
      },
      phone: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'phone',
      },
      documentNumber: {
        type: Sequelize.TEXT,
        allowNull: true,
        field: 'document_number',
      },
      gender: {
        type: Sequelize.ENUM(...Object.values(genders)),
        allowNull: true,
        field: 'gender',
      },
      bornDate: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'born_date',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  },
};
