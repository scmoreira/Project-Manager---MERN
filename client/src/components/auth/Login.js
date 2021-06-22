import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import Alert from '../layout/Alert';

const Login = props => {

    const { alert, showAlert } = useContext(AlertContext);
    const { authenticated, message, login } = useContext(AuthContext);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (email.trim() === '' || password.trim() === '') {
            showAlert('All fields required', 'alert-error');
        }
        login({ email, password });
    };

    useEffect(() => {
        if (authenticated) {
            props.history.push('/projects');
        }
        if (message) {
            showAlert(message.message, message.category);
        }
        // eslint-disable-next-line
    }, [message, authenticated, props.history]);

    return (
        <div className='user-form'>
            <Alert alert={ alert } />
            <div className='form-container shadow-dark'>
                <h1 data-cy='title'>Login</h1>
                <form
                    onSubmit={ handleSubmit }
                    data-cy='login-form'
                >
                    <div className='form-field'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={ email }
                            placeholder='Your email'
                            onChange={ handleChange }
                            data-cy='email-input'
                        />
                    </div>
                    <div className='form-field'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={ password }
                            placeholder='Your password'
                            onChange={ handleChange }
                            data-cy='password-input'
                        />
                    </div>
                    <div className='form-field'>
                        <input
                            type='submit'
                            className='btn btn-primary btn-block'
                            value='Login'
                            data-cy='submit-login'
                        />
                    </div>
                </form>
                <Link
                    to={ '/register' }
                    className='link-account'
                    data-cy='register-link'
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Login;