const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth.middleware');
const cartController = require('../controllers/cart.controller');

// 🛒 Create cart for the logged-in user
router.post('/', protect, cartController.createCart);

// 🔍 Get the current user's cart
router.get('/', protect, cartController.getCartByUserId);

// ❌ Clear the cart for the current user
router.delete('/clear', protect, cartController.clearCart);

module.exports = router;
