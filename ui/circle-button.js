import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Icon} from './icon'
import {getColor} from './helpers/getColor'

const ButtonBox = styled.div`
  position: absolute;
  z-index: ${p => p.zIndex};
  display: flex;
  align-items: center;
  justify-content: center;
  top: ${p => p.top};
  right: 16px;
  width: 32px;
  height: 32px;
  background: ${p => getColor('white', p.theme)};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 100px;
  cursor: pointer;
`

export const CircleButton = ({onClick, color, icon, ...restProps}) => {
  return (
    <ButtonBox onClick={onClick} {...restProps}>
      <Icon type={icon} color={color}/>
    </ButtonBox>
  )
}

CircleButton.propTyles = {
  top: PropTypes.string,
  zIndex: PropTypes.string,
}

CircleButton.defaultProps = {
  top: '16px',
  color: 'black40',
  zIndex: '9999'
}

