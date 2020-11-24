import React, { useContext } from 'react'
import ProjectContext from '../../context/projects/projectContext'
import TaskContext from '../../context/tasks/taskContext'

const Project = ({ project }) => {
    
    // Context
    const projectContext = useContext(ProjectContext)
    const taskContext = useContext(TaskContext)

    // Destructuring
    const { currentProject } = projectContext
    const { getProjectTasks } = taskContext


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
                onClick={() => handleClick(project._id)}
            >{project.name}</button>
        </li>
    )
}

export default Project