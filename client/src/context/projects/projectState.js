import React, { useReducer } from 'react';

import UserService from '../../service/user.service';

import ProjectContext from './projectContext';
import ProjectReducer from './projectReducer';
import {
    PROJECT_FORM,
    GET_PROJECTS,
    ADD_PROJECT,
    PROJECT_VALIDATION,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR
} from '../../types';

const ProjectState = props => {

    const initialState = {
        projects: [],
        project: null,
        formState: false,
        projectValidation: false,
        message: null
    };

    const [state, dispatch] = useReducer(ProjectReducer, initialState);

    const getProjects = async () => {
        try {
            const response = await UserService.get('/api/project');
            dispatch({ type: GET_PROJECTS, payload: response.data });
        } catch (error) {
            const alert = {
                message: 'An error has ocurred',
                category: 'alert-error'
            };
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            });
        }
    };

    const showForm = () => { dispatch({ type: PROJECT_FORM }); };

    const showError = () => { dispatch({ type: PROJECT_VALIDATION }); };

    const addProject = async project => {
        try {
            const response = await UserService.post('/api/project', project);
            dispatch({
                type: ADD_PROJECT,
                payload: response.data
            });
        } catch (error) {
            const alert = {
                message: 'An error has ocurred',
                category: 'alert-error'
            };
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            });
        }
    };

    const currentProject = projectID => {
        dispatch({ type: CURRENT_PROJECT, payload: projectID });
    };

    const deleteProject = async projectID => {
        try {
            await UserService.delete(`/api/project/${projectID}`);
            dispatch({
                type: DELETE_PROJECT,
                payload: projectID
            });
        } catch (error) {
            const alert = {
                message: 'An error has ocurred',
                category: 'alert-error'
            };
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            });
        }
    };

    return (
        <ProjectContext.Provider
            value={ {
                projects: state.projects,
                project: state.project,
                formState: state.formState,
                projectValidation: state.projectValidation,
                message: state.message,
                showForm,
                showError,
                getProjects,
                addProject,
                currentProject,
                deleteProject
            } }
        >
            {props.children }
        </ProjectContext.Provider>
    );

};

export default ProjectState;