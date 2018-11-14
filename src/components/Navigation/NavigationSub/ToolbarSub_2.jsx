import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

import classes from './ToolbarSub_2.module.scss'

const toolbarSub_1 = props => {
  const { navigations, showup, activateHandler, actives, childPusher } = props
  const subClassName = showup ? [classes.SubTwo, classes.Active].join(' ') : classes.SubTwo
  const menuClassname = nested => nested ? [classes.Menu, classes.Nest].join(' ') : classes.Menu

  return (
    <ul className={subClassName}>
      {navigations.map((nav, key) => (
        <li className={menuClassname(nav.nested)} key={key} >
          <NavLink activeClassName={classes.Active} to={nav.route} onClick={() => activateHandler(nav.route, nav.nested)}>
            <Icon className={classes.MenuIcon} name={nav.icon} size='large' />
            <span className={classes.MenuText}>
              <b>{nav.text}</b>
            </span>
            { nav.nested ? childPusher(actives.includes(nav.route)) : null }
          </NavLink>
        </li>
      ))}
    </ul>
  )  
}

toolbarSub_1.propTypes = {
  navigations: PropTypes.array,
  childPusher: PropTypes.func,
  showup: PropTypes.bool,
  activateHandler: PropTypes.func,
  actives: PropTypes.array
}

export default toolbarSub_1