// controllers/cart.controller.js
const { Cart, CartItem, Product, User } = require('../models');

// Create a new cart for a user (if it doesn't exist)
exports.createCart = async (userId) => {
  let cart = await Cart.findOne({ where: { userId } });
  if (!cart) {
    cart = await Cart.create({ userId });
  }
  return cart;
};

// Get cart and its items for a specific user
exports.getCartByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({
      where: { userId },
      include: {
        model: CartItem,
        include: Product,
      },
    });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Clear cart (delete all cart items)
exports.clearCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    await CartItem.destroy({ where: { cartId } });
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.deleteCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    await CartItem.destroy({ where: { cartId } });
    await Cart.destroy({ where: { id: cartId } });
    res.json({ message: 'Cart deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
