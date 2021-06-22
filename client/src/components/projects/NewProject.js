import React, { Fragment, useContext, useState } from 'react';

import ProjectContext from '../../context/projects/projectContext';

const NewProject = () => {

    // Context
    const { formState, projectValidation, showForm, showError, addProject } = useContext(ProjectContext);
    const [project, setProject] = useState({ name: '' });

    const { name } = project;

    const handleChange = e => {
        setProject({
            ...project,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (name.trim() === '') {
            showError();
            return;
        }
        addProject(project);
        setProject({ name: '' });
    };

    return (
        <Fragment>
            <button
                type='button'
                className='btn btn-block btn-primary'
                onClick={ () => showForm() }  // Change form state to show the form
                data-cy='new-project-button'
            >
                New Project
            </button>
            { formState && <form
                className='form-new-project'
                onSubmit={ handleSubmit }
            >
                <input
                    type='text'
                    name='name'
                    value={ name }
                    className='input-text'
                    placeholder='Project Name'
                    onChange={ handleChange }
                    data-cy='new-project-input'
                />
                <input
                    type='submit'
                    className='btn btn-block btn-primary'
                    value='Add Project'
                    data-cy='submit-new-project'
                />
            </form> }
            {projectValidation && <p data-cy='alert' className='message error'>Project name is requiered</p> }
        </Fragment>
    );
};

export default NewProject;