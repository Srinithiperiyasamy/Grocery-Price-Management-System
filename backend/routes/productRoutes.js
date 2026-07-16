const express = require('express');
const {
  getProducts,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getStats,
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/search', searchProducts);

// Admin/Protected routes (Now public as requested)
router.route('/').get(getProducts).post(createProduct);
router.route('/stats').get(getStats);
router
  .route('/:id')
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
