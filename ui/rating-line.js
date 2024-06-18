import styled from 'styled-components'
import PropTypes from 'prop-types'
import {getColor} from './helpers/getColor'

const RatingLineWrapper = styled.div`
  width: ${(p) => p.maxValue * 24}px;
  height: 24px;
  border-radius: 2px 0px 0px 2px;
  background: ${(p) => getColor('black15', p.theme)};
  position: relative;
`

const RatingBlockWrapper = styled.div`
  display: flex;
  width: ${(p) => p.maxValue * 24}px;
  height: 24px;
  z-index: 10;
  top: 0;
  left: 0;
  position: absolute;
`

const RatingOneBlock = styled.div`
  width: 24px;
  height: 24px;
  border-right: 2px solid ${(p) => getColor('black05', p.theme)};
`

const Gradient = styled.div`
  height: 24px;
`

export const RatingLine = ({ratingValue, maxValue, colorFrom, colorTo}) => {
  const elements = []
  for (let i = 0; i < maxValue - 1; i++) {
    let div = <RatingOneBlock key={i}/>
    elements.push(div)
  }

  const newValue = Math.round((parseFloat(ratingValue) * 100) / maxValue)

  return (
    <RatingLineWrapper maxValue={maxValue}>
      <Gradient
        style={{
          width: newValue < 100 ? `${newValue}%` : null,
          background: `linear-gradient(to right, ${colorFrom}, ${colorTo})`,
        }}
      />
      <RatingBlockWrapper maxValue={maxValue}>{elements}</RatingBlockWrapper>
    </RatingLineWrapper>
  )
}

RatingLine.propTypes = {
  maxValue: PropTypes.number,
}
RatingLine.defaultProps = {
  maxValue: 5,
}
