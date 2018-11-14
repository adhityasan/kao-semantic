import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

import classes from './StretchSidebarSub_2.module.scss'

const stretchSidebarSub_1 = props => {
  const { navigations, showup, activateHandler, childPusher, actives } = props
  const subClassName = showup ? [classes.SubTwo, classes.Active].join(' ') : classes.SubTwo

  return (
    <ul className={subClassName}>
      {navigations.map((nav, key) => (
        <li className={classes.SubTwo_Menu} key={key}>
          <NavLink activeClassName={classes.Active} to={nav.route} onClick={() => activateHandler(nav.route, nav.nested)}>
            <Icon className={classes.SubTwo_MenuIcon} name={nav.icon} size='large' />
            <span className={classes.SubTwo_MenuText}>
              <b>{nav.text}</b>
            </span>
            { nav.nested ? childPusher(actives.includes(nav.route)) : null }
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

stretchSidebarSub_1.propTypes = {
  navigations: PropTypes.array,
  childPusher: PropTypes.func,
  showup: PropTypes.bool,
  activateHandler: PropTypes.func,
  actives: PropTypes.array
}


export default stretchSidebarSub_1