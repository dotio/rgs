import React, {Component} from 'react'
import {redirectAuth} from '../lib/redirect'
import {LoginComponent} from '../features/login'

class Login extends Component {
  static getInitialProps(ctx){
    redirectAuth(ctx)
    ctx.reduxStore.dispatch.router.setPageTitle('Авторизация')

    const {query} = ctx

    return {
      backUrl: query.backUrl
    }
  }

  render () {
    return (
      <LoginComponent backUrl={this.props.backUrl} />
    )
  }
}

export default Login