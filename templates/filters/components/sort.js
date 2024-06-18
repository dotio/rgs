import React from 'react'
import {RadioListFilter} from '../ui/radio-list-filter'
import PropTypes from 'prop-types'

const DEFAULT_SORT_BY = 'name'

export const ListSorting = ({sortBy, filteringElements, onChange}) => {

  const modalInfo = {
    title: 'Сортировка',
    selectedSortBy: sortBy || DEFAULT_SORT_BY,
    onChange: (sortBy, order) => {
      onChange(sortBy, order)
    },
    elements: filteringElements
  }

  const selectedElement = filteringElements ? filteringElements.find((element) => {
    return element.id === (sortBy ? sortBy : DEFAULT_SORT_BY)
  }) : {}

  return (
    <RadioListFilter
      icon={'sort'}
      title={selectedElement.title}
      modal={modalInfo}/>
  )
}

ListSorting.propTypes = {
  /**
   * Параметр сортировки
   */
  sortBy: PropTypes.string,

  /**
   * Массив с элементами для фильтров
   */
  filteringElements:PropTypes.array,

  /**
   * Callback, вызываемый при изменении фильтра. Возвращает ID выбранного элемента
   */
  onChange: PropTypes.func,
}