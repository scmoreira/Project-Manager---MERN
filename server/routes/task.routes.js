const express = require('express')
const router = express.Router()
const { check } = require('express-validator')

const taskController = require('../controllers/taskController')
const auth = require('../configs/middleware.config')

// Endpoint: api/task

// Get all project's tasks
router.get('/',
    auth,
    taskController.getTasks
)

// Create new task
router.post('/',
    auth,
    [
        check('name', 'Task name is required').not().isEmpty(),
        check('projectId', 'Project Id is required').not().isEmpty()
    ],
    taskController.createTask
)

// Update a task
router.put('/:id',
    auth,
    [
        check('name', 'Task name is required').not().isEmpty(),
        check('projectId', 'Project Id is required').not().isEmpty()
    ],
    taskController.updateTask
)

// Delete task

module.exports = router