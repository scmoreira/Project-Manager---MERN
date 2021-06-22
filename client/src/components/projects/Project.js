import React, { useContext } from 'react';
import ProjectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

const Project = ({ project }) => {

    // Context
    const { currentProject } = useContext(ProjectContext);
    const { getProjectTasks } = useContext(TaskContext);

    const handleClick = id => {
        currentProject(id);
        getProjectTasks(id);
    };

    return (
        <li>
            <button
                type='button'
                className='btn btn-blank'
                onClick={ () => handleClick(project._id) }
            >
                { project.name }
            </button>
        </li>
    );
};

export default Project;