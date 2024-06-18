import React from 'react'
import styled from 'styled-components'
import {Button} from '../../ui/button'
import {Icon} from '../../ui/icon'
import {Text} from '../../ui/text'
import {Wrapper} from '../../ui/wrapper'

const StyledCommunicationButton = styled(Button)`
  width: ${p => p.width};
  height: 60px;
  &:hover ${Text} {
    opacity: 0.8;
  }
  &:hover svg {
    opacity: 0.8;
  }
`

export const CommunicationButton = ({width, icon, children, middle, ...styledProps}) => {
  return (
    <StyledCommunicationButton width={width} middle={middle}  {...styledProps}>
      <Wrapper justify={'center'} align={'center'} gap={'6px'}>
        <Icon type={icon} color={middle ? 'white' : 'primary'} shrink={'0'} />
        <Text width={'auto'} color={middle ? 'white' : 'primary'}>{children}</Text>
      </Wrapper>
    </StyledCommunicationButton>
  )
}