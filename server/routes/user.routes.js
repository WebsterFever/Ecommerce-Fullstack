
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const { getCurrentUser } = require('../controllers/user.controller');

// Protected route to get logged-in user
router.get('/me', protect, getCurrentUser);

module.exports = router; // ✅ This is required!
