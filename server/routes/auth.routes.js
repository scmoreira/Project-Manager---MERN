const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const authController = require('../controllers/authController')

// Endpoint: api/auth

// Create user
router.post('/',
    
    // Validation
    [
        check('email', 'Email not valid').isEmail(),
        check('password', 'Password must contain at least 5 characters').isLength({ min: 5 })
    ],

    authController.authenticateUser
)

module.exports = router