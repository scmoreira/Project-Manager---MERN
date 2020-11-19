import React, { useContext, useEffect } from 'react'

import projectContext from '../../context/projects/projectContext'

import Project from './Project.js'

import { CSSTransition, TransitionGroup } from 'react-transition-group'

const ProjectList = () => {

    // Context
    const projectsContext = useContext(projectContext)

    // Destructuring
    const { projects, getProjects } = projectsContext

    // Get projects from context
    useEffect(() => {
        getProjects()
        // eslint-disable-next-line
    }, [])

    // Check if there isn't any project
    if (projects.length === 0) return <p>No projects found!</p>
   
    return (
        <ul className='project-list'>
            <TransitionGroup>
                {projects.map(project => (
                    <CSSTransition
                        key={project.id}
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