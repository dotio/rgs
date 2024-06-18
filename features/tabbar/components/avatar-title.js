import React from 'react'
import styled, {css} from 'styled-components'
import {Text} from '../../../ui/text'
import {Avatar} from '../../../ui/avatar'
import {Wrapper} from '../../../ui/wrapper'
import {getColor} from '../../../ui/helpers/getColor'

const AvatarWrapper = styled(Wrapper)`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  ${p => p.selected && p.src && css`
    border: 1.5px solid ${p => getColor('primary', p.theme)};  
    border-radius: 50%;
    padding: 1px;
  `}
`

const StyledWrapper = styled(Wrapper)`
  height: ${p => p.height};
`

export const AvatarTitle = ({src, name, title, selected, height}) => {
  return (
    <StyledWrapper flow={'column'} align={'center'} justify={'center'} gap={'2px'} height={height} padding={'6px 0 7px'}>
      <AvatarWrapper align={'center'} justify={'center'} selected={selected} src={src}>
        <Avatar
          borderRadius={'50%'}
          text={name && name[0]}
          src={src}
          size={'20px'}
          bgColor={'secondary'}
          width={'20px'}
          height={'20px'}
          minHeight={'20px'}
          fontSize={'10px'}
          color={'white'}
          lineHeight={'13px'}
        />
      </AvatarWrapper>
      <Text
        size={'10px'}
        lineHeight={'13px'}
        color={selected ? 'primary' : 'black50'}
        align={'center'}
      >
        {title}
      </Text>
    </StyledWrapper>
  )
}