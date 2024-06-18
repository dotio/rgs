import React, {Component} from 'react'
import {MedcardNewComponent} from '../../features/medcards/new'
import {redirectNotAuth} from '../../lib/redirect'
import {getTranslator} from '../../utils/translation'

class MedcardNew extends Component {
  render () {
    return (
      <MedcardNewComponent
        backUrl={this.props.backUrl}
        isChild={!!this.props.isChild}
        title={this.props.title}
      />
    )
  }
}

MedcardNew.getInitialProps = async (ctx) => {
  redirectNotAuth(ctx)

  const {reduxStore, query} = ctx
  const translator = getTranslator(reduxStore.getState().localization)

  const title = query.isChild
    ? translator('medcard.new.title.child', true)
    : ((!!reduxStore.getState().user.mainMedcardId && query.backUrl !== '/')
      ? translator('medcard.new.title.adult', true)
      : translator('medcard.new.title', true))

  await reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'genders'})
  await reduxStore.dispatch.dictionary.fetchDictionary({dictionary: 'relationships'})

  reduxStore.dispatch.router.setPageTitle(title)

  return {
    backUrl: query.backUrl,
    isChild: query.isChild,
    title
  }
}

export default MedcardNew