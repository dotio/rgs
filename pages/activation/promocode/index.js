import React, {Component} from 'react'
import {ActivationPromocodeComponent} from '../../../features/activation/promocode'
import {redirectNotAuth} from '../../../lib/redirect'

class Promocode extends Component {
  static getInitialProps(ctx) {
    redirectNotAuth(ctx)
    ctx.reduxStore.dispatch.router.setPageTitle('Активация промокода')
  }

  render() {
    return (
      <ActivationPromocodeComponent/>
    )
  }
}

export default Promocode