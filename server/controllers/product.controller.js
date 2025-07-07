const { Product } = require('../models');

// Create a product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    console.error('Create Product Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error('Get All Products Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Get Product by ID Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.update(req.body);
    res.json(product);
  } catch (err) {
    console.error('Update Product Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete Product Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// controllers/product.controller.js
exports.createSimpleProduct = async (req, res) => {
  try {
    const { name } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!name || !imagePath) {
      return res.status(400).json({ message: 'Name and image are required.' });
    }

    const product = await Product.create({
      name,
      mainImage: imagePath,
    });

    res.status(201).json(product);
  } catch (err) {
    console.error('Create Simple Product Error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
