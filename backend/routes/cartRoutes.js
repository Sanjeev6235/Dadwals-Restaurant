const express = require('express');
const router = express.Router();

// Cart is managed client-side (Context/localStorage).
// This route exists for future server-side cart sync.
router.get('/ping', (req, res) => res.json({ message: 'Cart service OK' }));

module.exports = router;
