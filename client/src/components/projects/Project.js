import React, { useContext } from 'react'
import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/taskContext'


const Project = ({ project }) => {
    
    // Context
    const projectsContext = useContext(projectContext)
    const tasksContext = useContext(taskContext)

    // Destructuring
    const { currentProject } = projectsContext
    const { getProjectTasks } = tasksContext


    // Update context
    const handleClick = id => {
        currentProject(id)
        getProjectTasks(id)
    }

    return (
        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick={() => handleClick(project.id)}
            >{project.name}</button>
        </li>
    )
}

export default Project