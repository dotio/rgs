import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import {getColor} from '../helpers/getColor'

export const FormButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 11px;
  margin: ${p => p.isCallBackForm ? '0 10px 10px 0' : p.margin};
  background-color: ${p => p.selected ? 'white' : getColor(p.bgColor, p.theme)};
  color: ${p => getColor('black', p.theme)};
  font-size: 16px;
  line-height: 24px;
  border-radius: 100px;
  border: ${p => p.selected ? '1px solid transparent' : `1px solid ${getColor('black15', p.theme)}`};
  box-shadow: ${p => p.selected ? '0px 4px 10px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.05)' : 'none'};
  cursor: ${p => p.selected ? 'default' : 'pointer'};
  flex-shrink: 0;
  white-space: nowrap;

  ${p => p.disabled && css`
    background-color: ${getColor('black10', p.theme)};
    color: ${getColor('black20', p.theme)};
    pointer-events: none;
  `}

  ${p => p.error && css`
      border-color: ${getColor('dangerousRed', p.theme)};
  `}
`

FormButton.propTypes = {
  bgColor: PropTypes.string,
  margin: PropTypes.string,
  error: PropTypes.bool
}

FormButton.defaultProps = {
  bgColor: 'transparent',
  margin: '0 12px 12px 0',
}
