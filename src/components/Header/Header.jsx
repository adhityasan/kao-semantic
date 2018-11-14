import React from 'react'
import PropTypes from 'prop-types'

const HeaderComponent = props => {
  return <div>{props.children}</div>
}

HeaderComponent.propTypes = {
  children: PropTypes.node
}

export default HeaderComponent