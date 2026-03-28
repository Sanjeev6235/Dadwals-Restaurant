const Food = require('../models/Food');
const { cloudinary } = require('../config/cloudinary');

// GET /api/food
exports.getAllFood = async (req, res) => {
  try {
    const { category, search, featured } = req.query;
    const filter = { isAvailable: true };
    if (category && category !== 'All') filter.category = category;
    if (featured === 'true') filter.isFeatured = true;
    if (search) filter.name = { $regex: search, $options: 'i' };

    const foods = await Food.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: foods.length, foods });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// GET /api/food/admin/all  (admin sees unavailable too)
exports.getAllFoodAdmin = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });
    res.json({ success: true, count: foods.length, foods });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// GET /api/food/:id
exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, food });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// POST /api/food  (admin)
exports.createFood = async (req, res) => {
  try {
    const { name, description, price, category, isAvailable, isFeatured, prepTime } = req.body;
    let image = '', imagePublicId = '';

    if (req.file) {
      image = req.file.path;
      imagePublicId = req.file.filename;
    }

    const food = await Food.create({ name, description, price, category, image, imagePublicId, isAvailable, isFeatured, prepTime });
    res.status(201).json({ success: true, message: 'Food item created', food });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// PUT /api/food/:id  (admin)
exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ success: false, message: 'Item not found' });

    // If new image uploaded, delete old from cloudinary
    if (req.file && food.imagePublicId) {
      await cloudinary.uploader.destroy(food.imagePublicId);
    }

    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = req.file.path;
      updateData.imagePublicId = req.file.filename;
    }

    const updated = await Food.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ success: true, message: 'Food updated', food: updated });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};

// DELETE /api/food/:id  (admin)
exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ success: false, message: 'Item not found' });

    if (food.imagePublicId) await cloudinary.uploader.destroy(food.imagePublicId);
    await food.deleteOne();

    res.json({ success: true, message: 'Food item deleted' });
  } catch (err) { res.status(500).json({ success: false, message: err.message }); }
};
