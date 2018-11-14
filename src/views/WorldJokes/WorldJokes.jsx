import React from 'react'
import { Segment } from 'semantic-ui-react'

import classes from './WorldJokes.module.css'

class WorldJokesView extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      a: ''
    }
  }

  render() {
    return (
      <div className={classes.view_WorldJokers}>
        <Segment>
          <h1>ADASDASD</h1>
        </Segment>
        <div className={classes.JokesFilter}>
        </div>
      </div>
    )
  }
}

export default WorldJokesView