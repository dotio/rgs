import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { getColor } from '../../../ui/helpers/getColor'
import { Col } from '../../../ui/grid/col'
import { Row } from '../../../ui/grid/row'
import { Wrapper } from '../../../ui/wrapper'
import {Icon} from '../../../ui/icon'
import {MedcardForBankCard} from './medcard-for-bank-card'
import {Img} from '../../../ui/img'
import {T} from '../../../utils/translation'
import {MediumText} from '../../../ui/medium-text'

const StyledWrapper = styled(Wrapper)`
  cursor: pointer;
`

const CircleCheckbox = styled.div`
  margin-right: 6px;
  height: 20px;
  width: 20px;
  border: 1px solid ${p => getColor('black40', p.theme)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-shrink: 0;
  cursor: pointer;
`
const CheckboxDot = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${p => getColor('primary', p.theme)};
  border-radius: 16px;
`

export const BankCardBlock = ({cardNumber, cardIcon, isMainCard, medcards, onSetActive, onDelete}) => {
  return (
    <>
        <Row>
          <Col lg={{cols: 4}} sm={{cols: 11, order: 2}}>
            <Wrapper align={'center'}>
              <Img width={'38px'} height={'24px'} shrink={'0'} src={cardIcon} />
              <MediumText width={'auto'} padding={'0 0 0 8px'}>{cardNumber}</MediumText>
            </Wrapper>
          </Col>
          <Col lg={{cols: 5}} sm={{cols: 12, order: 1, paddingBottom: '8px'}}>
            <StyledWrapper align={'center'} onClick={onSetActive}>
              <CircleCheckbox checked={isMainCard}>
                {isMainCard && <CheckboxDot/>}
              </CircleCheckbox>
              <MediumText width={'auto'} color={isMainCard ? 'primary' : 'black'}><T ucFirst>profile.bank-card.title</T></MediumText>
            </StyledWrapper>
          </Col>
          <Col lg={{cols: 3}} sm={{cols: 1, order: 3}}>
            <Wrapper justify={'flex-end'} align={'center'}>
              <Icon type={'delete_trash'} width={24} height={24} shrink={'0'} color={'black40'} cursor={'pointer'} onClick={onDelete}/>
            </Wrapper>
          </Col>
        </Row>
      {medcards ?
        <MediumText color={'black50'} padding={'24px 0 8px'}><T ucFirst>profile.bank-card.medcards</T></MediumText> :
        <MediumText color={'black50'} padding={'24px 0 0px'}><T ucFirst>profile.bank-card.no-medcards</T></MediumText>
      }
      {medcards && <Row>
        <Col lg={{cols: 4}} sm={{cols: 6}}>
          {medcards.map((medcard, index) => <MedcardForBankCard key={index} {...medcard}/>)}
        </Col>
      </Row>
      }
    </>
  )
}

BankCardBlock.propTypes = {
  cardNumber: PropTypes.string,
  cardIcon: PropTypes.string,
  isMainCard: PropTypes.bool,
  medcards: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    relationship: PropTypes.string,
    linked: PropTypes.bool
  }))
}
