import * as _val from '@constants/validationType'

const checkFormElementValidity = (updatedElement) => {
  let valid = true
  let errorMessage = ''
  const value = updatedElement.value.trim()
  let valueNotEmpty = value.length > 0

  if (updatedElement.validations) {
    for (let validation in updatedElement.validations) {

      if (validation === _val.required && updatedElement.validations[validation]) {
        let validationResult = (value !== '')
        valid = (validationResult && valid)
        if (!validationResult && !valid) {
          errorMessage = `${updatedElement.labelText} should not be empty`
        }
      }

      if (validation === _val.minLength) {
        let validationResult = (value.length >= updatedElement.validations.minLength)
        valid = (validationResult && valid)
        if ((!validationResult && !valid) && valueNotEmpty) {
          errorMessage = `${updatedElement.labelText} should contain at least ${updatedElement.validations.minLength} characters`
        }
      }

      if (validation === _val.maxLength) {
        let validationResult = (value.length <= updatedElement.validations.maxLength)
        valid = (validationResult && valid)
        if ((!validationResult && !valid) && valueNotEmpty) {
          errorMessage = `${updatedElement.labelText} should not contain more than ${updatedElement.validations.maxLength} characters`
        }
      }

      if (validation === _val.regex) {
        let validationResult = updatedElement.validations.regex.test(value)
        valid = (validationResult && valid)
        if ((!validationResult && !valid) && valueNotEmpty) {
          errorMessage = `Please insert the right ${updatedElement.labelText} format`
        }
      }
      
    }
  }

  return { isvalid: valid, errorMessage: errorMessage}
}

export default checkFormElementValidity