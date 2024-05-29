const Cart = require("../models/Cart");

// Create a new cart
const createCart = async (req, res) => {
  try {
    const cart = new Cart(req.body);
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get cart by user ID
const getCartByUserId = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate(
      "items.product"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a cart
const updateCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.params.userId },
      req.body,
      { new: true }
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a cart
const deleteCart = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({ user: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createCart,
  deleteCart,
  getCartByUserId,
  updateCart,
};
