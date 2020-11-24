import React, { useReducer } from 'react'

import UserService from '../../service/user.service'

import TaskContext from './taskContext'
import TaskReducer from './taskReducer'
import {
    GET_PROJECT_TASKS,
    ADD_TASK,
    TASK_VALIDATION,
    CURRENT_TASK,
    UPDATE_TASK,
    DELETE_TASK
} from '../../types'

const TaskState = props => {

    // Set initial State
    const initialState = {
        projectTasks: [],
        selectedTask: null,
        taskValidation: false
    }

    // Dispatch to execute actions
    const [state, dispatch] = useReducer(TaskReducer, initialState)

    // Get project tasks
    const getProjectTasks = async projectId => {

        try {
            const response = await UserService.get('/api/task', { params: { projectId } })
            dispatch({
                type: GET_PROJECT_TASKS,
                payload: response.data.tasks
            })
        } catch (error) {
            console.log(error)
        }
    } 

    // Form validation
    const showError = () => {
        dispatch({ type: TASK_VALIDATION })
    }

    // Add new task to a project
    const addTask = async task => {
        try {
            await UserService.post('/api/task', task)
            dispatch({ type: ADD_TASK, payload: task })
        } catch (error) {
            console.log(error)
        }
    }

    // Update task
    const updateTask = async task => {
        
        try {
            const response = await UserService.put(`/api/task/${task._id}`, task)
            dispatch({ type: UPDATE_TASK, payload: response.data.task })

        } catch (error) {
            console.log(error)
        }
    }

    // Select a task from the task list
    const currentTask = task => {
        dispatch({ type: CURRENT_TASK, payload: task})
    }
    
    // Delete task
    const deleteTask = async (taskId, projectId) => {
        console.log( ' taskID  ' + taskId + '   projectID  ' + projectId)
        try {
            await UserService.delete(`/api/task/${taskId}`, {params: { projectId }})
            dispatch({ type: DELETE_TASK, payload: taskId })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TaskContext.Provider
            value = {{
                projectTasks: state.projectTasks,
                selectedTask: state.selectedTask,
                taskValidation: state.taskValidation,
                getProjectTasks,
                showError,
                addTask,
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



