import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import {getColor} from './helpers/getColor'
import {createComponent} from './helpers/createComponent'
import {media} from '../helpers/media'

export const Text = createComponent(styled.div, 'text')`
  width:  ${p => p.width};
  padding:  ${p => p.padding};
  font-size: ${p => p.size};
  font-weight: ${p => p.bold ? 'bold' : 'normal'};
  line-height: ${p => p.lineHeight};
  color: ${p => getColor(p.color, p.theme)};
  text-align: ${p => p.align};
  
  ${p => media.mobile(p.smAlign && `text-align: ${p.smAlign};`)}

  &:focus {
    outline: none;
  }

  ${p => p.transform && css`
    text-transform: ${p.transform};
  `}
  
  ${p => p.decoration && css`
    text-decoration: ${p.decoration};
  `}

  ${p => p.shrink && css`
    flex-shrink: ${p.shrink};
  `}

  ${p => p.pointer && css`
    cursor: pointer;
  `}
  
  ${p => p.ellipsis && css`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
  
  ${p => p.spacing && css`
    letter-spacing: ${p.spacing}
  `}
  
  ${(p)=> p.breakWord && css`
   word-break: break-word;
 `}
 
  ${p => p.whiteSpace && css`
    white-space: ${p.whiteSpace};
  `}
 
 ${p => media.mobile(p.smSize && `font-size: ${p.smSize}`)}
 
 ${p => media.mobile(p.smLineHeight && `line-height: ${p.smLineHeight}`)}
 
 ${p => media.mobile(p.smPadding && `padding: ${p.smPadding}`)}
`

Text.propTypes = {
  width: PropTypes.string,
  padding: PropTypes.string,
  family: PropTypes.string,
  size: PropTypes.string,
  bold: PropTypes.bool,
  lineHeight: PropTypes.string,
  color: PropTypes.string,
  align: PropTypes.string,
  smAlign: PropTypes.string,
  transform: PropTypes.string,
  decoration: PropTypes.string,
  shrink: PropTypes.string,
  pointer: PropTypes.bool,
  ellipsis: PropTypes.bool,
  spacing: PropTypes.string,
  breakWord: PropTypes.bool,
  whiteSpace: PropTypes.string,
  smSize: PropTypes.string,
  smLineHeight: PropTypes.string,
  smPadding: PropTypes.string,
}

Text.defaultProps = {
  width: '100%',
  padding: '0',
  bold: false,
  lineHeight: '24px',
  size: '16px',
  color: 'black',
  align: 'left',
  breakWord: false,
}
