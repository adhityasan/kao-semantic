import React from 'react'
import { Loader } from 'semantic-ui-react'

const AppLoader = () => {
  return (
    <div style={{position: 'fixed',width: '100%',height: '100%',top: '40%'}}>
      <Loader active inline='centered' size='massive' />
    </div>
  )
}

export default AppLoader