import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {TitleText} from './title-text'
import {media} from '../helpers/media'

const RatingText = styled(TitleText)`
  font-feature-settings: 'tnum' on, 'lnum' on;
  shrink: 0;
  text-decoration: underline;
  width: 70px;
  
  ${media.mobile`
    width: auto;
  `}
`

export const Rating = ({number, color}) => {
  return (
    <RatingText align={'right'} spacing={'-0.05em'} size={'28px'} lineHeight={'32px'} color={color} as={'span'}>
      {number && number === 0 ? '0.00' : number.toFixed(2)}
    </RatingText>
  )
}
Rating.propTypes = {
  number: PropTypes.number,
  color: PropTypes.string,
}