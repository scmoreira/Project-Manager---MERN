import React, { useContext, useEffect } from 'react'

import ProjectContext from '../../context/projects/projectContext'
import AlertContext from '../../context/alert/alertContext'

import Project from './Project.js'

import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ProjectList = () => {

    // Context
    const projectContext = useContext(ProjectContext)
    const alertContext = useContext(AlertContext)

    // Destructuring
    const { projects, message, getProjects } = projectContext
    const { alert, showAlert } = alertContext

    // Get projects from context
    useEffect(() => {
        if (message) {
            showAlert(message.message, message.category)
        }
        getProjects()
        // eslint-disable-next-line
    }, [message])

    // Check if there isn't any project
    if (projects.length === 0) return <p>No projects found!</p>
   
    return (
        <ul className='project-list'>
            { alert && <div className={`alert ${alert.category}`}>{ alert.message}</div> }
            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project._id}
                        timeout={200}
                        classNames='project'
                    >
                    <Project project={project} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    )
}

export default ProjectList