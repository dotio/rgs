import React from 'react'
import {scroller, Element} from 'react-scroll'
import {ProfileTemplate} from '../../../features/profile/template'
import {redirectNotAuth} from '../../../lib/redirect'
import {Addresses} from '../../../features/profile/settings/addresses'
//import {Subscriptions} from '../../../features/profile/settings/subscriptions'
import {Wrapper} from '../../../ui/wrapper'
import {Finance} from '../../../features/profile/settings/finance'
import {GeneralDataBlock} from '../../../features/profile/medcard/general-data-block'

const Settings = ({medcardId}) => {
  React.useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '')
      scroller.scrollTo(id, {
        smooth: true
      })
    }
  }, [])

  return (
    <ProfileTemplate medcardId={medcardId}>
      <Wrapper gap={'6px'} flow={'column'}>
        <GeneralDataBlock/>
        <Element name={'settings-addresses'}>
          <Addresses />
        </Element>
        <Element name={'settings-finance'}>
          <Finance />
        </Element>
        <Element name={'settings-subscriptions'}>
          {/*<Subscriptions/>*/}
        </Element>
      </Wrapper>
    </ProfileTemplate>
  )
}

Settings.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)

  ctx.reduxStore.dispatch.router.setPageTitle('Настройки')

  const {reduxStore} = ctx
  const medcardId = reduxStore.getState().user.mainMedcardId

  await reduxStore.dispatch.profileMedcard.getMedcard(medcardId)
  await reduxStore.dispatch.profileSettings.getAddresses()
  await reduxStore.dispatch.profileSettings.getSettings()
  await reduxStore.dispatch.profileSettings.getBills({limit: 3, offset: 0})

  return {
    medcardId
  }
}

export default Settings