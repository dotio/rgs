import PropTypes from 'prop-types'
import styled from 'styled-components'

export const Logo = styled.img.attrs(props => ({
  src: props.small ? `/static/logo${props.black ? '_black' : ''}.svg` : `/static/logo_full${props.black ? '_black' : ''}.svg`
}))``

Logo.propTypes = {
  small: PropTypes.bool,
  black: PropTypes.bool
}

Logo.defaultProps = {
  small: true,
  black: false
}