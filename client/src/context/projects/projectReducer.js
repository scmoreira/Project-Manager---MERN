import {
    PROJECT_FORM,
    GET_PROJECTS,
    ADD_PROJECT,
    PROJECT_VALIDATION,
    CURRENT_PROJECT,
    DELETE_PROJECT
} from '../../types'

export default (state, action) => {
    switch (action.type) {
        case PROJECT_FORM:
            return {
                ...state,
                formState: true
            }
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case ADD_PROJECT:
            return {
                ...state,
                projects: [action.payload, ...state.projects],
                formState: false,
                projectValidation: false
            }
        case PROJECT_VALIDATION: 
            return {
                ...state,
                projectValidation: true
            }
        case CURRENT_PROJECT:
            return {
                ...state,
                project: state.projects.filter(project => project.id === action.payload)
            }
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter(project => project.id !== action.payload),
                project: null
            }
        default:
            return state
    }
}