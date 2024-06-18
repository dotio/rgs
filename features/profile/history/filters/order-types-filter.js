import React from 'react'
import {CheckFilter} from '../../../../ui/filter/check-filter'
import {useDispatch, useSelector} from 'react-redux'
import {getTranslator} from '../../../../utils/translation'

export const OrderTypesFilter = () => {
  const orderTypes = useSelector(state => state.dictionary['order-types'])
  const serviceType = useSelector(state => state.profileHistory.filters['serviceType'])
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))
  return (
    <CheckFilter
      title={translator('profile.history.filter.order', true)}
      options={orderTypes.map(orderType => ({
        value: orderType.id.toString(),
        title: orderType.title,
        tooltip: orderType.description,
      }))}
      value={serviceType}
      onChange={(value) => {
        dispatch.profileHistory.updateFilters({
          serviceType: value
        })
      }}
    />
  )
}