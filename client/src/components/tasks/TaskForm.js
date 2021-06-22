import React, { useState, useContext, useEffect } from 'react';
import ProjectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

const TaskForm = () => {

    const { project } = useContext(ProjectContext);
    const { selectedTask, taskValidation, getProjectTasks, showError, addTask, updateTask, cleanSelected } = useContext(TaskContext);
    const [task, setTask] = useState({ name: '' });

    useEffect(() => {
        if (selectedTask !== null) {
            setTask(selectedTask);
        } else {
            setTask({ name: '' });
        }
    }, [selectedTask]);

    if (!project) return null;

    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (task.name.trim() === '') {
            showError();
            return;
        }
        if (selectedTask === null) {
            task.projectId = project[0]._id;
            addTask(task);
        } else {
            updateTask(task);
            cleanSelected();
        }
        getProjectTasks(project[0].id);
        setTask({ name: '' });
    };

    return (
        <div className='form'>
            <form onSubmit={ handleSubmit }>
                <div className='input-container'>
                    <input
                        type='text'
                        name='name'
                        value={ task.name }
                        className='input-text'
                        placeholder='Task Name'
                        onChange={ handleChange }
                        data-cy='task-input'
                    />
                </div>
                <div className='input-container'>
                    <input
                        type='submit'
                        className='btn btn-primary btn-submit btn-block'
                        value={ selectedTask ? 'Edit task' : 'Add task' }
                        data-cy='submit-task'
                    />
                </div>
            </form>
            {taskValidation && <p data-cy='alert' className='message error'>Task name is requiered</p> }
        </div>
    );
};

export default TaskForm;