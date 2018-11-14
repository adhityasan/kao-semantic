import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Transition, Image, Dropdown, Responsive } from 'semantic-ui-react'

import SemanticLogo from '@assets/images/semantic.png'
import * as _act from '@constants/actionType'
import Avatar from '@components/Avatar/Avatar'
import ToolbarNav from '@components/Navigation/ToolbarNav'

import BurgerButton from './BurgerButton/BurgerButton'
import classes from './Toolbar.module.scss'

const userOptions = [
  { key: 'user', text: 'Account', icon: 'user' },
  { key: 'settings', text: 'Settings', icon: 'settings' },
  { key: 'sign-out', text: 'Sign Out', icon: 'sign out' },
]

class ToolbarComponent extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      jiggleLogo: true,
    }
    this.jiggleHandler = this.jiggleHandler.bind(this)
    this.toggleHandler = this.toggleHandler.bind(this)
  }

  jiggleHandler() {
    this.setState(prevState => ({jiggleLogo: !prevState.jiggleLogo}))
  }

  toggleHandler() {
    if (this.props.navigationStretched) {
      this.props.shrinkNavigation()
    } else {
      this.props.stretchNavigation()
    }
  }

  render() {
    const { navigationStretched } = this.props
    const { jiggleLogo } = this.state
    const toolbarClassname = classes.Toolbar
    const navwrapperClassname = navigationStretched ? 
      [classes.NavWrapper, classes.Stretched].join(' ') :
      [classes.NavWrapper, classes.Shrinked].join(' ')
    const sidebarAvatar = (
      <div className={classes.Avatar}>
        <Avatar 
          withpopup={false}
          image={{
            src: 'https://react.semantic-ui.com/images/avatar/large/patrick.png', 
            avatar: true, 
            fluid: true}} />
      </div>
    )
    
    return (
      <Responsive className={classes.ToolbarWrapper} maxWidth={Responsive.onlyTablet.minWidth}>
        <div className={toolbarClassname}>
          <Dropdown 
            floating
            inline
            lazyLoad 
            trigger={sidebarAvatar} 
            options={userOptions} 
            direction="right" 
            pointing={'top right'} 
            icon={null}/>
          <div className={classes.Sizer}></div>
          <div className={classes.AppLogo} onMouseEnter={this.jiggleHandler}>
            <Transition visible={jiggleLogo} animation='jiggle' duration={500}>
              <Image src={SemanticLogo} size='mini' />
            </Transition>
            <span className={classes.AppLogoText}>
              <b>カオナシ</b>
            </span>
          </div>
          <div className={classes.Sizer}></div>
          <BurgerButton clickhandler={this.toggleHandler} navigationStretched={navigationStretched}/>
        </div>
        <div className={navwrapperClassname}>
          <ToolbarNav calledby="toolbar" classes={classes} showtext={true} shrinkonclick/>
        </div>
      </Responsive>
    )
  }
}

ToolbarComponent.propTypes = {
  navigationStretched: PropTypes.bool,
  stretchNavigation: PropTypes.func,
  shrinkNavigation: PropTypes.func,
  currentView: PropTypes.string
}

const mapStateToProps = state => {
  return {
    navigationStretched: state.layout.navigationStretched
  }
}

const mapDispatchToProps = dispatch => {
  return {
    stretchNavigation: () => dispatch({type: _act.STRETCH_NAVIGATION}),
    shrinkNavigation: () => dispatch({type: _act.SHRINK_NAVIGATION}),
  }
}

const connect_ = connect(mapStateToProps, mapDispatchToProps)(ToolbarComponent)
const withRouter_ = withRouter(connect_)

export default withRouter_