const Order = require('../models/Order');

// POST /api/orders  — place order
exports.placeOrder = async (req, res) => {
  try {
    const { items, totalPrice, deliveryAddress, phone, paymentMethod } = req.body;
    if (!items || items.length === 0)
      return res.status(400).json({ success: false, message: 'No items in order' });

    const order = await Order.create({
      userId: req.user._id,
      items,
      totalPrice,
      deliveryAddress,
      phone,
      paymentMethod: paymentMethod || 'COD',
    });

    res.status(201).json({ success: true, message: 'Order placed!', order });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// GET /api/orders/my  — user's own orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId', 'name email');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    // Allow user to see only their own orders (admin can see all)
    if (req.user.role !== 'admin' && order.userId._id.toString() !== req.user._id.toString())
      return res.status(403).json({ success: false, message: 'Not authorised' });

    res.json({ success: true, order });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// GET /api/orders/admin/all  — admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId', 'name email phone').sort({ createdAt: -1 });
    res.json({ success: true, count: orders.length, orders });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// PUT /api/orders/:id/status  — admin
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status))
      return res.status(400).json({ success: false, message: 'Invalid status' });

    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('userId', 'name email');
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    res.json({ success: true, message: 'Order status updated', order });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// GET /api/orders/admin/stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalOrders   = await Order.countDocuments();
    const delivered     = await Order.countDocuments({ status: 'Delivered' });
    const pending       = await Order.countDocuments({ status: { $in: ['Order Placed', 'Preparing', 'Out for Delivery'] } });
    const revenueResult = await Order.aggregate([
      { $match: { status: 'Delivered' } },
      { $group: { _id: null, total: { $sum: '$totalPrice' } } },
    ]);
    const totalRevenue  = revenueResult[0]?.total || 0;
    const recentOrders  = await Order.find().populate('userId', 'name').sort({ createdAt: -1 }).limit(5);

    res.json({ success: true, stats: { totalOrders, delivered, pending, totalRevenue }, recentOrders });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
