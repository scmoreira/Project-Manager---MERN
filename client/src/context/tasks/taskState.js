import React, { useReducer } from 'react';

import UserService from '../../service/user.service';

import TaskContext from './taskContext';
import TaskReducer from './taskReducer';
import {
    GET_PROJECT_TASKS,
    ADD_TASK,
    TASK_VALIDATION,
    CURRENT_TASK,
    UPDATE_TASK,
    DELETE_TASK,
    CLEAN_SELECTED,
} from '../../types';

const TaskState = props => {

    const initialState = {
        projectTasks: [],
        selectedTask: null,
        taskValidation: false,
    };

    const [state, dispatch] = useReducer(TaskReducer, initialState);

    const getProjectTasks = async projectId => {
        try {
            const response = await UserService.get('/api/task', { params: { projectId } });
            dispatch({
                type: GET_PROJECT_TASKS,
                payload: response.data.tasks
            });
        } catch (error) {
            console.log(error);
        }
    };

    const showError = () => {
        dispatch({ type: TASK_VALIDATION });
    };

    const addTask = async task => {
        try {
            const response = await UserService.post('/api/task', task);
            dispatch({ type: ADD_TASK, payload: response.data.task });
        } catch (error) {
            console.log(error.message);
        }
    };

    const updateTask = async task => {
        console.log(task);
        try {
            const response = await UserService.put(`/api/task/${task._id}`, task);
            dispatch({ type: UPDATE_TASK, payload: response.data.task });
        } catch (error) {
            console.log(error);
        }
    };

    const currentTask = task => {
        dispatch({ type: CURRENT_TASK, payload: task });
    };

    const cleanSelected = () => {
        dispatch({ type: CLEAN_SELECTED });
    };

    const deleteTask = async (taskId, projectId) => {
        try {
            await UserService.delete(`/api/task/${taskId}`, { params: { projectId } });
            dispatch({ type: DELETE_TASK, payload: taskId });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TaskContext.Provider
            value={ {
                projectTasks: state.projectTasks,
                selectedTask: state.selectedTask,
                taskValidation: state.taskValidation,
                getProjectTasks,
                showError,
                addTask,
                currentTask,
                updateTask,
                deleteTask,
                cleanSelected
            } }
        >
            {props.children }
        </TaskContext.Provider>
    );
};

export default TaskState;