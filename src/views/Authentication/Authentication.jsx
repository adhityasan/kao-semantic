import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Button,
  Segment,
  Divider,
  Input,
  Icon,
  Form,
  Header,
  Label,
  Message
} from 'semantic-ui-react'

import * as _auth from '@constants/authType'
import formValidate from '@utils/formValidate'
import * as actions from '@actions'
import { clog } from '@utils/utility'

import classes from './Authentication.module.scss'
import authForm from './formElements/formElements'

class AuthenticationView extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      useUsername: false,
      authForm: authForm,
      showWarning: false,
      showError: false,
      formIsValid: false,
      showPassword: false
    }
    this.formChangeHandler = this.formChangeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
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

  formChangeHandler(event) {
    const targetName = event.currentTarget.name
    const updatedAuthForm = { ...this.state.authForm }
    clog(updatedAuthForm, 'UPDATED AUTH FORM')
    clog(this.state.authForm, 'STATE AUTH FORM')
    const updatedElement = { ...updatedAuthForm[targetName] }
    updatedElement.value = event.target.value
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
    let { loading } = this.props
    let { showWarning, showError } = this.state

    return (
      <div className={classes.AuthContainer}>
        <Header className={classes.AuthHeader} as='h2' color='teal'>
          <Icon name='shield alternate' />
          <Header.Content>SIGN IN TO YOUR ACCOUNT</Header.Content>
        </Header>
        <Segment className={classes.AuthSegment} padded>
          <Form loading={loading} warning={showWarning} error={showError} success={false} onSubmit={this.submitHandler}>
            <Message warning header='Something Went Wrong'
              list={[ 'Email or username was not found in our system.', 'You have no group yet.' ]}
            />
            {
              this.state.useUsername ?
                <Form.Field>
                  <Label as='a' icon='mail' content='click use email instead' pointing='below' onClick={() => this.setState({ useUsername: false })}/>
                  <Input type="text" iconPosition='left' placeholder='Username' name="username" onChange={this.formChangeHandler}>
                    <input />
                    <Icon name='at' />
                  </Input>
                </Form.Field>
                :
                <Form.Field>
                  <Label as='a' icon='mail' content='click use username instead' pointing='below' onClick={() => this.setState({ useUsername: true })}/>
                  <Input type="text" iconPosition='left' placeholder='Email' name="email" onChange={this.formChangeHandler}>
                    <input />
                    <Icon name='at' />
                  </Input>
                </Form.Field>
            }
            <Form.Field>
              <Input type="password" iconPosition='left' placeholder='Password' name="password" onChange={this.formChangeHandler}>
                <input />
                <Icon name='lock' />
              </Input>
            </Form.Field>
            <Divider/>
            <Button color='teal' type="submit" fluid>Sign In</Button>
          </Form>
          <div className={classes.Switcher}>
            Doesn&#39;t have account ? <a>Sign up here</a>
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