
const { DataTypes } = require('sequelize');  
const postgres = require('../config/database');

const User = postgres.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: true, // allow null for social logins (e.g., Google)
  },

  googleId: {
    type: DataTypes.STRING,
    allowNull: true, // populated if logging in with Google
  },

  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

  avatar: {
    type: DataTypes.STRING, // for profile image (Google or custom)
    allowNull: true,
  }
}, {
  timestamps: true,
});

module.exports = User;
