import styled from 'styled-components'
import PropTypes from 'prop-types'
import {getColor} from './helpers/getColor'

export const Circle = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
  align-items: center;
  justify-content: center;
  display: ${(p) => p.display};
  width: ${(p) => `${p.size}px`};
  height: ${(p) => `${p.size}px`};
  border-radius: ${(p) => `${p.size/2}px`};
  background: ${p => p.hexColor ? p.hexColor : getColor(p.color, p.theme)};
`

Circle.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  display: PropTypes.string,
  hexColor: PropTypes.string,
}
Circle.defaultProps = {
  display: 'flex'
}
