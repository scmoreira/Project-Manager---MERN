const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jsw = require('jsonwebtoken')

const User = require('../models/user.model')

exports.authenticateUser = async (req, res) => {

    // Check validation
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array()})
    }

    // Get user data
    const { email, password } = req.body

    try {

        let user = await User.findOne({ email })
        
        // Check if the user is registered
        if (!user) {
            res.status(400).json({ message: 'User not registered' })
            return
        }

        // Check password
        const correctPass = await bcrypt.compare(password, user.password)

        if (!correctPass) {
            res.status(400).json({ message: 'Incorrect password' })
            return
        }

        // If authentication passes, create and sign JWT
        const payload = {
            user: {
                id: user.id
            }
        }

        jsw.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
                
            if (error) throw error
                
            // Confirmation 
            res.status(200).json({ token })
        })

    } catch (error) {
        res.status(500).json({ message: 'Error at login' })
    }
}