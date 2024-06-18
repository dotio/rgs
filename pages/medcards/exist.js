import React, {Component} from 'react'
import {connect} from 'react-redux'
import {MedcardExistComponent} from '../../features/medcards/exist'
import {Router} from '../../routes'
import {redirectNotAuth} from '../../lib/redirect'

class MedcardExistComp extends Component {
  componentDidMount() {
    this.checkAccess()
  }

  state = {
    approved: false
  }

  checkAccess() {
    if (this.props.approved) {
      this.setState({approved: true})
      this.props.setApproved(false)
    } else {
      Router.pushRoute('medcards/login', {backUrl: this.props.backUrl})// redirect to login page
    }
  }

  render () {
    return (
      <>
      {this.state.approved && <MedcardExistComponent
        backUrl={this.props.backUrl}
      />}
      </>
    )
  }
}

MedcardExistComp.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)

  const {reduxStore, query} = ctx

  reduxStore.dispatch.router.setPageTitle('Медкарта взрослого')
  await reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'genders'})
  await reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'relationships'})
  await reduxStore.dispatch.medcards.fetchMedcards(true)

  return {
    backUrl: query.backUrl,
  }
}

const mapStateToProps = state => {
  return {
    approved: state.medcards.approved,
  }
}

const mapDispatchToProps = dispatch => ({
  setApproved: (value) => dispatch.medcards.setApproved(value)
})


const MedcardExist = connect(mapStateToProps, mapDispatchToProps)(MedcardExistComp)

export default MedcardExist