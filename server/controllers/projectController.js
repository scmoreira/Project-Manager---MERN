const { validationResult } = require('express-validator')

const Project = require('../models/project.model')

// Get all user's projects
exports.getProjects = async (req, res) => {

    try {
        
        const projects = await Project.find({ author: req.user.id }).sort({ created: -1 })
        res.json(projects)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error while getting your projects' })
    }
}

// Create projects
exports.createProject = async (req, res) => {

    // Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(401).json({ errors: errors.array() })
        return
    }

    try {

        // Create project
        const project = new Project(req.body)

        // Save author
        project.author = req.user.id

        // Save project
        project.save()
        res.json(project)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error while creating project' })
    }
}

// Update a project
exports.updateProject = async (req, res) => {

    // Validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(401).json({ errors: errors.array() })
        return
    }

    const { name } = req.body
    const newInfo = {}

    if (name) { newInfo.name = name }

    try {

        // Search project by id
        let project = await Project.findById(req.params.id)

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

        // Update project
        let updatedProject = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newInfo }, { new: true })
        res.json(updatedProject)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error while updating project' })
    }
}

// Delete a project
exports.deleteProject = async (req, res) => {

    try {

        // Search project by id
        await Project.findById(req.params.id, (err, project) => {

            // Check if the project exits
            if (err || !project) {
                res.status(404).json({ message: 'Project not found' })
                return
            }

            // Check project author
            if (project.author.toString() !== req.user.id) {
                res.status(401).json({ message: 'Not authorized' })
                return
            }
        }) 

        // Delete project
        await Project.findByIdAndRemove({ _id: req.params.id })
        res.json({ message: 'Project deleted'})
    
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error while deleting project' })
    }

}