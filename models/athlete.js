import sequelize from '../database/connection.js';
import { DataTypes } from 'sequelize';

const Athlete = sequelize.define(
  'Athletes',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    athleteId: {
      type: DataTypes.DOUBLE,
      unique: true,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    homenumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bloodType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entryDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  { paranoid: true }
);

export default Athlete;
