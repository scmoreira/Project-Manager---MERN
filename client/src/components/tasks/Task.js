import React, { useContext } from 'react'

import TaskContext from '../../context/tasks/taskContext'
import ProjectContext from '../../context/projects/projectContext'

const Task = ({ task }) => {
    
    // Context
    const taskContext = useContext(TaskContext)
    const projectContext = useContext(ProjectContext)

    // Destructuring
    const { name, state } = task
    const { getProjectTasks, updateTask, currentTask, deleteTask } = taskContext
    const { project } = projectContext  

    const [currentProject] = project

    // Delete task
    const handleClickDelete = id => {
        deleteTask(id, currentProject._id)
        getProjectTasks(currentProject.id) 
    }

    // Update task state
    const handleClickState = task => {
        if (task.state) {
            task.state = false
        } else {
            task.state = true
        }
        updateTask(task)
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
                    onClick= {() => handleClickDelete(task._id)}
                >Delete</button>
            </div>

        </li>
        
    )
}

export default Task