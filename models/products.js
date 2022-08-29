const mongoose = require("mongoose");


const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true},
    img: { type: String, required: true },
    categories: { type: Array},
    size: { type: String},
    color: { type: String},
    price: { type: String, required: true},
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("Products", productSchema);

module.exports = productModel;
