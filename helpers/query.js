import {mapObjIndexed} from 'ramda'

export const createQueryParser = (paramsTypes) => {
  return (query) => {
    return mapObjIndexed((value, key) => {
      switch (paramsTypes[key]) {
        case 'array':
          return value.split('/')
        case 'bool':
          return value === 'true'
        default:
          return value
      }
    }, query)
  }
}