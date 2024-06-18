import React from 'react'
import styled, {css} from 'styled-components'
import PropTypes from 'prop-types'
import InputMask from 'react-input-mask'
import {getColor} from '../helpers/getColor'
import {omit} from 'ramda'
import {getThemeValueByPath} from '../helpers/getThemeValue'
import {createComponent} from '../helpers/createComponent'

export const Input = React.forwardRef((props, ref) => {
  return props.mask ? <MaskedInput inputRef={ref} {...props}/> : <BaseInput ref={ref} {...props} />
})

export const BaseInput = createComponent(styled.input, 'input')`
  font-family: ${p => p.family || getThemeValueByPath(['font', 'baseFamily'], p.theme)};
  color: ${p => getColor(p.color, p.theme)};
  caret-color: ${p => getColor(p.caretColor, p.theme)};
  text-align: ${p => p.align};
  border: 1px solid transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  
  ${p => p.lineHeight && css`
    line-height: ${p.lineHeight};
  `}
  ${p => p.size && css`
    font-size: ${p.size};
  `}
  ${p => p.borderColor && css`
    border-color: ${getColor(p.borderColor, p.theme)};
  `}
  ${p => p.borderSize && css`
    border-width: ${p.borderSize};
  `}
  ${p => p.borderRadius && css`
    border-radius: ${p.borderRadius};
  `}
  ${p => p.padding && css`
    padding: ${p.padding};
  `}
  ${p => p.wide && css`
    width: 100%;
  `}
  ${p => p.hideBorder && !p.borderColor && css`
    border: none;
  `}
  ${p => p.spacing && css`
    letter-spacing: ${p.spacing};
  `}
  ${p => p.bgColor && css`
    background-color: ${getColor(p.bgColor, p.theme)};
  `}
  ${p => p.disabled && css`
    background: ${getColor('black10', p.theme)};
    border-color: transparent;
    color: ${getColor('black40', p.theme)};
  `}
  ${p => p.error && css`
    border: 1px solid ${(p) => getColor('dangerousRed', p.theme)};
  `}

  &:focus, &:active {
    outline: none;
    ${p => p.borderSize !== '0px' && p.borderColor && css `
      box-shadow: 0 0 0 2px ${getColor(p.borderColor, p.theme)};
    `}
  }
  
  &::placeholder {
    color: #999999;
  }
`

const MaskedInput = BaseInput.withComponent(props => {
  return <InputMask {...omit(Object.keys(InputPropTypes), props)}/>
})

const InputPropTypes = {
  borderColor: PropTypes.string,
  wide: PropTypes.bool,
  align: PropTypes.string,
  padding: PropTypes.string,
  hideBorder: PropTypes.bool,
  color: PropTypes.string,
  caretColor: PropTypes.string,
  bgColor: PropTypes.string,
  borderRadius: PropTypes.string,
  borderSize: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool
}

Input.propTypes = InputPropTypes

Input.defaultProps = {
  wide: false,
  hideBorder: false,
  align: 'left',
  bgColor: 'white',
  color: '#000',
  caretColor: 'black',
  borderSize: '1px',
  borderRadius: '16px',
  borderColor: 'black20',
}