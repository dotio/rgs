import styled from 'styled-components'
import PropTypes from 'prop-types'
import {getColor} from './helpers/getColor'
import {media} from '../helpers/media'

export const Well = styled.div`
  width: 100%;
  border-radius: 20px;
  background: ${p => getColor(p.color, p.theme)};
  padding: ${p => p.padding};

  ${p => media.mobile(`padding: ${p.mobilePadding};`)}
`

Well.propTypes = {
  color: PropTypes.string,
  padding: PropTypes.string,
  mobilePadding: PropTypes.string,
}

Well.defaultProps = {
  color: 'white',
  padding: '24px 0',
  mobilePadding: '20px 0',
}