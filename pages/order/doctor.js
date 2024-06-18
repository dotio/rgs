import React from 'react'
import {OrderDoctorComponent} from '../../features/order/doctor'
import {AuthSuggestBlock} from '../../features/order/auth-suggest-block'
import {useSelector} from 'react-redux'

const OrderDoctor = ({type}) => {
  const {loggedIn} = useSelector(state => state.login)

  return (
    <>
      {!loggedIn && <AuthSuggestBlock/>}
      <OrderDoctorComponent type={type}/>
    </>
  )
}

OrderDoctor.getInitialProps = async (ctx) => {
  const {reduxStore, query} = ctx

  reduxStore.dispatch.router.setPageTitle('Запишитесь на приём')

  const promises = [
    reduxStore.dispatch.doctors.getDoctor(query.doctorId),
    reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'order-types'}),
    reduxStore.dispatch.profileSettings.getAddresses(),
  ]

  await Promise.all(promises)

  return {
    type: query.type
  }
}

export default OrderDoctor