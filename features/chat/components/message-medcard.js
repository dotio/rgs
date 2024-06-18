import React from 'react'
import {useSelector} from 'react-redux'
import {Wrapper} from '../../../ui/wrapper'
import {MedcardInfo} from './medcard-info'
import {getTheme} from './chat-bubble'

export const MessageMedcard = ({message, isWidget}) => {
  const medcards = useSelector(state => state.medcards.list)
  const medcard = medcards.find((medcard) => (medcard.id === parseInt(message.params.id)))
  const theme = isWidget ?  'widget' : 'blue'
  const {textColor, backgroundColor} = getTheme(theme)

  return (
    <Wrapper justify={'flex-start'} align={'center'}>
      <MedcardInfo {...medcard} textColor={textColor} bgColor={backgroundColor} />
    </Wrapper>
  )
}