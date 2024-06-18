import {Component} from 'react'
import {redirect} from '../lib/redirect'

class Consultation extends Component {
  static async getInitialProps(ctx){
    const {reduxStore, query} = ctx

    reduxStore.dispatch.router.setPageTitle('Медконсультант')
    if (query.consultationId) {
      await reduxStore.dispatch.consultation.getConsultation({id: query.consultationId})
    } else {
      const currentConsultation = reduxStore.getState().consultation.current
      if (Object.keys(currentConsultation).length > 0) {
        redirect(`/consultation/${currentConsultation.id}`, ctx)
      }
    }
  }

  render () {
    return null
  }
}

export default Consultation