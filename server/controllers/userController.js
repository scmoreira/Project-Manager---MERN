const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const jsw = require('jsonwebtoken');

const User = require('../models/user.model');

exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }
    const { username, password, email } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            res.status(400).json({ message: 'User not available' });
            return;
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        user = new User({ username, password: hashPass, email });
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };
        jsw.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if (error) throw error;
            res.status(200).json({ token });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering' });
    }
};