import React from 'react'
import {Text} from '../../ui/text'
import {Icon} from '../../ui/icon'
import {Wrapper} from '../../ui/wrapper'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {getColor} from '../../ui/helpers/getColor'
import {Link} from 'react-scroll'


const RatingContainer = styled(Wrapper)`
  width: 110px;
  height: 110px;
  border-radius: 20px;
  background: linear-gradient(147.74deg, #40B2C9 13.44%, #55DF94 85.6%);
  padding: 12px 12px 16px 12px;
  
  &:hover {
    cursor: pointer;
  }  
  &:hover svg {
    transition: 0.3s linear;
    fill: ${p => getColor('white', p.theme)};
  }
`

const StyledIcon = styled(Icon)`
  &:active{
    transform: scale(0.95);
  }
`

const RatingItem = styled.div`
  width: 6px;
  height: 12px;
  background-color: white;
  background: ${p => p.disabled? 'rgba(255, 255, 255, 0.34)' :  'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.85) 100%)'};
  border-radius: 2px;
`
export const HeaderRatingBlock = ({title, ratingValue, maxRating, toLink}) => {
  const ratingItems = new Array(maxRating + 1).join('*').split('')
  return (
    <RatingContainer flow={'column'} gap={'8px'}>
      <Wrapper justify={'space-between'} align={'flex-start'}>
        <Text size={'12px'} lineHeight={'14px'} color={'white'}>
          {title}
        </Text>
        <Link to={toLink} smooth>
          <StyledIcon width={24} height={24} type={'info'} color={'white70'} cursor={'pointer'}/>
        </Link>
      </Wrapper>
      <Wrapper flow={'column'} gap={'2px'}>
        <Text size={'28px'} lineHeight={'32px'} color={'white'} bold={true}>
          {ratingValue}
        </Text>
        <Wrapper gap={'2px'}>
          {ratingItems.map((item, i) => <RatingItem key={i} disabled={ i + 1 > ratingValue} />)}
        </Wrapper>
      </Wrapper>
    </RatingContainer>
  )
}

HeaderRatingBlock.propTypes = {
  title: PropTypes.string,
  ratingValue: PropTypes.number,
  maxRating: PropTypes.number,
}

HeaderRatingBlock.defaultProps = {
  maxRating: 5,
}