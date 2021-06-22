const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const projectController = require('../controllers/projectController');
const auth = require('../configs/middleware.config');

// Endpoint: api/project

// Get all user's projects
router.get('/',
    auth,
    projectController.getProjects
);

// Create new project
router.post('/',
    auth,
    [
        check('name', 'Project name is required').not().isEmpty()
    ],
    projectController.createProject
);

// Update a project
router.put('/:id',
    auth,
    [
        check('name', 'Project name is required').not().isEmpty()
    ],
    projectController.updateProject
);

// Delete project
router.delete('/:id',
    auth,
    projectController.deleteProject
);

module.exports = router;