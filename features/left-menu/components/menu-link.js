import React from 'react'
import styled from 'styled-components'
import {Text} from '../../../ui/text'
import {Icon} from '../../../ui/icon'
import {getColor} from '../../../ui/helpers/getColor'
import {Wrapper} from '../../../ui/wrapper'

const IconWrapper = styled(Wrapper)`
  height: 36px;
  border-radius: 50%;
  background: ${p => getColor(p.bgColor, p.theme)};
  flex-shrink: 0;
`

const MenuLinkContainer = styled(Wrapper)`
  cursor: pointer;
  
  ${p => p.blocked && `
    cursor: default;
  `}
`

export const MenuLink = ({icon, selected, blocked, children, onClick}) => {
  return (
    <MenuLinkContainer onClick={blocked ? () => {} : onClick} blocked={blocked} align={'center'}>
      <IconWrapper bgColor={selected || blocked ? 'primary' : 'white'} align={'center'} justify={'center'} width={'36px'} margin={{right: '10px'}}>
        <Icon
          shrink={'0'}
          type={icon}
          width={24}
          height={24}
          color={selected ? 'white' : 'black40'}
        />
      </IconWrapper>
      <Text
        size={'16px'}
        lineHeight={'24px'}
        color={selected? 'primary' : 'black'}
      >
        {children}
      </Text>
    </MenuLinkContainer>
  )
}