import React, {Component} from 'react'
import {ActivationDmsComponent} from '../../features/activation/dms'
import {redirectNotAuth} from '../../lib/redirect'

class Dms extends Component {
  static getInitialProps(ctx){
    redirectNotAuth(ctx)
  }
  render () {
    return (
      <ActivationDmsComponent />
    )
  }
}

export default Dms