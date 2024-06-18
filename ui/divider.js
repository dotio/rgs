import styled, {css}    from 'styled-components'
import {getColor} from './helpers/getColor'
import PropTypes        from 'prop-types'
import {media} from '../helpers/media'

export const Divider = styled.div`
  display: block;
  width: ${p => p.width};
  height: 1px;
  min-height: 1px;
  background: ${(p) => getColor(p.color, p.theme)};

  ${(p) => p.margin && css`
    margin: ${p.margin};
  `}

  ${(p) => p.smMargin && media.mobile(`
    margin: ${p.smMargin};
  `)}
`

Divider.propTypes = {
  width: PropTypes.string,
  margin: PropTypes.string,
  color: PropTypes.string,
  smMargin: PropTypes.string,
}

Divider.defaultProps = {
  width: '100%',
  color: 'black10',
}