import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ProjectState from '../context/projects/projectState';
import TaskState from '../context/tasks/taskState';
import AlertState from '../context/alert/alertState';
import AuthState from '../context/auth/authState';

import tokenAuth from '../service/token';

import PrivateRoute from './routes/privateRoute';
import Login from './auth/Login';
import Register from './auth/Register';
import Projects from './projects/Projects';

// Check if there is an authenticated user
const token = localStorage.getItem('token');
if (token) { tokenAuth(token); }

function App() {
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path='/' component={ Login } />
                <Route exact path='/register' component={ Register } />
                <PrivateRoute exact path='/projects' component={ Projects } />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;