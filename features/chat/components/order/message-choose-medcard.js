import React, {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Wrapper} from '../../../../ui/wrapper'
import styled from 'styled-components'
import {media} from '../../../../helpers/media'
import {splitEvery} from 'ramda'
import {Button} from '../../../../ui/button'
import { MedcardItem } from './medcard-item'
import {T} from '../../../../utils/translation'

const ChooseMedcardWrapper = styled(Wrapper)`
  width: ${p => p.chatIsSmall ? 'calc(100% - 4px)' : '537px'};
  flex-shrink: 0;
  ${media.mobile`
    width: calc(100% - 4px);
  `}
`

const ContinueButton = styled(Button)`
  width: 155px;
  padding: 8px 15px;
  font-size: 20px;
  line-height: 30px;
`

export const MessageChooseMedcard = ({chatIsSmall, isWidget, onClickContinue, onRendered}) => {
  const [selectedMedcard, setSelectedMedcard] = useState(null)
  const medcards = useSelector(state => state.medcards.list)
  const medcardGroups = splitEvery(chatIsSmall || isWidget ? 1 : 2, medcards)

  const theme = isWidget ?  'widget' : 'blue'

  useEffect(() => {
    onRendered()
  }, [])

  return (
    <ChooseMedcardWrapper
      flow={'column'}
      gap={'24px'}
      chatIsSmall={chatIsSmall}
    >
      <Wrapper flow={'column'} gap={'12px'}>
        {medcardGroups.map((group, index) => (
          <Wrapper key={index} gap={'12px'} mobileGap={'6px'}>
            {group.map(medcard => {
              const active = selectedMedcard === medcard.id

              return (
                <MedcardItem
                  key={medcard.id}
                  avatar={medcard.photo}
                  active={active}
                  setSelectedMedcard={setSelectedMedcard}
                  theme={theme}
                  chatIsSmall={chatIsSmall}
                  {...medcard}
                />
              )
            })}
          </Wrapper>
        ))}
      </Wrapper>
      {medcardGroups && (
        <ContinueButton
          onClick={() => onClickContinue(selectedMedcard)}
          color={'primary'}
          disabled={!selectedMedcard}
        >
          <T ucFirst>chat.message-choose-medcard.button</T>
        </ContinueButton>
      )}
    </ChooseMedcardWrapper>
  )

}