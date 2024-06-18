import React from 'react'
import {AuthBlock} from '../features/login/auth-block'
import {CommunicationBlock} from '../features/communication/communication-block'
import {ActivationBlock} from '../features/activation/activation-block'
import {SearchWhiteBlock} from '../features/search/search-white-block'
import {AppointmentBlock} from '../features/profile/appointment-block'
import {Gap} from '../ui/gap'
import {MainLogo} from '../ui/mobile-logo'
import {useSelector} from 'react-redux'
import {GeneralRepository} from '../general/repository'
import {MainBannersBlock} from '../features/banners/main-banners'
import {openModalsFromQuery} from '../helpers/modals-from-query'

const Index = ({/*discounts, */appointment}) => {
  const loggedIn = useSelector(state => state.login.loggedIn)
  return (
    <>
      <MainLogo small={false}/>
      <Gap>
        {!loggedIn && <AuthBlock/>}
        <CommunicationBlock/>
        {!loggedIn && <ActivationBlock/>}
        {loggedIn && <ActivationBlock/>}
        <SearchWhiteBlock/>
        {appointment && <AppointmentBlock {...appointment}/>}
        {(!loggedIn) && <MainBannersBlock/>}
      </Gap>
    </>
  )
}

Index.getInitialProps = async ({reduxStore, query}) => {
  reduxStore.dispatch.router.setPageTitle('Главная')
  if (reduxStore.getState().login.loggedIn) {
    const [appointment, discounts] = await Promise.all([
      GeneralRepository.getNextEvent(),
    ])
    openModalsFromQuery(query, reduxStore.dispatch)
    return {
      appointment: Object.keys(appointment).length > 0 ? appointment : null,
      discounts,
    }
  } else {
    return {
      appointment: null,
      discounts: [],
    }
  }
}
export default Index