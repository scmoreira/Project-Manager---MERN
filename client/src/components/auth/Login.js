import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = props => {

    // Context
    const alertContext = useContext(AlertContext)
    const authContext = useContext(AuthContext)
    
    // States
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    //Distructuring
    const { email, password } = user
    const { alert, showAlert } = alertContext
    const { authenticated, message, login } = authContext

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
        if (email.trim() === '' || password.trim() === '') {
            showAlert('All fields required', 'alert-error')
        }

        login({ email, password })
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
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
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
                            placeholder='Your password'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-field'>
                        <input
                            type='submit'
                            className='btn btn-primary btn-block'
                            value='Login'
                        />
                    </div>
                </form>
                <Link to={'/register'} className='link-account'>
                    Register
                </Link>
            </div>
        </div>
    )
}

export default Login