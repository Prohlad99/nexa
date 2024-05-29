const Review = require("../models/Review");

// Create a new review
const createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all reviews for a product
const getAllReviewsForProduct = async (req, res) => {
  try {
    const reviews = await Review.find({
      product: req.params.productId,
    }).populate("user");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get review by ID
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate(
      "user product"
    );
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a review
const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createReview,
  deleteReview,
  getAllReviewsForProduct,
  getReviewById,
  updateReview,
};
