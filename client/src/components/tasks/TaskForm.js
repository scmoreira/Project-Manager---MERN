import React, { useState, useContext, useEffect } from 'react'
import ProjectContext from '../../context/projects/projectContext'
import TaskContext from '../../context/tasks/taskContext'

const TaskForm = () => {

    // Context
    const projectContext = useContext(ProjectContext)
    const taskContext = useContext(TaskContext)

    // Destructuring
    const { project } = projectContext
    const { selectedTask, taskValidation, getProjectTasks, showError, addTask, updateTask } = taskContext

    // State
    const [task, setTask] = useState({ name: '' })

    // Check if there is a selected task
    useEffect(() => {
        if (selectedTask !== null) {
            setTask(selectedTask)
        } else {
            setTask({ name: '' })
        }
    }, [selectedTask])

    if (!project) return null

    // Upadate task state
    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name] : e.target.value
        })
    }

    // Add a task
    const handleSubmit = e => {
        e.preventDefault()

        // Field validation
        if (task.name.trim() === '') {
            showError()
            return
        }

        // Check if creating or updating 
        if (selectedTask === null) {
            // Add task
            task.projectId = project[0]._id
            addTask(task)
        } else {
            // Update task
            updateTask(task)
        }

        // Update context
        getProjectTasks(project[0].id)

        // Restart form
        setTask({ name: '' })
    }

    return (
        <div className='form'>
            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                    <input 
                        type='text'
                        name='name'
                        value={task.name}
                        className='input-text'
                        placeholder='Task Name'
                        onChange={handleChange}
                    />
                </div>
                <div className='input-container'>
                    <input 
                        type='submit'
                        className='btn btn-primary btn-submit btn-block'
                        value={selectedTask ? 'Edit task' : 'Add task'}
                    />
                </div>
            </form>
            {taskValidation && <p className='message error'>Task name is requiered</p>}
        </div>
    )
}

export default TaskForm