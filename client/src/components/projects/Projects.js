import React, { useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';

import Sidebar from '../layout/Sidebar';
import Navbar from '../layout/Navbar';
import TaskForm from '../tasks/TaskForm';
import TaskList from '../tasks/TaskList';

const Projects = () => {

    // Context
    const { authenticatedUser } = useContext(AuthContext);

    useEffect(() => {
        authenticatedUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className='app-container'>
            <Sidebar />
            <div className='main-section'>
                <Navbar />
                <main>
                    <TaskForm />
                    <div className='task-container'>
                        <TaskList />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Projects;