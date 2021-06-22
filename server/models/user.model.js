const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    registered: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;