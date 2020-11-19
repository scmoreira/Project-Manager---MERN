import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import ProjectState from '../context/projects/projectState'
import TaskState from '../context/tasks/taskState'


import Login from './auth/Login'
import Register from './auth/Register'
import Projects from './projects/Projects'

function App() {
  return (
    <ProjectState>
      <TaskState>
        <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/projects' component={Projects} />
          </Switch>
        </Router>
      </TaskState>
    </ProjectState>
  )
}

export default App
