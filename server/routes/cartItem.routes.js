const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const cartItemController = require('../controllers/cartItem.controller');

// ➕ Add item to cart
router.post('/', protect, cartItemController.addItemToCart);

// 🔍 Get all items
router.get('/', protect, cartItemController.getCartItemsForUser);

// 🔄 Update item
router.put('/:itemId', protect, cartItemController.updateCartItem);

// ❌ Remove item
router.delete('/:itemId', protect, cartItemController.removeCartItem);

module.exports = router;
