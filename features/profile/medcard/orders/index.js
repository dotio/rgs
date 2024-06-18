import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {OrderInfo} from './order-info'
import {useDebouncedEffect} from '../../../../helpers/debounce'
import {Container} from '../../../../ui/grid/container'
import {FiltersTemplate} from '../../../../templates/filters'
import {Wrapper} from '../../../../ui/wrapper'

export const OrdersListComponent = () => {
  const dispatch = useDispatch()
  const filters = useSelector(state => state.profileMedcard.ordersFilters)
  const [searchText, setSearchText] = useState(filters ? filters.search: '')
  const {items} = useSelector(state => state.profileMedcard.orders)

  const getFilters = () => {
    return [
      {
        type: 'search',
        key: 'search',
        value: searchText,
        placeholder: 'Найти...',
      },
      {
        type: 'specializations',
        key: 'specializationId',
        value: filters.specializationId,
      },
      {
        type: 'appointmentType',
        key: 'type',
        value: filters.type,
      },
      {
        type: 'simple-date-time',
        key: 'date',
        value:  filters.date,
      },
    ]
  }

  const handleFiltersChange = (field, value) => {
    if(field === 'search') {
      setSearchText(value)
      return
    }

    dispatch.profileMedcard.updateOrdersFilters({
      [field]: value
    })
  }

  useDebouncedEffect(() => dispatch.profileMedcard.updateOrdersFilters({search: searchText}), 500, [searchText])

  return (
    <>
      <Wrapper padding={'0 0 16px'} mobilePadding={'0 0 12px'}>
        <Container>
          <FiltersTemplate onChange={handleFiltersChange} filters={getFilters()} />
        </Container>
      </Wrapper>
      <Wrapper flow={'column'} gap={'6px'}>
        {items.map(order => <OrderInfo key={order.id} {...order}/>)}
      </Wrapper>
    </>
  )
}