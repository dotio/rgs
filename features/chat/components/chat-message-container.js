import React from 'react'
import PropTypes from 'prop-types'
import {ChatMessageInfo} from './chat-message-info'
import {Avatar} from '../../../ui/avatar'
import styled from 'styled-components'
import {getColor} from '../../../ui/helpers/getColor'
import {Wrapper} from '../../../ui/wrapper'

const ChatMessageWrapper = styled.div`
  display: flex;
  width: ${p => p.width};
  justify-content: flex-end;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${p => p.width};
  align-items: ${p => p.align};
  ${p => p.collapsed && `
  & > * + * {
      margin-top: 4px;
  };`}
`

const InfoContainer = styled(Wrapper)`
  width: auto;
`

const ChildrenContainer = styled.div`
  display: flex;
  width: auto;
  overflow: hidden;
  border-radius: 20px;
  padding: ${p => p.padding ? p.padding : '11px'};;
  
  ${p => p.withBorder && `
    border: 1px solid ${getColor('black15', p.theme)};
  `}
   
  ${p => p.bgColor && `
    background-color: ${getColor(p.bgColor, p.theme)};
  `}
`

const AvatarContainer = styled.div`
  width: auto;
  display: flex;
  align-items: center;
`

const MessageInfoContainer = styled.div`
  display: flex;
  height: auto;
`

export const ChatMessageContainer = ({messageInfo, avatar, children, width, collapsed,  alignMessage, ...props}) => {
  const size = avatar && avatar.size || '24px'
  const getAvatarProps = () => !collapsed
    ? {...avatar, src: '', bgColor: 'transparent', text: ''}
    : {...avatar, width: size, height: size, minHeight: size}

  return (
    <ChatMessageWrapper width={width}>
      <ContentWrapper collapsed={collapsed} width={width} align={alignMessage}>
        <InfoContainer gap={'8px'} justify={messageInfo && messageInfo.contentAlign}>
          {avatar && collapsed && <AvatarContainer>
            <Avatar width={'24px'} height={'24px'} minHeight={'24px'} {...getAvatarProps()}/>
          </AvatarContainer>}
          <MessageInfoContainer>
            {messageInfo && <ChatMessageInfo {...messageInfo} padding={'2px 0'}/>}
          </MessageInfoContainer>
        </InfoContainer>
        <ChildrenContainer {...props}>
          {children}
        </ChildrenContainer>
      </ContentWrapper>
    </ChatMessageWrapper>
  )
}

ChatMessageContainer.propTypes = {
  borderRadiusType: PropTypes.oneOf(['top-left', 'bottom-left', 'top-right', 'bottom-right', 'left', 'right']),
  maxRadius: PropTypes.string,
  minRadius: PropTypes.string,
  messageInfo: PropTypes.shape({
    ...ChatMessageInfo.propTypes
  }),
  avatar: PropTypes.shape({
    ...Avatar.propTypes
  }),
}

ChatMessageContainer.defaultProps = {
  maxRadius: '20px',
  minRadius: '8px',
  width: 'auto',
  collapsed: true,
}