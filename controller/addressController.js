const Address = require("../models/Address");

// Create a new address
const createAddress = async (req, res) => {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all addresses for a user
const getAllAddressesForUser = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.params.userId });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get address by ID
const getAddressById = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an address
const updateAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json(address);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an address
const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findByIdAndDelete(req.params.id);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createAddress,
  deleteAddress,
  getAddressById,
  getAllAddressesForUser,
  updateAddress,
};
