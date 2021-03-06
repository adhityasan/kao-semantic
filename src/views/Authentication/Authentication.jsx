import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Segment,
  Icon,
  Header
} from 'semantic-ui-react'

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
      showWarning: false,
      showError: false,
      formIsValid: false,
      showPassword: false
    }
    this.formChangeHandler = this.formChangeHandler.bind(this)
    this.loginSubmitHandler = this.loginSubmitHandler.bind(this)
    this.registerSubmitHandler = this.registerSubmitHandler.bind(this)
    this.switchLoginIdentifier = this.switchLoginIdentifier.bind(this)
    this.showPasswordToggler = this.showPasswordToggler.bind(this)
  }

  showPasswordToggler() {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  switchLoginIdentifier() {
    if (this.state.loginIdentifier === 'email') {
      this.setState({ loginIdentifier: 'username' })
    } else {
      this.setState({ loginIdentifier: 'email' })
    }
  }

  loginSubmitHandler(e) {
    e.preventDefault()
    const authData = {
      username: this.state.loginForm.username.value,
      email: this.state.loginForm.email.value,
      password: this.state.loginForm.password.value,
      remember: this.state.loginForm.remember.value
    }
    
    this.props.onAuthLogin(authData, this.state.loginIdentifier)
  }

  registerSubmitHandler(e) {
    e.preventDefault()
    const authData = { 
      username: this.state.registerForm.username.value,
      email: this.state.registerForm.email.value,
      password: this.state.registerForm.password.value,
      validatePassword: this.state.registerForm.validatePassword.value 
    }
    
    this.props.onAuthRegister(authData)
  }

  formChangeHandler(e) {
    const notCheckbox = !e.currentTarget.className.includes('checkbox')
    const targetName = notCheckbox ? e.currentTarget.name : e.currentTarget.children[0].name
    const updatedForm = this.props.location.hash === '#register' ? { ...this.state.registerForm } : { ...this.state.loginForm }
    const updatedElement = { ...updatedForm[targetName] }
    updatedElement.value = notCheckbox ? e.target.value : !e.currentTarget.children[0].checked
    updatedElement.touched = true
    
    clog(targetName, 'THIS CHANGE GOES TO')
    clog(updatedForm, 'UPDATED AUTH FORM')
    clog(updatedElement.value, `${targetName} >> `)

    const validity = formValidate(updatedElement)
    updatedElement.valid = validity.isvalid
    updatedElement.helperText = validity.errorMessage

    let updatedFormIsValid = true
    for (const element in updatedForm) {
      updatedFormIsValid = updatedForm[element].valid && updatedFormIsValid
    }

    updatedForm[targetName] = updatedElement

    if (this.props.location.hash === '#register') {
      this.setState({ registerForm: updatedForm, formIsValid: updatedFormIsValid })
    } else {
      this.setState({ loginForm: updatedForm, formIsValid: updatedFormIsValid })
    }
  }

  render() {
    const onRegisterForm = this.props.location.hash === '#register' ? true : false
    const headerContent = onRegisterForm ? 'CREATE NEW ACCOUNT' : 'SIGN IN TO YOUR ACCOUNT'
      
    return (
      <div className={classes.AuthContainer}>
        <Header className={classes.AuthHeader} as='h2' color='teal'>
          <Icon name={onRegisterForm ? 'user circle' : 'shield alternate' } />
          <Header.Content>{headerContent}</Header.Content>
        </Header>
        <Segment className={classes.AuthSegment} padded>
          {
            onRegisterForm
              ?
              <RegisterPart
                loading={this.props.loading} 
                showError={this.state.showError} 
                showWarning={this.state.showWarning}
                submitHandler={this.registerSubmitHandler}
                formChangeHandler={this.formChangeHandler}
                passwordToggler={this.showPasswordToggler}
                showPassword={this.state.showPassword}
                formElements={this.state.registerForm}
              />
              : 
              <LoginPart 
                loading={this.props.loading} 
                showError={this.state.showError} 
                showWarning={this.state.showWarning}
                submitHandler={this.loginSubmitHandler}
                formChangeHandler={this.formChangeHandler}
                identifier={this.state.loginIdentifier}
                switchIdentifier={this.switchLoginIdentifier}
                passwordToggler={this.showPasswordToggler}
                showPassword={this.state.showPassword}
                formElements={this.state.loginForm}
              />
          }
          <div className={classes.Switcher}>
            {
              onRegisterForm 
                ? <Aux>Already have an account ? <a href='#login'>Login here</a></Aux>
                : <Aux>Doesn&#39;t have account ? <a href='#register'>Let&#39;s sign up</a></Aux>
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
    onAuthLogin: (authData, identifier) => dispatch(actions.authLogin(authData, identifier)),
    onAuthRegister: (authData) => dispatch(actions.authRegister(authData))
  }
}

const wrapped_connect_AuthenticationView = connect(mapStateToProps, mapDispatchToProps)(AuthenticationView)


AuthenticationView.propTypes = {
  loading: PropTypes.bool,
  onAuthLogin: PropTypes.func,
  onAuthRegister: PropTypes.func,
  location: PropTypes.object
}

export default wrapped_connect_AuthenticationView