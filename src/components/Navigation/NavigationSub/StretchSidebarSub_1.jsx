import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

import classes from './StretchSidebarSub_1.module.scss'
import StretchSub from './StretchSidebarSub_2'

const stretchSidebarSub_1 = props => {
  const { navigations, showup, activateHandler, actives, childPusher } = props
  const subClassName = showup ? [classes.SubOne, classes.Active].join(' ') : classes.SubOne

  return (
    <ul className={subClassName}>
      {navigations.map((nav, key) => (
        <li className={classes.SubOne_Menu} key={key}>
          <NavLink activeClassName={classes.Active} to={nav.route} onClick={() => activateHandler(nav.route, nav.nested)}>
            <Icon className={classes.SubOne_MenuIcon} name={nav.icon} size='large' />
            <span className={classes.SubOne_MenuText}>
              <b>{nav.text}</b>
            </span>
            { nav.nested ? childPusher(actives.includes(nav.route)) : null }
          </NavLink>
          { nav.nested ? <StretchSub actives={actives} showup={actives.includes(nav.route)} activateHandler={activateHandler} navigations={nav.childs} childPusher={childPusher} /> : null }
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