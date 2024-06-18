import {Text} from './text'
import {Icon} from './icon'
import React from 'react'
import {Wrapper} from './wrapper'
import styled from 'styled-components'
import {getColor} from './helpers/getColor'
import PropTypes from 'prop-types'
import {RatingLine} from './rating-line'

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 20px;
  background-color: ${(p) => getColor('black05', p.theme)};
  padding: 12px 12px 17px 12px;
`

export const RatingBlock = ({title, ratingValue, colorFrom, colorTo}) => {
  return (
    <RatingContainer>
      <Wrapper justify={'space-between'} align={'center'}>
        <Text size={'16px'} lineHeight={'24px'} color={'black'}>
          {title}
        </Text>
        <Icon width={20} height={20} type={'circle_right'} color={'black40'} cursor={'pointer'} />
      </Wrapper>
      <Wrapper justify='space-between' margin={'30px 0 0'}>
        <Text
          size={'28px'}
          lineHeight={'32px'}
          color={'black'}
          bold={true}
        >
          {ratingValue}
        </Text>
        <Wrapper>
          <RatingLine ratingValue={ratingValue} colorFrom={colorFrom} colorTo={colorTo} />
        </Wrapper>
      </Wrapper>
    </RatingContainer>
  )
}

RatingBlock.propTypes = {
  title: PropTypes.string,
  ratingValue: PropTypes.number,
  colorFrom: PropTypes.string,
  colorTo: PropTypes.string,
}
