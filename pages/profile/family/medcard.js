import {omit} from 'ramda'
import {redirectNotAuth} from '../../../lib/redirect'
import {ProfileTemplate} from '../../../features/profile/template'
import {MedcardComponent} from '../../../features/profile/medcard'
import {T} from '../../../utils/translation'

const RelativeMedcardPage = ({medcardId}) => {
  return (
    <ProfileTemplate
      parentTitle={<T ucFirst>profile.product.menu.family</T>}
      parentLink={'/profile/family'}
      medcardId={medcardId}
      noLogoutButton
      backUrl={'/profile/family'}
    >
      <MedcardComponent medcardId={medcardId} />
    </ProfileTemplate>
  )
}

RelativeMedcardPage.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)

  ctx.reduxStore.dispatch.router.setPageTitle('Медкарта – Семья')

  const {reduxStore, query} = ctx
  const recommendationsFilter = omit(['id', 'date', 'search'], ctx.query)
  await Promise.all([
    await reduxStore.dispatch.profileMedcard.getMedcard(query.id),
    ctx.reduxStore.dispatch.profileMedcard.getOrders({medcardId: query.id, limit: 3}),
    ctx.reduxStore.dispatch.profileMedcard.getResearches({medcardId: query.id}),
    ctx.reduxStore.dispatch.profileMedcard.getRecommendations({medcardId: query.id, ...recommendationsFilter}),
    ctx.reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'doctor-specializations'}),
    ctx.reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'order-types'}),
    ctx.reduxStore.dispatch.profileMedcard.getFiles({medcardId: query.id}),
    ctx.reduxStore.dispatch.profileMedcard.getStatus(query.id)
  ])

  return {
    medcardId: query.id,
  }
}

export default RelativeMedcardPage