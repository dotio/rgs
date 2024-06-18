import styled from 'styled-components'
import PropTypes from 'prop-types'

export const Img = styled.img`
  width: ${(p) => p.width};
  height: ${(p) => p.height};
  ${(p) => p.borderRadius && `
    border-radius: ${p.borderRadius}
  `}
  ${(p) => p.shrink && `
    flex-shrink: ${p.shrink};
  `}
  ${(p) => p.opacity && `
    opacity: ${p.opacity}
  `}
`

Img.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  opacity: PropTypes.string,
  shrink: PropTypes.string,
}

Img.defaultProps = {
  width: 'auto',
  height: 'auto',
}
