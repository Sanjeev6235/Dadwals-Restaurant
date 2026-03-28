const express = require('express');
const { getAllFood, getAllFoodAdmin, getFoodById, createFood, updateFood, deleteFood } = require('../controllers/foodController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const { upload } = require('../config/cloudinary');
const router = express.Router();

router.get('/',            getAllFood);
router.get('/admin/all',   protect, adminOnly, getAllFoodAdmin);
router.get('/:id',         getFoodById);
router.post('/',           protect, adminOnly, upload.single('image'), createFood);
router.put('/:id',         protect, adminOnly, upload.single('image'), updateFood);
router.delete('/:id',      protect, adminOnly, deleteFood);

module.exports = router;
