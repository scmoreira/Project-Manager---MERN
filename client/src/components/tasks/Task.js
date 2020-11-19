import React, { useContext } from 'react'

import taskContext from '../../context/tasks/taskContext'
import projectContext from '../../context/projects/projectContext'

const Task = ({ task }) => {
    
    // Context
    const tasksContext = useContext(taskContext)
    const projectsContext = useContext(projectContext)

    // Destructuring
    const { name, state } = task
    const { getProjectTasks, updateTaskState, currentTask, deleteTask } = tasksContext
    const { project } = projectsContext  

    // Delete task
    const handleClickDelete = id => {
        deleteTask(id)
        getProjectTasks(project[0].id) // project is an array, and the current project is at index 0
    }

    // Update task state
    const handleClickState = task => {
        if (task.state) {
            task.state = false
        } else {
            task.state = true
        }
        updateTaskState(task)
    }

    // Select task to update
    const handleClickEdit = task => {
        currentTask(task)
    }

    return (
        <li className='task shadow'>
            <p>{name}</p>
            <div className='state'>
                {state
                    ? <button
                        type='button'
                        className='complete'
                        onClick={() => handleClickState(task)}
                    >Complete</button>
                    : <button
                        type='button'
                        className='incomplete'
                        onClick={() => handleClickState(task)}
                    >Incomplete</button>
                }
            </div>
            <div className='actions'>
                <button
                    type='button'
                    className='btn btn-primary'
                    onClick= {() => handleClickEdit(task)}
                >Edit</button>
                <button
                    type='button'
                    className='btn btn-secondary'
                    onClick= {() => handleClickDelete(task.id)}
                >Delete</button>
            </div>

        </li>
        
    )
}

export default Task