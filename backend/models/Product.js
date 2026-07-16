const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
  {
    nameEnglish: {
      type: String,
      default: '',
      index: true,
    },
    nameTamil: {
      type: String,
      default: '',
      index: true,
    },
    productCode: {
      type: String,
      default: '',
      index: true,
    },
    sellingPrice: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      required: true,
      enum: ['Available', 'Out of Stock'],
      default: 'Available',
    },
    buyingPrice: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      default: '',
    },
    stockQuantity: {
      type: Number,
      default: 0,
    },
    barcode: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
