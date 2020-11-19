import React from 'react'

import Sidebar from '../layout/Sidebar'
import Navbar from '../layout/Navbar'
import TaskForm from '../tasks/TaskForm'
import TaskList from '../tasks/TaskList'

const Projects = () => {
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
    )
}

export default Projects