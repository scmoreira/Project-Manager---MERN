import React, { useContext, useEffect } from 'react';

import ProjectContext from '../../context/projects/projectContext';
import AlertContext from '../../context/alert/alertContext';

import Project from './Project.js';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ProjectList = () => {

    // Context
    const { projects, message, getProjects } = useContext(ProjectContext);
    const { alert, showAlert } = useContext(AlertContext);

    useEffect(() => {
        if (message) {
            showAlert(message.message, message.category);
        }
        getProjects();
        // eslint-disable-next-line
    }, [message]);

    if (projects.length === 0) return <p>No projects found!</p>;

    return (
        <ul
            data-cy='project-list'
            className='project-list'
        >
            { alert && <div className={ `alert ${alert.category}` }>{ alert.message }</div> }
            <TransitionGroup>
                { projects.map(project => (
                    <CSSTransition
                        key={ project._id }
                        timeout={ 200 }
                        classNames='project'
                    >
                        <Project project={ project } />
                    </CSSTransition>
                )) }
            </TransitionGroup>
        </ul>
    );
};

export default ProjectList;