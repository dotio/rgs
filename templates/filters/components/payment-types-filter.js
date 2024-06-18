import React from 'react'
import {CheckFilter} from '../../../ui/filter/check-filter'
import {useDispatch, useSelector} from 'react-redux'

export const PaymentTypesFilter = () => {
  //TODO real payment types
  // const pay = useSelector(state => state.dictionary['payment-types'])
  const serviceType = useSelector(state => state.doctors.filters['paymentType'])
  const dispatch = useDispatch()
  return (
    <CheckFilter
      title={'Тип приёма'}
      options={[
        {value: 'payed', title: 'Платный прием'},
        {value: 'oms', title: 'ОМС'},
      ]}
      value={serviceType}
      onChange={(value) => {
        dispatch.doctors.updateFilters({
          paymentType: value
        })
      }}
    />
  )
}