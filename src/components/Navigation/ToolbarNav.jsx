import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter, NavLink } from 'react-router-dom'
import { Icon }from 'semantic-ui-react'

import Aux from '@hoc/Aux'

import classes from './ToolbarNav.module.scss'
import SubMenu from './NavigationSub/ToolbarSub_1'

class ToolbarNav extends Component {
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
    const { navigations } = this.props
    const menuClassname = nested => nested ? [classes.Toolbar_Menu, classes.Nest].join(' ') : classes.Toolbar_Menu
    const childPusher = (pushed) => (
      <Aux>
        <div className={classes.Sizer}></div>
        <div className={classes.childPusher}>
          <Icon className={classes.ChildPusherIcon} name={pushed ? 'minus square outline' : 'plus square outline'} />
        </div>
      </Aux>
    )

    return (
      <ul className={classes.ToolbarNav}>
        {navigations.map((nav, key) => (
          <li className={menuClassname(nav.nested)} key={key} >
            <NavLink activeClassName={classes.Active} to={nav.route} onClick={() => this.activateMenu(nav.route, nav.nested)}>
              <Icon className={classes.MenuIcon} name={nav.icon} size='large' />
              <span className={classes.MenuText}>
                <b>{nav.text}</b>
              </span>
              { nav.nested ? childPusher(this.state.actives.includes(nav.route)) : null }
            </NavLink>
            { nav.nested ? <SubMenu actives={this.state.actives} showup={this.state.actives.includes(nav.route)} activateHandler={this.activateMenu} navigations={nav.childs} childPusher={childPusher}/> : null }
          </li>
        ))}
      </ul>
    )
  }
}

ToolbarNav.propTypes = {
  navigations: PropTypes.array
}

const mapStateToProps = state => {
  return {
    navigationStretched: state.layout.navigationStretched,
    navigations: state.user.navigations
  }
}

const connect_ = connect(mapStateToProps)(ToolbarNav)
const withRouter_ = withRouter(connect_)
export default withRouter_