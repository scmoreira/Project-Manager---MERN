import React, { useContext } from 'react';

import TaskContext from '../../context/tasks/taskContext';
import ProjectContext from '../../context/projects/projectContext';

const Task = ({ task }) => {

    const { getProjectTasks, updateTask, currentTask, deleteTask } = useContext(TaskContext);
    const { project } = useContext(ProjectContext);
    const { name, state } = task;

    const [currentProject] = project;

    const handleClickDelete = id => {
        deleteTask(id, currentProject._id);
        getProjectTasks(currentProject.id);
    };

    const handleClickState = task => {
        if (task.state) {
            task.state = false;
        } else {
            task.state = true;
        }
        updateTask(task);
    };

    const handleClickEdit = task => { currentTask(task); };

    return (
        <li data-cy='task' className='task shadow'>
            <p>{ name }</p>
            <div className='state'>
                { state
                    ? <button
                        type='button'
                        className='complete'
                        onClick={ () => handleClickState(task) }
                        data-cy='complete-task'
                    >Complete</button>
                    : <button
                        type='button'
                        className='incomplete'
                        onClick={ () => handleClickState(task) }
                        data-cy='incomplete-task'
                    >Incomplete</button>
                }
            </div>
            <div className='actions'>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick={ () => handleClickEdit(task) }
                    data-cy='btn-edit'
                >Edit</button>
                <button
                    type='button'
                    className='btn btn-secondary'
                    onClick={ () => handleClickDelete(task._id) }
                    data-cy='btn-delete'
                >Delete</button>
            </div>
        </li>
    );
};

export default Task;