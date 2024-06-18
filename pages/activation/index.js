import React, {Component} from 'react'
import {ActivationComponent} from '../../features/activation'
import {redirectNotAuth} from '../../lib/redirect'

class Activation extends Component {
  static getInitialProps(ctx){
    redirectNotAuth(ctx)
    ctx.reduxStore.dispatch.router.setPageTitle('Активация')
  }

  render () {
    return (
      <ActivationComponent />
    )
  }
}

export default Activation