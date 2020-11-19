import React, { Fragment, useContext } from 'react'

import projectContext from '../../context/projects/projectContext'
import taskContext from '../../context/tasks/taskContext'

import { CSSTransition, TransitionGroup } from 'react-transition-group'

import Task from './Task'

const TaskList = () => {

    // Context
    const projectsContext = useContext(projectContext)
    const tasksContext = useContext(taskContext)

    // Destructuring
    const { project, deleteProject } = projectsContext  // project is an array
    const { projectTasks } = tasksContext

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
                                key={task.id}
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
                    onClick={() => deleteProject(project[0].id)}
                    className='btn btn-secondary'>Delete Project &times;</button>
            </ul>
        </Fragment>
    )
}

export default TaskList
