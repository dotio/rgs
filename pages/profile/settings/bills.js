import {useSelector} from 'react-redux'
import {redirectNotAuth} from '../../../lib/redirect'
import {BackTemplate} from '../../../features/profile/back-template'
import {BillList} from '../../../features/profile/settings/bills'

const Bills = () => {
  const bills = useSelector(state => state.profileSettings.bills)

  return (
    <BackTemplate
      title={'Счета'}
      parent={'Настройки'}
      backUrl={'/profile/settings'}
      parentLink={'/profile/settings'}
    >
      <BillList bills={bills} />
    </BackTemplate>
  )
}

Bills.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)

  ctx.reduxStore.dispatch.router.setPageTitle('Счета')

  const {reduxStore} = ctx
  await reduxStore.dispatch.profileSettings.getBills()
  await reduxStore.dispatch.profileMedcard.getMedcard(reduxStore.getState().user.mainMedcardId)
}

export default Bills