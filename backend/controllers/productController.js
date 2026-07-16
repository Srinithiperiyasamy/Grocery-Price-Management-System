const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public/Admin
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ updatedAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching products' });
  }
};

// @desc    Live search products
// @route   GET /api/products/search?q=...
// @access  Public
const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.json([]);
    }

    const regex = new RegExp(query, 'i');
    
    // Search in nameEnglish, nameTamil, or productCode
    const products = await Product.find({
      $or: [
        { nameEnglish: { $regex: regex } },
        { nameTamil: { $regex: regex } },
        { productCode: { $regex: regex } },
      ],
    }).limit(20);

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Search failed', error: error.message });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: 'Invalid product data', error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      Object.assign(product, req.body);
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Update failed', error: error.message });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Delete failed', error: error.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/products/stats
// @access  Private/Admin
const getStats = async (req, res) => {
  try {
    const total = await Product.countDocuments();
    const available = await Product.countDocuments({ status: 'Available' });
    const outOfStock = await Product.countDocuments({ status: 'Out of Stock' });

    res.json({ total, available, outOfStock });
  } catch (error) {
    res.status(500).json({ message: 'Stats fetch failed', error: error.message });
  }
};

module.exports = {
  getProducts,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getStats,
};
