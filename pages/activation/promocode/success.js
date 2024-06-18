import React, {Component} from 'react'
import {ActivationSuccessComponent} from '../../../features/activation/success'
import {redirectNotAuth} from '../../../lib/redirect'

class PromocodeSuccess extends Component {
  render () {
    return (
      <ActivationSuccessComponent {...this.props} />
    )
  }
}

PromocodeSuccess.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)

  const {reduxStore, query} = ctx

  reduxStore.dispatch.router.setPageTitle('Активация промокода')

  return {
    id: query.id,
    type: 'promocode',
  }
}

export default PromocodeSuccess