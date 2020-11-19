import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

    // States
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    //Distructuring
    const { email, password } = user

    // Update state
    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        // Check for empty fields


    }
    
    return (
        <div className='user-form'>
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