const { validationResult } = require('express-validator');

const Project = require('../models/project.model');

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ author: req.user.id }).sort({ created: -1 });
        res.json(projects);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error while getting your projects' });
    }
};

exports.createProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(401).json({ errors: errors.array() });
        return;
    }
    try {
        const project = new Project(req.body);
        project.author = req.user.id;
        project.save();
        res.json(project);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error while creating project' });
    }
};

exports.updateProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(401).json({ errors: errors.array() });
        return;
    }
    const { name } = req.body;
    const newInfo = {};
    if (name) { newInfo.name = name; }
    try {
        let project = await Project.findById(req.params.id);
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        if (project.author.toString() !== req.user.id) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }
        let updatedProject = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newInfo }, { new: true });
        res.json(updatedProject);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error while updating project' });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        await Project.findById(req.params.id, (err, project) => {
            if (err || !project) {
                res.status(404).json({ message: 'Project not found' });
                return;
            }
            if (project.author.toString() !== req.user.id) {
                res.status(401).json({ message: 'Not authorized' });
                return;
            }
        });
        await Project.findByIdAndRemove({ _id: req.params.id });
        res.json({ message: 'Project deleted' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error while deleting project' });
    }
};