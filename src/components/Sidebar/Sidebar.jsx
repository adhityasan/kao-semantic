import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Image, Transition, Icon, Popup, Dropdown, Responsive } from 'semantic-ui-react'

import Avatar from '@components/Avatar/Avatar'
import SidebarNav from '@components/Navigation/SidebarNav'
import { ucFirst, implode } from '@utils/utility'
import * as _act from '@constants/actionType' 

import SemanticLogo from '@assets/images/semantic.png'
import classes from './Sidebar.module.scss'

const userOptions = [
  { key: 'user', text: 'Account', icon: 'user' },
  { key: 'settings', text: 'Settings', icon: 'settings' },
  { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
]

class SidebarComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jiggleHead: true,
    }
    this.stretchHandler = this.stretchHandler.bind(this)
    this.monHeaderHandler = this.monHeaderHandler.bind(this)
  }

  monHeaderHandler() {
    this.setState(prevState => ({jiggleHead: !prevState.jiggleHead}))
  }

  stretchHandler() {
    if (this.props.navigationStretched) {
      this.props.shrinkNavigation()
    } else {
      this.props.stretchNavigation()
    }
  }

  render() {
    const { navigationStretched, username } = this.props
    const sidebarClassname = navigationStretched 
      ? [classes.Sidebar, classes.Stretched].join(' ') 
      : [classes.Sidebar, classes.Shrinked].join(' ')
    const stretcherIcon = navigationStretched ? 'chevron left' : 'chevron right'
    const sidebarAvatar = (
      <div className={classes.Avatar}>
        <Avatar 
          withpopup={!navigationStretched}
          image={{
            src: 'https://react.semantic-ui.com/images/avatar/large/patrick.png', 
            avatar: true, 
            fluid: true}} 
          popup={{
            content: username,
            position: 'right center',
            size: 'mini',
            hideOnScroll: true
          }} />
      </div>
    )

    return (
      <Responsive className={sidebarClassname} minWidth={Responsive.onlyTablet.minWidth}>
        <div className={classes.SidebarHeader} onMouseEnter={this.monHeaderHandler}>
          <Transition visible={this.state.jiggleHead} animation='jiggle' duration={500}>
            <Image src={SemanticLogo} size='mini' />
          </Transition>
        </div>
        <div className={ !navigationStretched ? classes.SidebarLists : implode([classes.SidebarLists, classes.ScrollableVertical], ' ')}>
          <SidebarNav navigationStretched={navigationStretched} />
        </div>
        <div className={classes.SidebarSizer}></div>
        <div className={classes.SidebarFooter}>
          <Transition visible={navigationStretched} animation='zoom' duration={600}>
            <h4 className={classes.Username}>{ucFirst(username)}</h4> 
          </Transition>
          <Dropdown 
            floating
            inline
            lazyLoad 
            trigger={sidebarAvatar} 
            options={userOptions} 
            direction="right" 
            pointing={ navigationStretched ? 'left' : 'top left'} 
            icon={null}/>
        </div>
        <div className={classes.Stretcher} onClick={this.stretchHandler}>
          <Popup 
            trigger={<Icon style={{color: '#cfd2da'}} name={stretcherIcon} size="small" />} 
            content={ navigationStretched ? 'Shrink Sidebar' : 'Stretch Sidebar'}
            position="right center"
            size="mini" />
        </div>
      </Responsive>
    )
  }
}

SidebarComponent.propTypes = {
  navigationStretched: PropTypes.bool,
  stretchNavigation: PropTypes.func,
  shrinkNavigation: PropTypes.func,
  username: PropTypes.string
}

const mapStateToProps = state => {
  return {
    navigationStretched: state.layout.navigationStretched,
    username: state.user.name
  }
}

const mapDispatchToProps = dispatch => {
  return {
    stretchNavigation: () => dispatch({type: _act.STRETCH_NAVIGATION}),
    shrinkNavigation: () => dispatch({type: _act.SHRINK_NAVIGATION}),
  }
}

const connect_SidebarComponent = connect(mapStateToProps, mapDispatchToProps)(SidebarComponent)
const withRouter_SidebarComponent = withRouter(connect_SidebarComponent)

export default withRouter_SidebarComponent