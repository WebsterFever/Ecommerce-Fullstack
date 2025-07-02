// models/CartItem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CartItem = sequelize.define('CartItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  cartId: {
    type: DataTypes.UUID,
    // 🔧 TEMPORARY: Set to true for easier testing in tools like Insomnia.
    // In production, this will be set automatically by the backend from the logged-in user's cart.
    // 🔐 IMPORTANT: Change to allowNull: false before going live.
    allowNull: true,
  },

  productId: {
    type: DataTypes.UUID,
    allowNull: false,
  },

  size: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  inseam: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
}, {
  timestamps: true,
});

module.exports = CartItem;
