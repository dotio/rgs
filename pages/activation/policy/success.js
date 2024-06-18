import React, {Component} from 'react'
import {ActivationSuccessComponent} from '../../../features/activation/success'
import {redirectNotAuth} from '../../../lib/redirect'

class PolicySuccess extends Component {
  render () {
    return (
      <ActivationSuccessComponent {...this.props} />
    )
  }
}

PolicySuccess.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)

  const {reduxStore, query} = ctx

  reduxStore.dispatch.router.setPageTitle('Активация продукта')

  return {
    id: query.id,
    type: 'policy',
  }
}

export default PolicySuccess