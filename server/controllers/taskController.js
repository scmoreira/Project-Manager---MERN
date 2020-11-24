const { validationResult } = require('express-validator')

const Task = require('../models/task.model')
const Project = require('../models/project.model')

// Get all project's tasks
exports.getTasks = async (req, res) => {

    try {
        
        const { projectId } = req.query

        // Check if the project that will contain the task exists
        const project = await Project.findById(projectId)

        // Check if the project exits
        if (!project) {
            res.status(404).json({ message: 'Project not found' })
            return
        }

        // Check project author
        if (project.author.toString() !== req.user.id) {
            res.status(401).json({ message: 'Not authorized' })
            return
        } 

        // Get tasks
        const tasks = await Task.find({ projectId }).sort({ created: -1 })
        res.json({tasks})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error while getting the tasks' })
    }
}

// Create task
exports.createTask = async (req, res) => {

    // Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(401).json({ errors: errors.array() })
        return
    }
    
    try {
        
        const { projectId } = req.body

        // Check if the project that will contain the task exists
        let project = await Project.findById(projectId)

        // Check if the project exits
        if (!project) {
            res.status(404).json({ message: 'Project not found' })
            return
        }

        // Check project author
        if (project.author.toString() !== req.user.id) {
            res.status(401).json({ message: 'Not authorized' })
            return
        }

        // Create task
        const task = new Task(req.body)
        await task.save()
        res.json({task})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error while creating task' })
    }
}

// Update a task
exports.updateTask = async (req, res) => {

    try {

        const { name, state, projectId } = req.body

        // Check if the task exists
        let task = await Task.findById(req.params.id)

        if (!task) {
            res.status(401).json({ message: 'Task not found' })
            return
        }
       
        // Check if the user is authorized
        let project = await Project.findById(projectId)

        if (project.author.toString() !== req.user.id) {
            res.status(401).json({ message: 'Not authorized' })
            return
        } 

        // Update task
        const newInfo = {}
        newInfo.name = name 
        newInfo.state = state

        // Save update
        task = await Task.findByIdAndUpdate({ _id: req.params.id }, newInfo, { new: true })
        res.json({ task })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error while updating task' })
    }
}

exports.deleteTask = async (req, res) => {

    const { projectId } = req.query

    try {

        let task = await Task.findById(req.params.id)

        if (!task) {
            res.status(401).json({ message: 'Task not found' })
            return
        }
       
        // Check if the user is authorized
        let project = await Project.findById(projectId)

        if (project.author.toString() !== req.user.id) {
            res.status(401).json({ message: 'Not authorized' })
            return
        } 

        // Delete task
        await Task.findByIdAndDelete({ _id: req.params.id })
        res.json({ message: 'Task deleted'})

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error while deleting task' })
    }
}