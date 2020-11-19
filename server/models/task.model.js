const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now()
    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task