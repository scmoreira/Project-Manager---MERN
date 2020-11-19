const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const userController = require('../controllers/userController')

// Endpoint: api/user

// Create user
router.post('/',
    
    // Validation
    [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Email not valid').isEmail(),
        check('password', 'Password must contain at least 5 characters').isLength({ min: 5 })
    ],

    userController.createUser
)

module.exports = router