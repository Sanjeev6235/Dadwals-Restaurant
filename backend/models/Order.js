const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    foodId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
    name:     { type: String, required: true },
    price:    { type: Number, required: true },
    image:    { type: String },
    quantity: { type: Number, required: true, min: 1 },
  }],
  totalPrice:      { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  phone:           { type: String, required: true },
  paymentMethod:   { type: String, enum: ['COD'], default: 'COD' },
  status: {
    type: String,
    enum: ['Order Placed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
    default: 'Order Placed',
  },
  orderNumber: { type: String, unique: true },
}, { timestamps: true });

// Auto-generate order number
orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const count = await mongoose.model('Order').countDocuments();
    this.orderNumber = `DW${String(count + 1001).padStart(5, '0')}`;
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
