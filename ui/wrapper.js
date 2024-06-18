import styled, {css} from 'styled-components'
import {dirProp, dirPropType} from './helpers/dirProp'
import PropTypes from 'prop-types'
import {media} from '../helpers/media'

const marginDir = (p) => p.flow === 'column' ? 'top' : 'left'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: ${(p) => p.flow};
  width: ${p => p.width};
  
  ${(p) => p.justify && css`
    justify-content: ${p.justify};
  `}
  ${(p) => p.align && css`
    align-items: ${p.align};
  `}
  ${(p) => p.margin && css`
    ${dirProp('margin', p.margin)}
  `}
  
  ${(p) => p.padding && css`
    ${dirProp('padding', p.padding)}
    ${p.mobilePadding && media.mobile(`
      ${dirProp('padding', p.mobilePadding)}
    `)}
  `}
  
  ${(p) => p.flexWrap && css`
    flex-wrap: wrap;
  `}
  
  ${(p) => p.gap && css`
    & > * + * {
      margin-${marginDir}: ${p.gap};
      
      ${p.mobileGap && media.mobile(`
        margin-${marginDir(p)}: ${p.mobileGap};
      `)}
    }
  `}
`

Wrapper.propTypes = {
  flow: PropTypes.oneOf(['row', 'column', 'row-reverse']),
  justify: PropTypes.oneOf(['center', 'flex-start', 'flex-end', 'space-between', 'space-around']),
  align: PropTypes.oneOf(['stretch','flex-start', 'flex-end', 'center', 'baseline']),
  margin: dirPropType,
  padding: dirPropType,
  width: PropTypes.string,
  flexWrap: PropTypes.bool,
  gap: PropTypes.string,
  mobileGap: PropTypes.string,
  mobilePadding: PropTypes.string,
}

Wrapper.defaultProps = {
  flow: 'row',
  width: '100%',
  padding: '0',
}
