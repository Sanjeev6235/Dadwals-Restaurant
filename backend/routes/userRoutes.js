const express = require('express');
const { getProfile, updateProfile, changePassword, getAllUsers } = require('../controllers/userController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile',        protect, getProfile);
router.put('/profile',        protect, updateProfile);
router.put('/change-password',protect, changePassword);
router.get('/all',            protect, adminOnly, getAllUsers);

module.exports = router;
