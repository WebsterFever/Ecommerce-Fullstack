const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  sku: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },

  brand: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },

  images: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },

  mainImage: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  galleryImages: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },

  shortDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  fullDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  details: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },

  careInstructions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },

  sizeOptions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },

  inseamOptions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  

  isFreeShipping: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  timestamps: true,
});

module.exports = Product;
