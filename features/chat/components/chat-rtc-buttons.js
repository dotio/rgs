import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import styled from 'styled-components'
import {getColor} from '../../../ui/helpers/getColor'
import {Icon} from '../../../ui/icon'
import {getTranslator} from '../../../utils/translation'
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
  background-color: ${p => getColor(p.color, p.theme)};
`

const ChatLoaderWrapper = styled(Wrapper)`
  margin-top: 24px;
  
  ${media.mobile`
    margin-top: 16px;
  `}
`

export const ChatRtcButtons = ({setAcceptStatus, onRendered, type}) => {
  const translator = useSelector(state => getTranslator(state.localization))

  useEffect(() => {
    onRendered()
  }, [])

  return (
    <ChatLoaderWrapper flow={'column'} justify={'center'} gap={'8px'}>
      <Text align={'left'} size={'16px'} lineHeight={'24px'} color={'black50'}>
        {translator('chat.call.title', true)} {translator(`chat.call.title.${type}`, false)}
      </Text>
      <Wrapper gap={'6px'}>
        <IconWrapper color={'green'} onClick={() => setAcceptStatus('accept')}>
          <Icon type={'call'} width={32} height={32} color={'white'}/>
        </IconWrapper>
        <IconWrapper color={'dangerousRed'} onClick={() => setAcceptStatus('reject')}>
          <Icon type={'hang_up'} width={32} height={32} color={'white'}/>
        </IconWrapper>
      </Wrapper>
    </ChatLoaderWrapper>
  )
}