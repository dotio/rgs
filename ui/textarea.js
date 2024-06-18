import styled,{css}      from 'styled-components'
import {getColor} from './helpers/getColor'
import {getThemeValueByPath} from './helpers/getThemeValue'
import {createComponent} from './helpers/createComponent'

export const Textarea = createComponent(styled.textarea, 'textarea')`
  width: ${(p) => p.width};
  min-height: ${(p) => p.height};
  ${p => p.maxHeight && css`max-height: ${p.maxHeight};`}
  resize: ${(p) => p.resize};
  outline: none;
  line-height: ${(p) => p.lineHeight};
  padding: ${(p) => p.padding};
  font-family: ${(p) => p.family || getThemeValueByPath(['font', 'baseFamily'], p.theme)};
  font-size: ${(p) => p.size};
  color: ${(p) => getColor(p.color, p.theme)};
  background: ${p => getColor(p.background, p.theme)};
  border-radius: ${(p) => p.borderRadius};
  caret-color: ${p => getColor(p.caretColor, p.theme)};
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  
  &::-webkit-input-placeholder {
    color: ${p => getColor(p.placeholderColor, p.theme)}
  }
  overflow: auto;
  &::-moz-placeholder {
    color:${p => getColor(p.placeholderColor, p.theme)}/* Firefox 19+ */
  }
  &:-moz-placeholder {
    color:${p => getColor(p.placeholderColor, p.theme)}/* Firefox 18- */
  }
  &:-ms-input-placeholder {
    color:${p => getColor(p.placeholderColor, p.theme)}
  }
  
  &:active, &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(p) => getColor(p.borderColor, p.theme)};
  }
  
  ${(p) => p.borderColor && css`
    border: ${p.borderSize} solid ${getColor(p.borderColor, p.theme)};
  `}
`