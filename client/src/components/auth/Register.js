import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import Alert from '../layout/Alert';

const Register = props => {

    const { alert, showAlert } = useContext(AlertContext);
    const { authenticated, message, registerUser } = useContext(AuthContext);
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPass: ''
    });

    const { username, email, password, confirmPass } = user;

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (username.trim() === '' || email.trim() === '' ||
            password.trim() === '' || confirmPass.trim() === '') {
            showAlert('All fields required', 'alert-error');
            return;
        }
        if (password.length < 5) {
            showAlert('Password must be at least 5 characters', 'alert-error');
            return;
        }
        if (password !== confirmPass) {
            showAlert('Passwords do not match', 'alert-error');
            return;
        }
        registerUser({ username, email, password });
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
            <Alert alert={ alert }/>
            <div className='form-container shadow-dark'>
                <h1 data-cy='title'>Register</h1>
                <form
                    onSubmit={ handleSubmit }
                    data-cy='register-form'
                >
                    <div className='form-field'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            value={ username }
                            placeholder='Your name'
                            onChange={ handleChange }
                            data-cy='username-input'
                        />
                    </div>
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
                            placeholder='**********'
                            onChange={ handleChange }
                            data-cy='password-input'
                        />
                    </div>
                    <div className='form-field'>
                        <label htmlFor='confirmPass'>Confirm password</label>
                        <input
                            type='password'
                            id='confirmPass'
                            name='confirmPass'
                            value={ confirmPass }
                            placeholder='**********'
                            onChange={ handleChange }
                            data-cy='confirmPass-input'
                        />
                    </div>
                    <div className='form-field'>
                        <input
                            type='submit'
                            className='btn btn-primary btn-block'
                            value='Register'
                            data-cy='submit-register'
                        />
                    </div>
                </form>
                <Link
                    to={ '/' }
                    className='link-account'
                    data-cy='login-link'
                >
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Register;