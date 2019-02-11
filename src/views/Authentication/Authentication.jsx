import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Segment,
  Icon,
  Header
} from 'semantic-ui-react'

import * as _auth from '@constants/authType'
import formValidate from '@utils/formValidate'
import * as actions from '@actions'
import { clog } from '@utils/utility'

import classes from './Authentication.module.scss'
import authForm from './formElements/formElements'
import LoginPart from './partials/login'

class AuthenticationView extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      identifier: 'email',
      authForm: authForm,
      showWarning: false,
      showError: false,
      formIsValid: false,
      showPassword: false
    }
    this.formChangeHandler = this.formChangeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.switchIdentifier = this.switchIdentifier.bind(this)
  }

  switchIdentifier() {
    if (this.state.identifier === 'email') {
      this.setState({ identifier: 'username' })
    } else {
      this.setState({ identifier: 'email' })
    }
  }

  submitHandler(e) {
    e.preventDefault()
    const authType = (this.state.signUpMode) ? _auth.SIGN_UP : _auth.SIGN_IN
    const authData = { 
      username: this.state.authForm.username.value,
      email: this.state.authForm.email.value,
      password: this.state.authForm.password.value 
    }
    
    this.props.onAuth(authData, authType)
  }

  formChangeHandler(e) {
    const targetName = e.currentTarget.name
    const updatedAuthForm = { ...this.state.authForm }
    clog(updatedAuthForm, 'UPDATED AUTH FORM')
    clog(this.state.authForm, 'STATE AUTH FORM')
    const updatedElement = { ...updatedAuthForm[targetName] }
    updatedElement.value = e.target.value
    updatedElement.touched = true

    const validity = formValidate(updatedElement)
    updatedElement.valid = validity.isvalid
    updatedElement.helperText = validity.errorMessage

    let updatedFormIsValid = true
    for (const element in updatedAuthForm) {
      updatedFormIsValid = updatedAuthForm[element].valid && updatedFormIsValid
    }

    updatedAuthForm[targetName] = updatedElement
    this.setState({ authForm: updatedAuthForm, formIsValid: updatedFormIsValid })
  }

  render() {
    return (
      <div className={classes.AuthContainer}>
        <Header className={classes.AuthHeader} as='h2' color='teal'>
          <Icon name='shield alternate' />
          <Header.Content>SIGN IN TO YOUR ACCOUNT</Header.Content>
        </Header>
        <Segment className={classes.AuthSegment} padded>
          <LoginPart 
            loading={this.props.loading} 
            showError={this.state.showError} 
            showWarning={this.state.showWarning}
            submitHandler={this.submitHandler}
            formChangeHandler={this.formChangeHandler}
            identifier={this.state.identifier}
            switchIdentifier={this.switchIdentifier}
          />
          <div className={classes.Switcher}>
            Doesn&#39;t have account ? <a href='#'> Let&#39;s sign up</a>
          </div>
        </Segment>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token,
    redirectPath: state.auth.redirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (authData, authType) => dispatch(actions.auth(authData, authType))
  }
}

const wrapped_connect_AuthenticationView = connect(mapStateToProps, mapDispatchToProps)(AuthenticationView)


AuthenticationView.propTypes = {
  loading: PropTypes.bool,
  onAuth: PropTypes.func
}

export default wrapped_connect_AuthenticationView