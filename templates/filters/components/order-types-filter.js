import React from 'react'
import {useSelector} from 'react-redux'
import PropTypes from 'prop-types'
import {MultiListFilter} from '../ui/multi-list-filter'
import {SingleListFilter} from '../ui/single-list-filter'

export const OrderTypesFilter = ({value, single, withIcon, onChange, isSelect, mobileWidth}) => {
  const orderTypes = useSelector(state => state.dictionary['order-types'].map(orderType => ({
    value: orderType.id.toString(),
    title: orderType.title,
    tooltip: orderType.description,
    searchBy: orderType.title,
  })))

  const FilterComponent = single ? SingleListFilter : MultiListFilter

  return (
    <FilterComponent
      orderTypeWithoutMinHeight={true}
      orderTypePadding={true}
      title={'Тип приёма'}
      options={orderTypes}
      multi={!single}
      initialValue={value}
      withSearch={false}
      onChange={onChange}
      withIcon={withIcon}
      value={value}
      isSelect={isSelect}
      mobileWidth={mobileWidth}
    />
  )
}

OrderTypesFilter.propTypes = {
  selectedServiceTypes: PropTypes.string,
  onChange: PropTypes.func,
  single: PropTypes.bool,
  withIcon: PropTypes.bool,
  isSelect: PropTypes.bool,
}