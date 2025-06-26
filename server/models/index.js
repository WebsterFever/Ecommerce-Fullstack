
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Import User model
const User = require('./user.model');

// Export Sequelize and models
module.exports = {
  sequelize,
  Sequelize,
  User,
};
