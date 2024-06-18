import React from 'react'
import {Wrapper} from '../../../../ui/wrapper'
import styled from 'styled-components'
import {media} from '../../../../helpers/media'
import {Text} from '../../../../ui/text'
import {getColor} from '../../../../ui/helpers/getColor'
import {Icon} from '../../../../ui/icon'
import {T} from '../../../../utils/translation'

const ChooseTypeWrapper = styled(Wrapper)`
  width: ${p => p.chatIsSmall ? 'calc(100% - 4px)' : '537px'};
  
  ${media.mobile`
    width: calc(100% - 4px);
  `}
  flex-shrink: 0;
`

const TypeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 80px;
  height: 80px;
  border-radius: 16px;
  background-color: ${p => getColor('primary', p.theme)}
`

const TYPES = [
  {
    title: <T ucFirst>chat.message-choose-type.chat</T>,
    type: 'chat',
    icon: 'chat'
  },
  {
    title: <T ucFirst>chat.message-choose-type.video</T>,
    type: 'video',
    icon: 'camera'
  },
  {
    title: <T ucFirst>chat.message-choose-type.audio</T>,
    type: 'audio',
    icon: 'microphone'
  }
]

export const MessageChooseType = ({selectConnectionType, sendCall}) => {
  const handleClick = async (type) => {
    if(type !== 'chat') {
      await sendCall(type)
    }
    selectConnectionType()
  }
  return <ChooseTypeWrapper flow={'column'} gap={'8px'}>
    <Text>
      <T ucFirst>chat.message-choose-type.title</T>
    </Text>
    <Wrapper gap={'8px'}>
      {TYPES.map(({title, type, icon}) => (
        <TypeContainer onClick={() => handleClick(type)} key={type}>
          <Wrapper align={'center'} justify={'center'} flow={'column'} gap={'8px'}>
            <Icon shrink={'0'} type={icon} width={24} height={24}/>
            <Text align={'center'} color={'white'}>
              {title}
            </Text>
          </Wrapper>
        </TypeContainer>
      ))}
    </Wrapper>
  </ChooseTypeWrapper>
}