import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import {Button} from '../button'
import {getElementColor} from '../helpers/getColor'

export const FilterButton = styled(Button)`
  background: transparent;
  border: 1px solid ${p => p.selected && !p.isSelect ? 'transparent' : getElementColor(p.borderColor, p.theme)};
  padding: 5px 11px;
  width: ${p => p.mobileWidth ? p.mobileWidth : 'auto'};
  ${p => !p.selected && css`
    box-shadow: none;
    color: ${getElementColor('greyText', p.theme)};
  `}
  ${p => p.isSelect && css`
    box-shadow: none;
  `}
  ${p => p.mobileWidth && css`
    width: ${p.mobileWidth};
  `}
  white-space: nowrap;
`

FilterButton.propTypes = {
  borderColor: PropTypes.string,
}

FilterButton.defaultProps = {
  borderColor: 'stroke',
}