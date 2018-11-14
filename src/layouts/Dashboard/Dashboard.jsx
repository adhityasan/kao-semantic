import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Sidebar from '@components/Sidebar/Sidebar'
import Toolbar from '@components/Toolbar/Toolbar'
import dashboardRoutes from '@routes/dashboard'

import classes from './Dashboard.module.scss'

class DashboardLayout extends Component {
  render() {
    return (
      <React.Fragment>
        <Sidebar/>
        <Toolbar currentView={'WORLD JOKES'}/>
        <main className={classes.Content}>
          <Switch>
            {dashboardRoutes.map((conf, key) => <Route key={key} exact={conf.exact} path={conf.path} component={conf.component}/>)}
          </Switch>
        </main>
      </React.Fragment>
    )
  }
}

export default DashboardLayout