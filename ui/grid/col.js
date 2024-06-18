import styled from 'styled-components'
import {media} from '../../helpers/media'
import PropTypes from 'prop-types'

const calcPercentage = (value) => (value/12 * 100)

const colStyles = ({cols, offset, order, paddingBottom}) => {
  let stylesString = `
    flex: 0 0 ${calcPercentage(cols)}%;
    max-width: ${calcPercentage(cols)}%;
    flex-basis: ${calcPercentage(cols)}%;
  `

  stylesString += `margin-left: ${calcPercentage(offset || 0)}%;`

  if (order) {
    stylesString += `order: ${order};`
  }
  if (paddingBottom) {
    stylesString += `padding-bottom: ${paddingBottom};`
  }
  return stylesString
}

export const Col = styled.div`
  ${p => p.lg && colStyles(p.lg)}
  
  ${p => media.mobile(p.sm && colStyles(p.sm))}
  
  flex-shrink: 0;
  padding-left: 6px;
  padding-right: 6px;
  
  ${media.mobile`
    padding-right: 3px;
    padding-left: 3px;
  `}
`

Col.propTypes = {
  lg: PropTypes.shape(
    {
      cols: PropTypes.number,
      offset: PropTypes.number,
      order: PropTypes.number,
      paddingBottom: PropTypes.string,
    }
  ),
  sm:PropTypes.shape(
    {
      cols: PropTypes.number,
      offset: PropTypes.number,
      order: PropTypes.number,
      paddingBottom: PropTypes.string,
    }
  ),
}

Col.defaultProps = {
  lg: {
    cols: 12,
    offset: 0,
  },
  sm: {
    cols: 12,
    offset: 0,
  },
}