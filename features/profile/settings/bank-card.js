import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import {Col} from '../../../ui/grid/col'
import {Img} from '../../../ui/img'
import {Row} from '../../../ui/grid/row'
import {Button} from '../../../ui/button'
import styled from 'styled-components'
import {media} from '../../../helpers/media'
import {T} from '../../../utils/translation'

const StyledText = styled(Text)`
  font-size: 20px;
  line-height: 30px;
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`

const StyledTitleText = styled(Text)`
  font-size: 20px;
  line-height: 30px;
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
    padding-bottom: 12px;
  `}
`

export const BankCards = () => {
  const dispatch = useDispatch()
  const cards = useSelector(state => state.profileSettings.bankCards)

  const addCardHandle = () => {dispatch.modal.addAndShowModal({type: 'add-bank-card'})}

  return (
    <Row>
      <Col lg={{cols: 4}} sm={{cols: 12}}>
        <StyledTitleText size={'20px'} lineHeight={'30px'} color={'black50'}><T ucFirst>settings.bank-card.title</T></StyledTitleText>
      </Col>
      <Col lg={{cols: 8}} sm={{cols: 12}}>
        {cards.length > 0 ? <Wrapper flow={'column'} gap={'16px'}>
          {cards.map((card, index) =>
            <Wrapper key={'card-' + index} gap={'8px'}>
              <Img width={'38px'} height={'24px'} shrink={'0'} src={'/static/mocks/card_empty.png'} />
              <StyledText color={'black'} padding={'0 0 0 8px'}>{card.number}</StyledText>
            </Wrapper>)}
          <Wrapper>
            <Button color={'black05'} onClick={addCardHandle}>
              <T ucFirst>settings.bank-card.manage</T>
            </Button>
          </Wrapper>
        </Wrapper>
          : <>
          <StyledText color={'black50'} padding={'0 0 16px'}><T ucFirst>settings.bank-card.add-card.title</T></StyledText>
          <Button color={'black05'} onClick={addCardHandle}>
            <T ucFirst>settings.bank-card.add-card.button</T>
          </Button>
        </>}
      </Col>
    </Row>
  )
}

BankCards.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    number: PropTypes.string,
    cardColor: PropTypes.number,
    icon: PropTypes.string,
    active: PropTypes.bool
  })),
}