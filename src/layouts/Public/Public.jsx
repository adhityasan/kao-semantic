import React from 'react'
import { Route, Switch } from 'react-router-dom'

import publiRoutes from '@routes/public'

import classes from './Public.module.scss'

const DashboardLayout = () => {
  return (
    <div className={classes.Content}>
      <Switch>
        {publiRoutes.map((conf, key) => <Route key={key} exact={conf.exact} path={conf.path} component={conf.component}/>)}
      </Switch>
    </div>
  )
}

export default DashboardLayout