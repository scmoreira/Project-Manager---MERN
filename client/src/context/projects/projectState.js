import React, { useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'

import ProjectContext from './projectContext'
import ProjectReducer from './projectReducer'
import {
    PROJECT_FORM,
    GET_PROJECTS,
    ADD_PROJECT,
    PROJECT_VALIDATION,
    CURRENT_PROJECT,
    DELETE_PROJECT
} from '../../types'

const ProjectState = props => {

    const projects = [
        { id: 1, name: 'Front-end project' },
        { id: 2, name: 'Back-end project' },
        { id: 3, name: 'MERN project' }
    ]

    // Set initial State
    const initialState = {
        projects: [],
        project: null, 
        formState: false,
        projectValidation: false
    }

    // Dispatch to execute actions
    const [state, dispatch] = useReducer(ProjectReducer, initialState)

    // Get projects
    const getProjects = () => {
        dispatch({ type: GET_PROJECTS,payload: projects })
    }

    // CRUD Functions
    const showForm = () => {
        dispatch({ type: PROJECT_FORM })
    }

     // Form validation
     const showError = () => {
        dispatch({ type: PROJECT_VALIDATION })
    }

    // Add new project
    const addProject = project => {
        project.id = uuidv4()

        dispatch({ type: ADD_PROJECT, payload: project })
    }

    // Select a project from the projects list
    const currentProject = projectID => {
        dispatch({ type: CURRENT_PROJECT, payload: projectID })
    }

    // Delete a project
    const deleteProject = projectID => {
        dispatch({ type: DELETE_PROJECT, payload: projectID })
    }

    return (
        <ProjectContext.Provider
            value = {{
                projects: state.projects,
                project: state.project,
                formState: state.formState,
                projectValidation: state.projectValidation,
                showForm,
                showError,
                getProjects,
                addProject,
                currentProject,
                deleteProject
            }}
        >
            {props.children}
        </ProjectContext.Provider>
    )

}

export default ProjectState
