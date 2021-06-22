const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const auth = require('../configs/middleware.config');
const authController = require('../controllers/authController');

// Endpoint: api/auth

// Create user
router.post('/', authController.authenticateUser);

// Get authenticated user
router.get('/',
    auth,
    authController.authenticatedUser
);

module.exports = router;