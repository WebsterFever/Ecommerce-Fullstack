// routes/product.routes.js
const express = require('express');
const router = express.Router();

const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/product.controller');

const { protect, adminOnly } = require('../middleware/auth.middleware');

// Public routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Admin-only routes
router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);

module.exports = router;
