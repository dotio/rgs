import React, {Component} from 'react'
import { LoginMedcard } from '../../features/medcards/login'
import {redirectNotAuth} from '../../lib/redirect'

class LoginMedcardAdult extends Component {
  render() {
    return <LoginMedcard backUrl={'/profile/family'}/>
  }
}

LoginMedcardAdult.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)

  ctx.reduxStore.dispatch.router.setPageTitle('Медкарта взрослого')
}

export default LoginMedcardAdult