import {
    GET_PROJECT_TASKS,
    ADD_TASK,
    TASK_VALIDATION,
    TASK_STATE,
    CURRENT_TASK,
    UPDATE_TASK,
    DELETE_TASK
} from '../../types'

export default (state, action) => {
    switch (action.type) {
        case GET_PROJECT_TASKS:
            return {
                ...state,
                projectTasks: state.tasks.filter(task => task.projectId === action.payload)
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
                taskValidation: false
            }
        case TASK_VALIDATION:
            return {
                ...state,
                taskValidation: true
            }
        case TASK_STATE:
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task),
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
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
        default:
            return state
    }
}