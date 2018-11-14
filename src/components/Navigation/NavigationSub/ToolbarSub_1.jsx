import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'

import classes from './ToolbarSub_1.module.scss'
import SubMenu from './ToolbarSub_2'

const toolbarSub_1 = props => {
  const { navigations, showup, activateHandler, actives, childPusher } = props
  const subClassName = showup ? [classes.SubOne, classes.Active].join(' ') : classes.SubOne
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
          { nav.nested ? <SubMenu actives={actives} showup={actives.includes(nav.route)} activateHandler={activateHandler} navigations={nav.childs} childPusher={childPusher} /> : null }
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