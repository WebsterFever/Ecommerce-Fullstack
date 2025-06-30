const Sequelize = require('sequelize');
const sequelize = require('../config/database');

// Import models
const User = require('./user.model');
const Product = require('./product.model');
const Cart = require('./cart.model');
const CartItem = require('./cartItem.model');

// =====================
// 🔗 ASSOCIATIONS
// =====================

// USER 1:1 CART
User.hasOne(Cart, { foreignKey: 'userId', onDelete: 'CASCADE' });
Cart.belongsTo(User, { foreignKey: 'userId' });

// CART 1:M CARTITEM
Cart.hasMany(CartItem, { foreignKey: 'cartId', onDelete: 'CASCADE' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

// PRODUCT 1:M CARTITEM
Product.hasMany(CartItem, { foreignKey: 'productId', onDelete: 'CASCADE' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

// =====================
// Export Sequelize + all models
// =====================
module.exports = {
  sequelize,
  Sequelize,
  User,
  Product,
  Cart,
  CartItem,
};
