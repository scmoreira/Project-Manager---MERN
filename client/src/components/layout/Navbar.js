import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Navbar = () => {

    const { user, authenticatedUser, logout } = useContext(AuthContext);

    useEffect(() => {
        authenticatedUser();
        // eslint-disable-next-line
    }, []);

    return (
        <header className='app-header'>
            {user && <p className='user-name'>Hola <span>{ user.username }</span></p> }
            <nav className='main-nav'>
                <button
                    className='btn btn-blank logout'
                    onClick={ () => logout() }
                    data-cy='logout'
                > Logout</button>
            </nav>
        </header>

    );
};
export default Navbar;