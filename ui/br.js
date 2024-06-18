import styled from 'styled-components'
import {media} from '../helpers/media'
import PropTypes from 'prop-types'

export const Br = styled.br`
  display: ${(p) => p.large ? 'inline' : 'none'};
  ${(p) => p.medium ? media.medium`display: inline;` : media.medium`display: none;`}
  ${(p) => p.mobile ? media.mobile`display: inline;` : media.mobile`display: none;`}
`

Br.propTypes = {
  mobile: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
}

Br.defaultProps = {
  mobile: true,
  medium: true,
  large: true,
}
