import {
    GET_PROJECT_TASKS,
    ADD_TASK,
    TASK_VALIDATION,
    CURRENT_TASK,
    UPDATE_TASK,
    DELETE_TASK
} from '../../types'

const TaskReducer = (state, action) => {
    switch (action.type) {
        case GET_PROJECT_TASKS:
            return {
                ...state,
                projectTasks: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                projectTasks: [action.payload, ...state.projectTasks],
                taskValidation: false
            }
        case TASK_VALIDATION:
            return {
                ...state,
                taskValidation: true
            }
        case UPDATE_TASK:
            return {
                ...state,
                projectTasks: state.projectTasks.map(task => task._id === action.payload._id ? action.payload : task),
                selectedTask: null
            }
        case CURRENT_TASK:
            return {
                ...state,
                selectedTask: action.payload
            }
        case DELETE_TASK: 
            return {
                ...state,
                projectTasks: state.projectTasks.filter(task => task._id !== action.payload)
            }
        default:
            return state
    }
}

export default TaskReducer