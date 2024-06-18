import styled, {css} from 'styled-components'
import PropTypes from 'prop-types'
import {media} from '../helpers/media'

export const AvatarInfo = styled.div`
  width: ${p => p.lg.width};
  height: ${p => p.lg.height};
  min-height: ${p => p.lg.minHeight};
  border-radius: ${p => p.lg.borderRadius};
  flex-shrink: 0;
  flex-grow: 0;
  background-image: url(${p => p.lg.backgroundImage});
  background-size: ${p => p.lg.backgroundSize} auto;
  background-position: top center;
  background-repeat: no-repeat;
  ${(p) => p.clickable && css`
    cursor: pointer;
  `}

  ${p => media.mobile(p.sm)}
`

AvatarInfo.propTypes = {
  lg: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    minHeight: PropTypes.string,
    backgroundSize: PropTypes.string,
    borderRadius: PropTypes.string,
    backgroundImage: PropTypes.string,
  }),
  sm: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    minHeight: PropTypes.string,
    backgroundSize: PropTypes.string,
    borderRadius: PropTypes.string,
  })
}

AvatarInfo.defaultProps = {
  sm: {
    width: '60px',
    height: '60px',
    minHeight: '60px',
    backgroundSize: '60px',
  },
}