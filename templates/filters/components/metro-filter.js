import React from 'react'
import PropTypes from 'prop-types'
import {useSelector} from 'react-redux'
import {MultiListFilter} from '../ui/multi-list-filter'
import {Metro} from '../../../ui/metro'

export const MetroFilter = ({value, onChange}) => {
  const metroList = useSelector(state => state.dictionary['metroStations'].map(({id, name, color}) => ({
    value: id.toString(),
    title: name,
    color: `#${color}`,
    searchBy: name,
  })))

  return (
    <MultiListFilter
      title={'Метро'}
      searchPlaceholder={'Найти метро...'}
      options={metroList}
      multi={true}
      withMetroColor
      initialValue={value}
      renderItem={(props, isSelected, onClick) => (<Metro key={'item-' + props.value} {...props} isSelected={isSelected} onClick={onClick} />)}
      onChange={onChange}
    />
  )
}

MetroFilter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
}