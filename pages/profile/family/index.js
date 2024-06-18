import React from 'react'
import {ProfileTemplate} from '../../../features/profile/template'
import {FamilyBlock} from '../../../features/profile/family/family-block'
// import {AddFamilyInProduct} from '../../../features/profile/family/add-family-in-product'
import {redirectNotAuth} from '../../../lib/redirect'

const Family = ({medcardId}) => (
  <ProfileTemplate medcardId={medcardId}>
    <FamilyBlock />
    {/*<AddFamilyInProduct productName={'Доктор онлайн'} productImg={'https://via.placeholder.com/150'} description={'К продукту можно добавить ещё 2 медкарты  близких.'}/>*/}
  </ProfileTemplate>
)

Family.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)

  await ctx.reduxStore.dispatch.router.setPageTitle('Семья')

  return {
    medcardId: ctx.reduxStore.getState().user.mainMedcardId,
  }
}

export default Family