export const signin_formElements = new Object({
  email: {
    valid: false,
    validations: {
      required: true,
      minLength: 8,
      regex: /\S+@\S+\.\S+/
    },
    'labelText': 'Email Address',
    'HelperText': '',
    value: '',
    touched: false,
  },
  username: {
    valid: false,
    validations: {
      required: true,
      minLength: 8,
      regex: /\S+@\S+\.\S+/
    },
    'labelText': 'Username',
    'HelperText': '',
    value: '',
    touched: false,
  },
  password: {
    valid: false,
    validations: {
      required: true,
      minLength: 6,
      maxLength: 20
    },
    labelText: 'Password',
    HelperText: '',
    value: '',
    touched: false
  },
  validatePassword: {
    valid: false,
    validations: {
      required: true,
      minLength: 6,
      maxLength: 20,
      equalTo: 'password'
    },
    labelText: 'Password',
    HelperText: '',
    value: '',
    touched: false
  }
})

export default signin_formElements