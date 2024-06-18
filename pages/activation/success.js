import React, {Component} from 'react'
import {ActivationSuccessComponent} from '../../features/activation/success'
import {redirectNotAuth} from '../../lib/redirect'

class Success extends Component {
  render () {
    return (
      <ActivationSuccessComponent />
    )
  }
}

Success.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)

  const {query} = ctx
  ctx.reduxStore.dispatch.router.setPageTitle('Активация')

  return {
    id: query.id,
    type: 'policy'
  }
}

export default Success