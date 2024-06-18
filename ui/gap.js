import styled from 'styled-components'
import PropTypes from 'prop-types'
import {media} from '../helpers/media'

export const Gap = styled.div`
  & > * + * {
      ${p => `margin-${p.direction}: ${p.gap}`};
      ${p => media.mobile(p.mobileGap && `margin-${p.direction}: ${p.mobileGap}`)}
  };
`

Gap.propTypes = {
  direction: PropTypes.string,
  gap: PropTypes.string,
  mobileGap: PropTypes.string,
}

Gap.defaultProps = {
  direction: 'top',
  gap: '6px'
}
