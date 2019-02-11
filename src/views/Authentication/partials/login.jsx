import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Divider,
  Input,
  Icon,
  Form,
  Label,
  Message
} from 'semantic-ui-react'

function loginForm(props) {
  const { loading, showWarning, showError, submitHandler, formChangeHandler, identifier, switchIdentifier } = props
  let identifierField = identifier == 'email' ? 
    ( <Form.Field>
      <Label as='a' icon='mail' content='click to use username instead' pointing='below' onClick={() => switchIdentifier('email')} />
      <Input type="text" iconPosition='left' placeholder='Email' name="email" onChange={formChangeHandler}>
        <input />
        <Icon name='at' />
      </Input>
    </Form.Field> ) 
    :
    (<Form.Field>
      <Label as='a' icon='mail' content='click to use email instead' pointing='below' onClick={() => switchIdentifier('username')} />
      <Input type="text" iconPosition='left' placeholder='Username' name="username" onChange={formChangeHandler}>
        <input />
        <Icon name='at' />
      </Input>
    </Form.Field>)


  let passwordField = (
    <Form.Field>
      <Input type="password" iconPosition='left' placeholder='Password' name="password" onChange={formChangeHandler}>
        <input />
        <Icon name='lock' />
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
      <Divider/>
      <Button color='teal' type="submit" fluid>Sign In</Button>
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
  identifier: PropTypes.string
}

export default loginForm