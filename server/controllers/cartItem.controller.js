const { CartItem, Product, Cart } = require('../models');

// ➕ Add item to cart
const addItemToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, size, inseam, quantity } = req.body;

    // 🛒 Find or create the user's cart
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      cart = await Cart.create({ userId });
    }

    // 🔍 Check if the item already exists
    const existingItem = await CartItem.findOne({
      where: {
        cartId: cart.id,
        productId,
        size,
        inseam,
      },
    });

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();
      return res.status(200).json(existingItem);
    }

    const newItem = await CartItem.create({
      cartId: cart.id,
      productId,
      size,
      inseam,
      quantity: quantity || 1,
    });

    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add item to cart', details: err.message });
  }
};

// 🔍 Get all items in the logged-in user's cart
const getCartItemsForUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) return res.status(200).json([]);

    const items = await CartItem.findAll({
      where: { cartId: cart.id },
      include: [{ model: Product }],
    });

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch cart items', details: err.message });
  }
};

// 🔄 Update cart item
const updateCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity, size, inseam } = req.body;

    const item = await CartItem.findByPk(itemId);
    if (!item) return res.status(404).json({ error: 'Cart item not found' });

    if (quantity !== undefined) item.quantity = quantity;
    if (size !== undefined) item.size = size;
    if (inseam !== undefined) item.inseam = inseam;

    await item.save();

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update cart item', details: err.message });
  }
};

// ❌ Remove item from cart
const removeCartItem = async (req, res) => {
  try {
    const { itemId } = req.params;

    const item = await CartItem.findByPk(itemId);
    if (!item) return res.status(404).json({ error: 'Cart item not found' });

    await item.destroy();

    res.status(200).json({ message: 'Cart item removed' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove cart item', details: err.message });
  }
};

// ✅ Export with consistent naming
module.exports = {
  addItemToCart,
  getCartItemsForUser,
  updateCartItem,
  removeCartItem,
};
