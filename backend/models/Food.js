const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true, min: 0 },
  image:       { type: String, default: '' },
  imagePublicId: { type: String, default: '' },
  category:    {
    type: String,
    required: true,
    enum: ['Pizza', 'Burger', 'Rolls', 'Drinks', 'Shakes', 'Sides', 'Desserts'],
  },
  isAvailable: { type: Boolean, default: true },
  isFeatured:  { type: Boolean, default: false },
  ratings:     { type: Number, default: 4.5, min: 0, max: 5 },
  prepTime:    { type: String, default: '20-30 min' },
}, { timestamps: true });

module.exports = mongoose.model('Food', foodSchema);
