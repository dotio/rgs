import React from 'react'
import {useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import {Autocomplete} from './autocomplete'
import {debounce, debouncePromise} from '../../helpers/debounce'

export const AsyncAutocomplete = ({search, timeout, ...rest}) => {
  const [items, setItems] = useState([])

  const memoizedSearchFn = useCallback(debounce(debouncePromise(search), timeout), [search])
  const inputHandler = (value) => value !== '' ? memoizedSearchFn(value).then((res) => setItems(res)) : setItems([])

  return (
    <Autocomplete {...rest} options={items} onInputChange={inputHandler} />
  )
}

AsyncAutocomplete.propTypes = {
  timeout: PropTypes.number,
  search: PropTypes.func,
}
AsyncAutocomplete.defaultProps = {
  timeout: 300,
  search: () => {},
}