import React, {useState} from 'react'
import styled,{css} from 'styled-components'
import {getColor} from '../../../../ui/helpers/getColor'
import {Text} from '../../../../ui/text'
import PropTypes from 'prop-types'
import {Wrapper} from '../../../../ui/wrapper'
import {media} from '../../../../helpers/media'

const Rating = styled.div`
  border: 1px solid ${p => getColor('black15', p.theme)};
  border-radius: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 64px;
  height: 64px;
  &:not(:last-child) {
    margin-right: 6px;
  }
  
  ${p => p.active && css`
    background: linear-gradient(90deg, #01ADC4 0%, #01D587 65.51%);;
    ${Text} {
      color: white;
    }
  `}
  
  &:hover {
      background: linear-gradient(90deg, #01ADC4 0%, #01D587 65.51%);;
      ${Text} {
        color: white;
      }
  }
  
  ${p => p.choosed && css`
     ${Text} {
      color: ${p.index === p.choosedIndex ? 'white' : 'transparent'};
     }
  `}
  
  ${media.mobile`
    width: 48px;
    height: 48px;
    &:not(:last-child) {
    margin-right: 4px;
  }
  `}
`

export const ProfileRating = ({onClick, currentIndex, count = 6}) => {
  const [hoverIndex, setHover] = useState(-1)

  const isChoosed = currentIndex >= 0

  return (
    <Wrapper onMouseLeave={() => setHover(-1)}>
      {[...new Array(Math.max(count)).keys()].map((item, index) => (
        <Rating
          choosed={isChoosed}
          index={index}
          choosedIndex={currentIndex}
          active={currentIndex >= index || hoverIndex >= index}
          key={index}
          onClick={() => onClick(index)}
          onMouseEnter={() => setHover(index)}
        >
          <Text size={'20px'} lineHeight={'30px'} color={'primary'} align={'center'}>{item.name || index}</Text>
        </Rating>
      ))}
    </Wrapper>
  )
}

ProfileRating.propTypes = {
  onClick: PropTypes.func
}