const express = require('express');
const {
  placeOrder, getMyOrders, getOrderById,
  getAllOrders, updateOrderStatus, getDashboardStats
} = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/',              protect, placeOrder);
router.get('/my',             protect, getMyOrders);
router.get('/admin/all',      protect, adminOnly, getAllOrders);
router.get('/admin/stats',    protect, adminOnly, getDashboardStats);
router.get('/:id',            protect, getOrderById);
router.put('/:id/status',     protect, adminOnly, updateOrderStatus);

module.exports = router;
