import React from 'react'
import { Route, Switch } from 'react-router-dom'
import sampleRoutes from '@routes/sample'

const sampleLayout = () => {
  return (
    <Switch> 
      {sampleRoutes.map((conf, key) => <Route key={key} path={conf.path} component={conf.component}/>)}
    </Switch>
  )
}

export default sampleLayout