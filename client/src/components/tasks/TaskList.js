import React, { Fragment, useContext } from 'react'

import ProjectContext from '../../context/projects/projectContext'
import TaskContext from '../../context/tasks/taskContext'

import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Task from './Task'

const TaskList = () => {

    // Context
    const projectContext = useContext(ProjectContext)
    const taskContext = useContext(TaskContext)

    // Destructuring
    const { project, deleteProject } = projectContext  // project is an array
    const { projectTasks } = taskContext

    // Check if there is any project selected
    if (!project) return <h2>Select a project</h2>

    return (
        <Fragment>
           <h2>Project : {project[0].name}</h2>
            <ul className='task-list'>
                { projectTasks.length === 0
                    ? <li className='task'><p>No tasks yet</p></li>
                    : <TransitionGroup>
                        {projectTasks.map(task => (
                            <CSSTransition
                                key={task._id}
                                timeout={200}
                                classNames='task'
                            >
                                <Task task={task} />
                            </CSSTransition>
                        ))}
                      </TransitionGroup>
                }
                <button
                    type='button'
                    // Delete project
                    onClick={() => deleteProject(project[0]._id)}
                    className='btn btn-secondary'>Delete Project &times;</button>
            </ul>
        </Fragment>
    )
}

export default TaskList
