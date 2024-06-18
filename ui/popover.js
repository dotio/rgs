import styled, {css, keyframes} from 'styled-components'
import PropTypes from 'prop-types'
import {hexToRgba} from './helpers/hexToRgba'
import {getColor} from './helpers/getColor'

const keyframesOpen = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const keyframesClose = keyframes`
  0% {
  visibility: visible;
    opacity: 1;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
`

export const Popover = styled.div`
  :focus {
    outline: none;
  }
  
  position:  ${(p) => p.position ? p.position : 'absolute'};
  ${(p) => p.top && css`
    top: ${p.top};
  `}
  ${(p) => p.left && css`
    left: ${p.left};
  `}
  ${(p) => p.right && css`
    right: ${p.right};
  `}
  ${(p) => p.bottom && css`
    bottom: ${p.bottom};
  `}
  
  ${(p) => p.padding && css`
    padding: ${p.padding};
  `}
  
   ${p => {
    switch (p.type) {
      case 'left':
        return `left:  ${p.left}`
      case 'right':
        return `right: ${p.right}`
      case 'top':
        return `top: ${p.top}
                  right: ${p.right}`
      default:
        return ''
    }
  }};
  z-index: 1060;
  overflow: hidden;
  visibility: ${(p) => p.isOpen ? 'visible' : 'hidden'};
  max-width: ${(p) => p.maxWidth};
  max-height: ${(p) => p.maxHeight};
  overflow: ${(p) => p.overflow};
  min-height: 50px;
  width: ${(p) => p.width};
  background-color:${(p) => hexToRgba(getColor('black', p.theme), 0.8)};
  background-clip: padding-box;
  border-radius: 16px;
  box-shadow: 0 5px 10px rgba(0,0,0,.2);
  color: ${(p) => getColor('white', p.theme)};
  animation: ${(p) => p.isOpen ? keyframesOpen : keyframesClose} 0.3s ease;
`

Popover.propTypes = {
  type: PropTypes.oneOf(['left', 'right', 'top']),
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  width: PropTypes.string,
  maxWidth: PropTypes.string,
  isOpen: PropTypes.bool,
  position: PropTypes.string,
  padding: PropTypes.string,
}

Popover.defaultTypes = {
  left: 'auto',
  right: 'auto',
  maxWidth: '320px',
  position: 'absolute',
}