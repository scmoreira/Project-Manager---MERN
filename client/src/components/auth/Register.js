import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Register = props => {

    // Context
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)

    // States
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPass: ''
    })

    //Distructuring
    const { username, email, password, confirmPass } = user
    const { alert, showAlert } = alertContext
    const { authenticated, message, registerUser } = authContext

    // Update state
    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    // Submit form 
    const handleSubmit = e => {
        e.preventDefault()

        // Check for empty fields
        if (username.trim() === '' || email.trim() === '' ||
            password.trim() === '' || confirmPass.trim() === '') {
            showAlert('All fields required', 'alert-error')
            return
        }

        // Password validation
        if (password.length < 5) {
            showAlert('Password must be at least 5 characters', 'alert-error')
            return
        }

        // Confirm password
        if (password !== confirmPass) {
            showAlert('Passwords do not match', 'alert-error')
            return
        }

        // Save user
        registerUser({ username, email, password })

    }

    // Response 
    useEffect(() => {

        if (authenticated) {
            props.history.push('/projects')
        }

        if (message) {
            showAlert(message.message, message.category)
        }
        // eslint-disable-next-line
    }, [message, authenticated, props.history])
    
    return (
        <div className='user-form'>
            {alert && <div className={`alert ${alert.category}`}>{ alert.message }</div>}
            <div className='form-container shadow-dark'>
                <h1>Register</h1>

                <form onSubmit={handleSubmit}>
                    <div className='form-field'>
                        <label htmlFor='name'>Name</label>
                        <input 
                            type='text'
                            id='username'
                            name='username'
                            value={username}
                            placeholder='Your name'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-field'>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='email'
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Your email'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-field'>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='**********'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-field'>
                        <label htmlFor='confirmPass'>Confirm password</label>
                        <input 
                            type='password'
                            id='confirmPass'
                            name='confirmPass'
                            value={confirmPass}
                            placeholder='**********'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-field'>
                        <input
                            type='submit'
                            className='btn btn-primary btn-block'
                            value='Register'
                        />
                    </div>
                </form>
                <Link to={'/'} className='link-account'>
                    Login
                </Link>
            </div>
        </div>
    )
}

export default Register