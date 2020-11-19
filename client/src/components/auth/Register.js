import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {

    // States
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPass: ''
    })

    //Distructuring
    const { name, email, password, confirmPass } = user

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
        

        // Password validation


        // Confirm password


    }
    
    return (
        <div className='user-form'>
            <div className='form-container shadow-dark'>
                <h1>Login</h1>

                <form onSubmit={handleSubmit}>
                    <div className='form-field'>
                        <label htmlFor='name'>Name</label>
                        <input 
                            type='text'
                            id='name'
                            name='name'
                            value={name}
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