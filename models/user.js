/* eslint-disable no-unused-vars */

const { genders } = require('../constants/model');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id',
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'name',
      },
      lastname: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: 'lastname',
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'email',
      },
      phone: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'phone',
      },
      documentNumber: {
        type: DataTypes.TEXT,
        allowNull: true,
        field: 'document_number',
      },
      gender: {
        type: DataTypes.ENUM(...Object.values(genders)),
        allowNull: true,
        field: 'gender',
      },
      bornDate: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'born_date',
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      underscored: true,
      timestamps: true,
      tableName: 'users',
    }
  );

  return User;
};
