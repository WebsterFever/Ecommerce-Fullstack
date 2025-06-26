const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/auth.middleware');
const { getAllUsers, createAdmin } = require('../controllers/admin.controller');

// Create Admin
router.post('/create-admin', createAdmin);

// Get all users (admin only)
router.get('/users', protect, adminOnly, getAllUsers);

module.exports = router;
