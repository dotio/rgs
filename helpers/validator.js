export class Validator {
  constructor(validators) {
    this.validators = validators
  }

  checkAll = (values) => {
    if (!values) {
      return false
    }
    const errors = {}
    let isGroupValid = true
    Object.keys(this.validators).forEach((fieldName) => {
      const value = values[fieldName] || ''
      const errorText = this.checkOne(fieldName, value)
      if (errorText !== '') {
        isGroupValid = false
      }
      errors[fieldName] = errorText
    })
    return {
      isValid: isGroupValid,
      errors,
    }
  }

  checkOne = (fieldName, value = '') => {
    let errorText = ''
    this.validators[fieldName].forEach((validator) => {
      if (validator.rule instanceof RegExp && !validator.rule.test(value)) {
        errorText =  validator.errorText
      } else if (typeof validator.rule === 'function' && !validator.rule(value)) {
        errorText =  validator.errorText
      }
    })
    return errorText
  }
}

export const nonEmptyString = value => (value.length > 0)
export const nonEmptyArray = nonEmptyString
export const nonEmpty = value => (!!value)
export const isPhoneNumber = value => (value.length === 13)
export const sixOrMore = value => (value.length >= 6)
export const emptyOrSixOrMore = value => (value.length === 0 || value.length >= 6)
export const nonEmptyOrTimeFormat = value => (value.length > 0 && value.split('').filter(item => !isNaN(item)).length === 4)
/* eslint-disable */
export const emailRegExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
/* eslint-enable */
export const isEmail = value => (value.match(emailRegExp))
export const nonEmptyOrDateFormat = value => (value.length > 0 && value.split('').filter(item => !isNaN(item)).length === 8)
