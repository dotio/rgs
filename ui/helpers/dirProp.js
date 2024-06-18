import PropTypes from 'prop-types'

export const dirProp = (prop, dirProps) => {
  if (typeof dirProps === 'string') {
    return `${prop}: ${dirProps};`
  } else {
    return Object.keys(dirProps).reduce((result, key) => {
      return result + `${prop}-${key}: ${dirProps[key]};`
    }, '')
  }
}

export const dirPropType = PropTypes.oneOfType([PropTypes.shape({
  top: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  left: PropTypes.string,
}), PropTypes.string])