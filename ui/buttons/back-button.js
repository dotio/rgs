import React from 'react'
import styled from 'styled-components'
import {Icon} from './../icon'
import {media} from '../../helpers/media'
import {getColor} from '../helpers/getColor'

const Box = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 16px;
  left: 16px;
  width: 32px;
  height: 32px;
  background: ${p => getColor('white', p.theme)};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.05);
  border-radius: 100px;
  cursor: pointer;
  
  ${media.mobile`
    right: 16px;
    left: auto;
  `}
`

export const BackButton = ({onClick}) => {
  return (
    <Box onClick={onClick}>
      <Icon type={'long_arrow_left'} width={22} height={18} color={'black40'}/>
    </Box>
  )
}

