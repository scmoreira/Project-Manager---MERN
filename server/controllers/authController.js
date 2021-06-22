const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jsw = require('jsonwebtoken');

const User = require('../models/user.model');

// Authenticate user
exports.authenticateUser = async (req, res) => {

    // Check validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'User not registered' });
            return;
        }
        const correctPass = await bcrypt.compare(password, user.password);
        if (!correctPass) {
            res.status(400).json({ message: 'Incorrect password' });
            return;
        }
        const payload = {
            user: {
                id: user.id
            }
        };
        jsw.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // Time to keep the token as valid
        }, (error, token) => {
            if (error) throw error;
            res.status(200).json({ token });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error at login' });
    }
};

exports.authenticatedUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    } catch (error) {
        res.status(500).json({ message: 'Error' });
    }
};