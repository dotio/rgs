import PropTypes from 'prop-types'
import React from 'react'
import styled, {css} from 'styled-components'
import {getColor, getElementColor} from './helpers/getColor'
import {transition} from './theme'
import {lightenDarkenColor} from './helpers/lightenDarken'
import {Loader} from './loader'

const getInnerColor = (bgColor, opacity = 1, flat = false) => {
  if (['white', 'black05', 'transparent'].includes(bgColor) && !flat) {
    return `rgba(0, 0, 0, ${opacity})`
  }
  return `rgba(255, 255, 255, ${opacity})`
}
const getBorderColor = (bgColor, theme) => {
  if (['transparent'].includes(bgColor)) {
    return getColor('black15', theme)
  }
  return getColor(bgColor, theme)
}

const StyledButton = styled.button`
  ${transition}
  display: inline-block;
  position: relative;
  overflow: hidden;
  width: ${p => p.wide ? '100%' : 'auto'};
  border-radius: 100px;
  border: solid 1px ${p => p.disabled ? getElementColor('disabledButtons', p.theme) : getBorderColor(p.color, p.theme)};
  font-family: ${(p) => p.theme.font.baseFamily};
  background: ${p => p.disabled ? getElementColor('disabledButtons', p.theme) : getColor(p.color, p.theme)};
  color:  ${p => p.disabled ? getElementColor('disabledText', p.theme) : getInnerColor(p.color)};
 
  font-size: ${p => p.fontSize};
  line-height: ${p => p.lineHeight};
  font-style: normal;
  font-weight: normal;
  padding: ${p => p.padding};
  flex-shrink: 0;
  flex-grow: 0;
  
  &:focus {
    outline:0;
  }
  &:hover {
    background: ${p => lightenDarkenColor(getColor(p.color, p.theme), -20)};
    border: solid 1px ${p => lightenDarkenColor(getBorderColor(p.color, p.theme), -20)};
    color:  ${p => getInnerColor(p.color, 0.8, p.flat)};
    box-shadow: none;
  }
  
  ${p => p.color === 'white' && css`
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05);
  `}

  ${p => p.color === 'white' && p.flat && css`
    box-shadow: none;
    color: ${p => getColor('primary', p.theme)};
  `}

  ${p => p.cursor && css`
    cursor: ${p.cursor};
  `}
  
  &:disabled {
     border: solid 1px ${p => getElementColor('disabledButtons', p.theme)};
     background: ${p => getElementColor('disabledButtons', p.theme)};
     color:  ${p => getElementColor('disabledText', p.theme)};
     cursor: default;
     &:hover {
       border: solid 1px ${p => getElementColor('disabledButtons', p.theme)};
       background: ${p => getElementColor('disabledButtons', p.theme)};
       color:  ${p => getElementColor('disabledText', p.theme)};
    }
  }
`

StyledButton.propTypes = {
  color: PropTypes.string,
  wide: PropTypes.bool,
  disabled: PropTypes.bool,
}

StyledButton.defaultProps = {
  color: 'white',
  wide: false,
}

export const Button = ({children, showLoader, color, ...styledProps}) => {
  return (
    <StyledButton {...styledProps} color={color} data-analytics-element={styledProps.analyticsElement}>
      {children}
      <Loader bgColor={color} color={getInnerColor(color)} size={'small'} show={showLoader}/>
    </StyledButton>
  )
}

Button.propTypes = {
  color: PropTypes.string,
  cursor: PropTypes.string,
  wide: PropTypes.bool,
  disabled: PropTypes.bool,
  showLoader: PropTypes.bool,
  padding: PropTypes.string,
  fontSize: PropTypes.string,
  lineHeight: PropTypes.string,
  flat: PropTypes.bool,
}

Button.defaultProps = {
  color: 'white',
  cursor: 'pointer',
  wide: false,
  showLoader: false,
  padding: '5px 11px',
  fontSize: '16px',
  lineHeight: '24px',
}