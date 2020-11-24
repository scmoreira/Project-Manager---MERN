import {
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT
} from '../../types'

const AuthReducer = (state, action) => {
    switch (action.type) {
        case REGISTRATION_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                authenticated: true,
                message: null,
                loading: false
            }
        case REGISTRATION_ERROR:
        case LOGIN_ERROR:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                authenticated: null,
                user: null,
                message: action.payload,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                authenticated: true,
                user: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export default AuthReducer