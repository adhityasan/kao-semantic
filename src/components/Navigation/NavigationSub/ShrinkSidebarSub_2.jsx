import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

import classes from './ShrinkSidebarSub_2.module.scss'
import ShrinkSub from './ShrinkSidebarSub_2'

const shrinkSidebarSub_1 = props => {
  const { navigations } = props
  const menuClassname = nested => nested ? [classes.SubTwo_Menu, classes.Nest].join(' ') : classes.SubTwo_Menu
  return (
    <ul className={classes.SubTwo}>
      {navigations.map((nav, key) => (
        <li className={menuClassname(nav.nested)} key={key}>
          <NavLink activeClassName={classes.Active} to={nav.route}>
            <Icon className={classes.SubTwo_MenuIcon} name={nav.icon} size='large' />
            <span className={classes.SubTwo_MenuText}>
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