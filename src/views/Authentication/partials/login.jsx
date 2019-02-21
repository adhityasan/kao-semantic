import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Divider,
  Input,
  Icon,
  Form,
  Label,
  Message,
  Checkbox
} from 'semantic-ui-react'

function loginForm(props) {
  const { loading, showWarning, showError, submitHandler, formChangeHandler, identifier, switchIdentifier, passwordToggler, showPassword, formElements } = props
  let identifierField = identifier == 'email' ? 
    (<Form.Field>
      <Label as='a' icon='hand point right' content='click to use username instead' pointing='below' onClick={() => switchIdentifier('email')} />
      <Input type="text" iconPosition='left' placeholder='Email' name="email" onChange={formChangeHandler} autoComplete="on" value={formElements.email.value}>
        <input />
        <Icon name='at' />
      </Input>
    </Form.Field>) 
    :
    (<Form.Field>
      <Label as='a' icon='hand point right' content='click to use email instead' pointing='below' onClick={() => switchIdentifier('username')} />
      <Input type="text" iconPosition='left' placeholder='Username' name="username" onChange={formChangeHandler} autoComplete="on" value={formElements.username.value}>
        <input />
        <Icon name='user' />
      </Input>
    </Form.Field>)


  let passwordField = (
    <Form.Field>
      <Input type={showPassword ? 'text' : 'password'} iconPosition='left' labelPosition='right' placeholder='Password' name="password" onChange={formChangeHandler} autoComplete="on" action>
        <input />
        <Icon name='lock' />
        <Button 
          type='button'
          compact 
          active={showPassword} 
          onClick={passwordToggler}
          color={showPassword ? 'teal' : null}>
          <Button.Content visible>
            <Icon name='eye' />
          </Button.Content>
        </Button>
      </Input>
    </Form.Field>
  )
  
  return (
    <Form loading={loading} warning={showWarning} error={showError} success={false} onSubmit={submitHandler}>
      <Message warning header='Something Went Wrong'
        list={[ 'Email or username was not found in our system.', 'You have no group yet.' ]}
      />
      { identifierField }
      { passwordField }
      <Checkbox checked={formElements.remember.value} name='remember' fitted label='Remember me' onChange={formChangeHandler} />
      <Divider/>
      <Button color='teal' type="submit" fluid>Sign in</Button>
    </Form>
  )
}

loginForm.propTypes = {
  loading: PropTypes.bool,
  showWarning: PropTypes.bool,
  showError: PropTypes.bool,
  submitHandler: PropTypes.func,
  formChangeHandler: PropTypes.func,
  switchIdentifier: PropTypes.func,
  identifier: PropTypes.string,
  passwordToggler: PropTypes.func,
  showPassword: PropTypes.bool,
  formElements: PropTypes.object
}

export default loginForm