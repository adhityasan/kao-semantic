import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

import classes from './ShrinkSidebarSub_1.module.scss'
import ShrinkSub from './ShrinkSidebarSub_2'

const shrinkSidebarSub_1 = props => {
  const { navigations } = props
  const menuClassname = nested => nested ? [classes.SubOne_Menu, classes.Nest].join(' ') : classes.SubOne_Menu
  return (
    <ul className={classes.SubOne}>
      {navigations.map((nav, key) => (
        <li className={menuClassname(nav.nested)} key={key}>
          <NavLink activeClassName={classes.Active} to={nav.route}>
            <Icon className={classes.SubOne_MenuIcon} name={nav.icon} size='large' />
            <span className={classes.SubOne_MenuText}>
              <b>{nav.text}</b>
            </span>
          </NavLink>
          { nav.nested ? <ShrinkSub navigations={nav.childs} /> : null }
        </li>
      ))}
    </ul>
  )
}

shrinkSidebarSub_1.propTypes = {
  navigations: PropTypes.array,
  childPusher: PropTypes.node,
  showup: PropTypes.bool,
  activateHandler: PropTypes.func,
  actives: PropTypes.array
}

export default shrinkSidebarSub_1