import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

import TaskContext from './taskContext'
import TaskReducer from './taskReducer'
import {
    GET_PROJECT_TASKS,
    ADD_TASK,
    TASK_VALIDATION,
    TASK_STATE,
    CURRENT_TASK,
    UPDATE_TASK,
    DELETE_TASK
} from '../../types'

const TaskState = props => {

    // Set initial State
    const initialState = {
        tasks: [
            { id: 1, name: 'Set canvas', state: true, projectId: 1 },
            { id: 2, name: 'Create classes', state: true, projectId: 1 },
            { id: 3, name: 'Set methods', state: false, projectId: 1 },
            { id: 4, name: 'API request', state: true, projectId: 2 },
            { id: 5, name: 'Create partials', state: true, projectId: 2 },
            { id: 6, name: 'Set BBDD', state: false, projectId: 2 }
        ],
        projectTasks: null,
        selectedTask: null,
        taskValidation: false
    }

    // Dispatch to execute actions
    const [state, dispatch] = useReducer(TaskReducer, initialState)

    // Get project tasks
    const getProjectTasks = projectId => {
        dispatch({ type: GET_PROJECT_TASKS, payload: projectId })
    } 

    // Form validation
    const showError = () => {
        dispatch({ type: TASK_VALIDATION })
    }

    // Add new task to a project
    const addTask = task => {
        task.id = uuidv4()
        dispatch({ type: ADD_TASK, payload: task })
    }

    // Update task state
    const updateTaskState = task => {
        dispatch({ type: TASK_STATE, payload: task })
    }

    // Select a task from the task list
    const currentTask = task => {
        dispatch({ type: CURRENT_TASK, payload: task})
    }

    // Update task
    const updateTask = task => {
        dispatch({ type: UPDATE_TASK, payload: task })
    }
    
    // Delete task
    const deleteTask = taskId => {
        dispatch({ type: DELETE_TASK, payload: taskId })
    }

    return (
        <TaskContext.Provider
            value = {{
                tasks: state.tasks,
                projectTasks: state.projectTasks,
                selectedTask: state.selectedTask,
                taskValidation: state.taskValidation,
                getProjectTasks,
                showError,
                addTask,
                updateTaskState,
                currentTask,
                updateTask,
                deleteTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState



