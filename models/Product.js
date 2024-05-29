const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      maxlength: [100, "Product title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Product price cannot be negative"],
    },
    discount: {
      type: Boolean,
      default: false,
    },
    discountAmount: {
      type: Number,
      min: [0, "Discount amount cannot be negative"],
      validate: {
        validator: function (value) {
          return value <= this.price;
        },
        message: "Discount amount cannot exceed the product price",
      },
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock quantity cannot be negative"],
      default: 0,
    },
    tags: {
      type: [String],
    },
    images: {
      type: [String],
      validate: {
        validator: function (value) {
          return value.every((v) =>
            /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(v)
          );
        },
        message: "Each image should be a valid URL and of image file type",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
