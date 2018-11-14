import React from 'react'
import PropTypes from 'prop-types'

import classes from './BurgerButton.module.scss'

const BurgerButton = props => {
 
  const { clickhandler, navigationStretched } = props
  const classnameshoudbe = navigationStretched ? [classes.Hamburglar, classes.IsOpen].join(' ') : [classes.Hamburglar, classes.IsClosed].join(' ')
  
  return (
    <div 
      id="hamburger" onClick={() => clickhandler()} className={classnameshoudbe}>
      <div className={classes.BurgerIcon}>
        <div className={classes.BurgerContainer}>
          <span className={classes.BurgerBunTop}></span>
          <span className={classes.BurgerFilling}></span>
          <span className={classes.BurgerBunBot}></span>
        </div>
      </div>
    </div>
  )
}

BurgerButton.propTypes = {
  clickhandler: PropTypes.func,
  navigationStretched: PropTypes.bool
}

export default BurgerButton