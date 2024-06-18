import React from 'react'
import PropTypes from 'prop-types'
import {Text} from '../../../ui/text'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  ${p => p.padding && `
    padding: ${p.padding};
  `}
  ${p => p.justify && `
    justify-content: ${p.justify}
  `}
  
  ${p => p.gap && `
    & > * + * {
      margin-${p.flow === 'column' ? 'top': 'left'}: ${p.gap}px;
    };
  `}
`

export const ChatMessageInfo = ({renderContent, collapsed, time, text, textColor}) => {
  return (
    <Container>
      {renderContent ? renderContent() :
        <Container>
          {collapsed && <Text color={textColor} width={'auto'}>{text? `${text} ⋅`: ''} {time}</Text>}
        </Container>
      }
    </Container>
  )
}

ChatMessageInfo.propTypes = {
  contentAlign: PropTypes.oneOf(['flex-start', 'flex-end']),
  renderContent: PropTypes.func,
  time: PropTypes.string,
  markColor: PropTypes.string,
  markType: PropTypes.oneOf(['in_progress', 'delivered', 'read', 'error']),
  text: PropTypes.string,
  textColor: PropTypes.string,
  markSrc: PropTypes.string,
}

ChatMessageInfo.defaultProps = {
  textColor: 'polarr4',
  collapsed: true,
}