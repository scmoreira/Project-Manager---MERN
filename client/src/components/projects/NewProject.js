import React, { Fragment, useContext, useState } from 'react'

import projectContext from '../../context/projects/projectContext'

const NewProject = () => {

    // Context
    const projectsContext = useContext(projectContext)

    // State
    const [project, setProject] = useState({ name:'' })

    // Destructuring
    const { name } = project
    const { formState, projectValidation, showForm, showError, addProject } = projectsContext

    // Update project state
    const handleChange = e => {
        setProject({
            ...project,
            [e.target.name] : e.target.value
        })
    }

    // Submit project
    const handleSubmit = e => {
        e.preventDefault()

        // Field validation
        if (name.trim() === '') {
            showError()
            return
        }

        // Add project
        addProject(project)
        
        // Restart form
        setProject({
            name: ''
        })
    }

    return (
        <Fragment>
            <button
                type='button'
                className='btn btn-block btn-primary'
                onClick={() => showForm()}  // Change form state to show the form
            >New Project</button>
            
            { formState && <form
                className='form-new-project'
                onSubmit={handleSubmit}
            >
                <input 
                    type='text'
                    name='name'
                    value={name}
                    className='input-text'
                    placeholder='Project Name'
                    onChange={handleChange}
                />
                <input
                    type='submit'
                    className='btn btn-block btn-primary'
                    value='Add Project'
                />
            </form>}
            
            {projectValidation && <p className='message error'>Project name is requiered</p>}
        </Fragment>
    )
}

export default NewProject





