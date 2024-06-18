import React, {Component} from 'react'
import {ActivationPolicyComponent} from '../../../features/activation/policy'
import {redirectNotAuth} from '../../../lib/redirect'

class Policy extends Component {
  render () {
    return (
      <ActivationPolicyComponent />
    )
  }
}

Policy.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)

  const {reduxStore} = ctx

  await reduxStore.dispatch.router.setPageTitle('Активация продукта')
  await reduxStore.dispatch.profileMedcard.getMedcard(reduxStore.getState().user.mainMedcardId)
  await reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'genders'})
}

export default Policy