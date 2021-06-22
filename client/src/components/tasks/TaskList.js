import React, { Fragment, useContext } from 'react';

import ProjectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

import { CSSTransition, TransitionGroup } from 'react-transition-group';

import Task from './Task';

const TaskList = () => {

    // Context
    const { project, deleteProject } = useContext(ProjectContext);
    const { projectTasks } = useContext(TaskContext);

    if (!project) return <h2 data-cy='select-project'>Select a project</h2>;

    return (
        <Fragment>
            <h2>Project : { project[0].name }</h2>
            <ul className='task-list'>
                { projectTasks.length === 0
                    ? <li className='task'><p>No tasks yet</p></li>
                    : <TransitionGroup>
                        { projectTasks.map(task => (
                            <CSSTransition
                                key={ task._id }
                                timeout={ 200 }
                                classNames='task'
                            >
                                <Task task={ task } />
                            </CSSTransition>
                        )) }
                    </TransitionGroup>
                }
                <button
                    type='button'
                    // Delete project
                    onClick={ () => deleteProject(project[0]._id) }
                    className='btn btn-secondary'>Delete Project &times;</button>
            </ul>
        </Fragment>
    );
};

export default TaskList;