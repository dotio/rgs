import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Text } from '../../../ui/text'
import { Button } from '../../../ui/button'
import { getColor } from '../../../ui/helpers/getColor'
import { Wrapper } from '../../../ui/wrapper'
import { media } from '../../../helpers/media'
import {getTranslator} from '../../../utils/translation'
import {useSelector} from 'react-redux'

const TitleText = styled(Text)`
  width: auto;
  font-size: 20px;
  line-height: 30px;
  ${media.mobile`
    font-size: 16px;
    line-height:24px;
  `}
`
const ItemWrapper = styled(Wrapper)`
  box-sizing: border-box; 
  padding: 2px 0;
  margin: 6px 0;
  height: auto;
`
const AddButton = styled(Button)`
  color: ${({ active, theme }) => active ? 'white' : getColor('black', theme)};
  background-color: ${({ active, theme }) => active ? getColor('primary', theme) : getColor('black05', theme)};
  box-shadow: none;
`

export const AccordionItem = ({ itemId, title, price, onClick, active }) => {
  const translator = useSelector(state => getTranslator(state.localization))
  return (
    <ItemWrapper justify={'space-between'} align={'center'}>
      <TitleText color={'black'}>{title}</TitleText>
      <AddButton active={active} onClick={() => onClick(itemId)}>
        {active ? `${translator('clinic.diagnostics.inlist', true)}` : `${price} ${translator('clinic.diagnostics.currency', true)}`}
      </AddButton>
    </ItemWrapper>
  )
}


AccordionItem.propTypes = {
  itemId: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,]),
  active: PropTypes.bool,
  onClick: PropTypes.func,
}