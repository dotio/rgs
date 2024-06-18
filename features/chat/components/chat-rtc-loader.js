import React, {useEffect} from 'react'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import styled from 'styled-components'
import {Loader} from '../../../ui/loader'
import {getColor} from '../../../ui/helpers/getColor'
import {T} from '../../../utils/translation'
import {media} from '../../../helpers/media'

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 80px;
  height: 80px;
  position: relative;
  border-radius: 20px;
  background-color: ${p => getColor('green', p.theme)};
`

const LoaderWrapper = styled.div`
  display: flex;
  width: 36px;
  height: 36px;
  position: relative;
`

const ChatLoaderWrapper = styled(Wrapper)`
  margin-top: 24px;
  
  
  ${media.mobile`
    margin-top: 16px;
  `}
`

export const ChatRtcLoader = ({onRendered, isWaitingForDoctor}) => {
  useEffect(() => {
    onRendered()
  }, [])

  return (
    <ChatLoaderWrapper flow={'column'} justify={'center'} gap={'8px'}>
      <Text align={'left'} size={'16px'} lineHeight={'24px'} color={'black50'}>
        <T ucFirst>{isWaitingForDoctor ? 'chat.rtc-loader.doctor-title' : 'chat.rtc-loader.mk-title'}</T>
      </Text>
      <IconWrapper>
        <LoaderWrapper>
          <Loader show size={'medium'} bgColor={'transparent'} color={'white'}/>
        </LoaderWrapper>
      </IconWrapper>
    </ChatLoaderWrapper>
  )
}