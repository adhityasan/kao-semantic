import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Segment,
  Icon,
  Header
} from 'semantic-ui-react'

import * as _auth from '@constants/authType'
import Aux from '@hoc/Aux'
import formValidate from '@utils/formValidate'
import * as actions from '@actions'
import { clog } from '@utils/utility'

import classes from './Authentication.module.scss'
import loginForm from './formElements/loginFormElements'
import registerForm from './formElements/registerFormElements'
import LoginPart from './partials/login'
import RegisterPart from './partials/register'

class AuthenticationView extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      loginIdentifier: 'email',
      loginForm: loginForm,
      registerForm: registerForm,
      activeRegisterForm: false,
      showWarning: false,
      showError: false,
      formIsValid: false,
      showPassword: false
    }
    this.formChangeHandler = this.formChangeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
    this.switchLoginIdentifier = this.switchLoginIdentifier.bind(this)
    this.switchForm = this.switchForm.bind(this)
  }

  switchLoginIdentifier() {
    if (this.state.loginIdentifier === 'email') {
      this.setState({ loginIdentifier: 'username' })
    } else {
      this.setState({ loginIdentifier: 'email' })
    }
  }

  switchForm() {
    this.setState(prevState => ({ activeRegisterForm: !prevState.activeRegisterForm }))
  }

  submitHandler(e) {
    e.preventDefault()
    const authType = (this.state.signUpMode) ? _auth.SIGN_UP : _auth.SIGN_IN
    const authData = { 
      username: this.state.loginForm.username.value,
      email: this.state.loginForm.email.value,
      password: this.state.loginForm.password.value 
    }
    
    this.props.onAuth(authData, authType)
  }

  formChangeHandler(e) {
    const targetName = e.currentTarget.name
    const updatedloginForm = { ...this.state.loginForm }
    clog(updatedloginForm, 'UPDATED AUTH FORM')
    clog(this.state.loginForm, 'STATE AUTH FORM')
    const updatedElement = { ...updatedloginForm[targetName] }
    updatedElement.value = e.target.value
    updatedElement.touched = true

    const validity = formValidate(updatedElement)
    updatedElement.valid = validity.isvalid
    updatedElement.helperText = validity.errorMessage

    let updatedFormIsValid = true
    for (const element in updatedloginForm) {
      updatedFormIsValid = updatedloginForm[element].valid && updatedFormIsValid
    }

    updatedloginForm[targetName] = updatedElement
    this.setState({ loginForm: updatedloginForm, formIsValid: updatedFormIsValid })
  }

  render() {
    const headerContent = this.state.activeRegisterForm ? 'CREATE NEW ACCOUNT' : 'SIGN IN TO YOUR ACCOUNT'
      
    return (
      <div className={classes.AuthContainer}>
        <Header className={classes.AuthHeader} as='h2' color='teal'>
          <Icon name='shield alternate' />
          <Header.Content>{headerContent}</Header.Content>
        </Header>
        <Segment className={classes.AuthSegment} padded>
          {
            this.state.activeRegisterForm
              ?
              <RegisterPart
                loading={this.props.loading} 
                showError={this.state.showError} 
                showWarning={this.state.showWarning}
                submitHandler={this.submitHandler}
                formChangeHandler={this.formChangeHandler}
              />
              : 
              <LoginPart 
                loading={this.props.loading} 
                showError={this.state.showError} 
                showWarning={this.state.showWarning}
                submitHandler={this.submitHandler}
                formChangeHandler={this.formChangeHandler}
                identifier={this.state.loginIdentifier}
                switchLoginIdentifier={this.switchLoginIdentifier}
              />
          }
          <div className={classes.Switcher}>
            {
              this.state.activeRegisterForm 
                ? <Aux>Already have an account ? <a href='#login' onClick={this.switchForm}>Login here</a></Aux>
                : <Aux>Doesn&#39;t have account ? <a href='#register' onClick={this.switchForm}>Let&#39;s sign up</a></Aux>
            }
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