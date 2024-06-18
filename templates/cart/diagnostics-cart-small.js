import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Icon } from '../../ui/icon'
import { Wrapper } from '../../ui/wrapper'
import {getColor} from '../../ui/helpers/getColor'
import { media } from '../../helpers/media'

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${p => getColor('white', p.theme)};
  opacity: 0.1;
  backdrop-filter: blur(4px);
  border-radius: 12px;

  ${media.mobile`
    visibility: hidden;
  `}
`

const StyledIcon = styled(Icon)`
  position: absolute;
  top: 20px;
  left: 20px;

  ${media.mobile`
    top: 13px;
    left: 13px;;
  `}
`

const Sum = styled.div`
  position: absolute;
  top:4px;
  left: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  font-size: 12px;
  line-height: 16px;
  color: ${p => getColor('white', p.theme)};
  background-color: ${p => getColor('primary', p.theme)};
  border-radius: 50%;

  ${media.mobile`
    top: -4px;
    left: 32px;
  `}
`

export const CartBlockSmall = ({ itemsCount, onClick, children }) => {
  return (
    <Wrapper justify={'flex-start'} onClick={onClick}>
      <IconWrapper/>
      <StyledIcon
        type={'list'}
        color={'white'}
        width={24}
        height={24}
      />
      <Sum>{itemsCount}</Sum>
      {children}
    </Wrapper>
  )
}

CartBlockSmall.propTypes = {
  itemsCount: PropTypes.number,
  onClick: PropTypes.func,
}