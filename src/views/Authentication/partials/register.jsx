import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Divider,
  Input,
  Icon,
  Form,
  Message
} from 'semantic-ui-react'

function registerForm(props) {
  const { loading, showWarning, showError, submitHandler, formChangeHandler } = props

  return (
    <Form loading={loading} warning={showWarning} error={showError} success={false} onSubmit={submitHandler}>
      <Message warning header='Something Went Wrong'
        list={[ 'Email or username was not found in our system.', 'You have no group yet.' ]}
      />
      <Form.Field>
        <Input type="text" iconPosition='left' placeholder='Email' name="email" onChange={formChangeHandler} autoComplete="off">
          <input />
          <Icon name='at' />
        </Input>
      </Form.Field>
      <Form.Field>
        <Input type="text" iconPosition='left' placeholder='Username' name="username" onChange={formChangeHandler} autoComplete="off">
          <input />
          <Icon name='user' />
        </Input>
      </Form.Field>
      <Form.Field>
        <Input type="password" iconPosition='left' placeholder='Password' name="password" onChange={formChangeHandler} autoComplete="off">
          <input />
          <Icon name='lock' />
        </Input>
      </Form.Field>
      <Form.Field>
        <Input type="password" iconPosition='left' placeholder='Validate Password' name="validatepassword" onChange={formChangeHandler} autoComplete="off">
          <input />
          <Icon name='lock' />
        </Input>
      </Form.Field>
      <Divider/>
      <Button color='teal' type="submit" fluid>Sign Up</Button>
    </Form>
  )
}

registerForm.propTypes = {
  loading: PropTypes.bool,
  showWarning: PropTypes.bool,
  showError: PropTypes.bool,
  submitHandler: PropTypes.func,
  formChangeHandler: PropTypes.func,
  switchIdentifier: PropTypes.func,
  identifier: PropTypes.string
}

export default registerForm