import React from 'react'
import { Route, Switch } from 'react-router-dom'
import publiRoutes from '@routes/public'

const DashboardLayout = () => {
  return (
    <div>
      <Switch>
        {publiRoutes.map((conf, key) => <Route key={key} exact={conf.exact} path={conf.path} component={conf.component}/>)}
      </Switch>
    </div>
  )
}

export default DashboardLayout