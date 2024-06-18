import React, {useState} from 'react'
import {RadioButton} from '../../../../ui/form/radio-button'
import {Wrapper} from '../../../../ui/wrapper'
import {Img} from '../../../../ui/img'
import {Button} from '../../../../ui/button'
import {useSelector} from 'react-redux'
import {getTranslator} from '../../../../utils/translation'
import styled from 'styled-components'
import {Text} from '../../../../ui/text'
import {media} from '../../../../helpers/media'

const StyledText = styled(Text)`
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`

export const CardSelect = ({cards, selected, onChange}) => {
  // const dispatch = useDispatch()

  const translator = useSelector(state => getTranslator(state.localization))

  const [showAll, setShowAll] = useState(false)
  const currentCards = showAll ? cards : cards.filter(card => card.id === selected)

  // const addCardHandle = () => {dispatch.modal.addAndShowModal({type: 'add-bank-card'})}

  // if(cards.length === 0) {
  //   return <>
  //     <StyledText color={'black50'} padding={'0 0 16px'}>{translator('settings.bank-card.add-card.title', true)}</StyledText>
  //     <Button color={'black05'} onClick={addCardHandle}>
  //       {translator('settings.bank-card.add-card.button', true)}
  //     </Button>
  //   </>
  // }

  return <Wrapper flow={'column'} gap={showAll ? '20px' : '8px'}>
    {currentCards.map((card, index) =>
      <RadioButton
        key={index}
        onClick={() => onChange(card.id)}
        checked={selected === card.id}
      >
        <Wrapper gap={'8px'} width={'auto'} padding={'0 0 0 8px'}>
          <Img width={'38px'} height={'24px'} shrink={'0'} src={card.img || '/static/mocks/card_empty.png'} />
          <StyledText width={'auto'} color={'black'} padding={'0 0 0 8px'}>{card.number}</StyledText>
        </Wrapper>
      </RadioButton>
    )}
    {(showAll || selected === null || cards.length === 0) && <RadioButton
      onClick={() => onChange(null)}
      checked={selected === null}
    >
      <StyledText width={'auto'} color={'black'} padding={'0 0 0 8px'}>{translator('settings.bank-card.add-card.new', true)}</StyledText>
    </RadioButton>}
    {!showAll && cards.length > 0 && (
      <Wrapper onClick={() => setShowAll(true)} padding={'0 0 0 28px'}>
        <Button color={'black05'}>
          {translator('order.doctor.change-card', true)}
        </Button>
      </Wrapper>
    )}
  </Wrapper>
}