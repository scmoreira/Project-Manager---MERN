import React, { useReducer } from 'react';

import userService from '../../service/user.service';
import tokenAuth from '../../service/token';

import AuthContext from './authContext';
import AuthReducer from './authReducer';

import {
    REGISTRATION_SUCCESS,
    REGISTRATION_ERROR,
    GET_USER,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT
} from '../../types';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null,
        loading: true
    };

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const registerUser = async info => {
        try {
            const response = await userService.post('/api/user', info);
            dispatch({
                type: REGISTRATION_SUCCESS,
                payload: response.data
            });
            authenticatedUser();
        } catch (error) {
            const alert = {
                message: error.response.data.message,
                category: 'alert-error'
            };
            dispatch({
                type: REGISTRATION_ERROR,
                payload: alert
            });
        }
    };

    const authenticatedUser = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            tokenAuth(token);
        }
        try {
            const response = await userService.get('/api/auth');
            dispatch({
                type: GET_USER,
                payload: response.data.user
            });
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            });
        }
    };

    const login = async info => {
        try {
            const response = await userService.post('/api/auth', info);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data
            });
            authenticatedUser();
        } catch (error) {
            const alert = {
                message: error.response.data.message,
                category: 'alert-error'
            };
            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            });
        }
    };

    const logout = () => {
        dispatch({ type: LOGOUT });
    };

    return (
        <AuthContext.Provider
            value={ {
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,
                registerUser,
                authenticatedUser,
                login,
                logout
            } }
        >
            {props.children }
        </AuthContext.Provider>
    );
};

export default AuthState;