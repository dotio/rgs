import React from 'react'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import styled from 'styled-components'
import {Loader} from '../../../ui/loader'
import {T} from '../../../utils/translation'

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 100%;
  position: relative;
  border-radius: 20px;
  margin-bottom: 12px;
`

const LoaderWrapper = styled.div`
  display: flex;
  width: 36px;
  height: 36px;
  position: relative;
`

const ChatLoaderWrapper = styled(Wrapper)`
  margin-top: 24px;
`

export const ChatLoader = ({isWaitingForDoctor}) => {
  return (
    <ChatLoaderWrapper flow={'column'} justify={'center'}>
      <IconWrapper>
        <LoaderWrapper>
          <Loader show size={'medium'} bgColor={'transparent'} color={'primary'}/>
        </LoaderWrapper>
      </IconWrapper>
      <Text align={'center'} size={'16px'} lineHeight={'24px'} color={'black50'}>
        {isWaitingForDoctor ? <T ucFirst>chat.loader.title-doctor</T> : <T ucFirst>chat.loader.title</T>}
      </Text>
    </ChatLoaderWrapper>
  )
}