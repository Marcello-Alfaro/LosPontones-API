import sequelize from '../database/connection.js';
import { DataTypes } from 'sequelize';

const Payment = sequelize.define(
  'Payments',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    paymentId: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    from: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    to: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    registration: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    evidence: {
      type: DataTypes.STRING,
    },
    total: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
  },
  { paranoid: true }
);

export default Payment;
