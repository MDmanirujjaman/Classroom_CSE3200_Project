import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Student from './components/main_files/agms/Student'
import LogIn from './components/main_files/LogIn'

export default function Routes() {
    return (
        <Switch>
            <Route exact path = '/' component = {LogIn} />
            <Route path = '/classes' component = {Student} />
        </Switch>
    )
}
