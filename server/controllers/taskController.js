const { validationResult } = require('express-validator');

const Task = require('../models/task.model');
const Project = require('../models/project.model');

exports.getTasks = async (req, res) => {
    try {
        const { projectId } = req.query;
        const project = await Project.findById(projectId);
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        if (project.author.toString() !== req.user.id) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }
        const tasks = await Task.find({ projectId }).sort({ created: -1 });
        res.json({ tasks });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error while getting the tasks' });
    }
};

exports.createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(401).json({ errors: errors.array() });
        return;
    }
    try {
        const { projectId } = req.body;
        let project = await Project.findById(projectId);
        if (!project) {
            res.status(404).json({ message: 'Project not found' });
            return;
        }
        if (project.author.toString() !== req.user.id) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }
        const task = new Task(req.body);
        await task.save();
        res.json({ task });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error while creating task' });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { name, state, projectId } = req.body;
        let task = await Task.findById(req.params.id);
        if (!task) {
            res.status(401).json({ message: 'Task not found' });
            return;
        }
        let project = await Project.findById(projectId);
        if (project.author.toString() !== req.user.id) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }
        const newInfo = {};
        newInfo.name = name;
        newInfo.state = state;
        task = await Task.findByIdAndUpdate({ _id: req.params.id }, newInfo, { new: true });
        res.json({ task });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error while updating task' });
    }
};

exports.deleteTask = async (req, res) => {
    const { projectId } = req.query;
    try {
        let task = await Task.findById(req.params.id);
        if (!task) {
            res.status(401).json({ message: 'Task not found' });
            return;
        }
        let project = await Project.findById(projectId);
        if (project.author.toString() !== req.user.id) {
            res.status(401).json({ message: 'Not authorized' });
            return;
        }
        await Task.findByIdAndDelete({ _id: req.params.id });
        res.json({ message: 'Task deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error while deleting task' });
    }
};