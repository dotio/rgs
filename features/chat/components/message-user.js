import React, {memo} from 'react'
import {Text} from '../../../ui/text'
import {Avatar} from '../../../ui/avatar'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  ${p => p.align && `
    align-items: ${p.align};
  `}
  
  ${p => p.justify && `
    justify-content: ${p.justify};
  `}
  
  ${p => p.padding && `
    padding: 16px 0;
  `}
  
  ${p => p.shrink && `
    flex-shrink: 0;
  `}
  
  & > * + * {
      margin-top: 16px;
  };
`

export const MessageUser = memo(({message, isWidget}) => {
  const {subtitle, surname, name, middlename, photo} = message.user
  return (
    <Container flow={'column'} align={'center'} justify={'center'} gap={16} padding={'16px 0'} shrink={'0'}>
      <Avatar
        size={'72px'}
        src={photo}
      />
      <Text align={'center'} color={isWidget ? 'white' : 'black40'}>{subtitle}</Text>
      <Container flow={'column'}>
        <Text align={'center'} bold size={'20px'} color={isWidget ? 'white' : 'black'}>{surname}</Text>
        <Text align={'center'} bold size={'20px'} color={isWidget ? 'white' : 'black'}>{`${name} ${middlename}`}</Text>
      </Container>
    </Container>
  )
})