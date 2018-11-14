import React from 'react'
import { connect } from 'react-redux'
import { NavLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

import Aux from '@hoc/Aux'

import StretchSub from './NavigationSub/StretchSidebarSub_1'
import ShrinkSub from './NavigationSub/ShrinkSidebarSub_1'
import classes from './SidebarNav.module.scss'

class SidebarNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      actives: [],
      onpath: ''
    }
    this.activateMenu = this.activateMenu.bind(this)
  }

  activateMenu(navRoute, nested) {
    let updatedAcives = [ ...this.state.actives ]
    if (this.state.actives.includes(navRoute)) {
      updatedAcives.splice( updatedAcives.indexOf(navRoute), 1 )
    } else {
      updatedAcives.push(navRoute)
    }
    if (!nested) {
      this.setState({onpath: navRoute})
    }
    this.setState({actives: updatedAcives})
  }

  render() {
    const { navigationStretched, navigations } = this.props
    const shrinkMenuClassname = nested => nested ? [classes.NavShrink_Menu, classes.Nest].join(' ') : classes.NavShrink_Menu

    const childPusher = (pushed) => (
      <Aux>
        <div className={classes.Sizer}></div>
        <div className={classes.childPusher}>
          <Icon className={classes.ChildPusherIcon} name={pushed ? 'minus square outline' : 'plus square outline'} />
        </div>
      </Aux>
    )

    const onstretchNav = (
      <ul className={classes.NavStretch}>
        {navigations.map((nav, key) => (
          <li className={classes.NavStretch_Menu} key={key} >
            <NavLink activeClassName={classes.Active} to={nav.route} onClick={() => this.activateMenu(nav.route, nav.nested)}>
              <Icon className={classes.MenuIcon} name={nav.icon} size='large' />
              <span className={classes.MenuText}>
                <b>{nav.text}</b>
              </span>
              { nav.nested ? childPusher(this.state.actives.includes(nav.route)) : null }                
            </NavLink>
            { nav.nested ? <StretchSub actives={this.state.actives} showup={this.state.actives.includes(nav.route)} activateHandler={this.activateMenu} navigations={nav.childs} childPusher={childPusher} /> : null }                
          </li>
        ))}
      </ul>
    )

    const onshrinkNav = (
      <ul className={classes.NavShrink}>
        {navigations.map((nav, key) => (
          <li className={shrinkMenuClassname(nav.nested)} key={key}>
            <NavLink activeClassName={classes.Active} to={nav.route}>
              <Icon className={classes.MenuIcon} name={nav.icon} size='large' />
            </NavLink>
            { nav.nested ? <ShrinkSub navigations={nav.childs} /> : null }                
          </li>
        ))}
      </ul>
    )

    return navigationStretched ? onstretchNav : onshrinkNav
  }
}

SidebarNav.propTypes = {
  navigationStretched: PropTypes.bool,
  navigations: PropTypes.array
}

const mapStateToProps = state => {
  return {
    navigationStretched: state.layout.navigationStretched,
    navigations: state.user.navigations
  }
}

const connect_ = connect(mapStateToProps)(SidebarNav)
const withRouter_ = withRouter(connect_)

export default withRouter_