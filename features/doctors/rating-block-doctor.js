import {Text} from '../../ui/text'
import React from 'react'
import {Icon} from '../../ui/icon'
import {Wrapper} from '../../ui/wrapper'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 20px;
  background-color: #28C387;
  padding: 12px 12px 12px 12px;
  height: 110px;
  width: 232px;
  margin-right: auto;
  margin-left: 12px;
`

const ImgBackground = styled.div`
  position: absolute;
  z-index: 10100;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0px;
  right: 0px;
  width: 64px;
  height: 72px;
  display: inherit;
  border-radius: 0px 0px 20px 0px;
  background-image: url(/static/doctor/doctor_rating_background.svg);
`

const ImgBackgroundArrow = styled.div`
  position: absolute;
  z-index: 10100;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 14px;
  right: 14px;
  width: 20px;
  height: 20px;
`

const RatingText = styled(Text)`
    display: inline-block;
    width: auto;
`

const ComponentFlex = styled.div`
  display: flex;
  align-items: center;
  margin: 12px 0 0 0;
`

const IconWithRotate = styled(Icon)`
   transform: rotate(270deg);
`

export const RatingBlock = ({title, description, goodwillRatingValue, ratingValue}) => {
  return (
    <RatingContainer>
      <Wrapper justify='space-between'>
        <Text size={'14px'} lineHeight={'14px'} color={'white'}>
          {title}
        </Text>
        <ImgBackgroundArrow>
          <IconWithRotate type={'circle_right'} color={'white70'} width={20} height={20}/>
        </ImgBackgroundArrow>
      </Wrapper>
      <Wrapper flow={'column'} justify='flex-start'>
        {description && <Text size={'14px'} lineHeight={'16px'} color={'rgba(255,255,255,0.7)'} bold={false}>
          {description}
        </Text>}
        {goodwillRatingValue && <Text size={'14px'} lineHeight={'16px'} color={'rgba(256, 256, 256, 0.7)'} bold={true}>
          {goodwillRatingValue}
        </Text>}
      </Wrapper>
      <ComponentFlex>
        <RatingText lineHeight={'24px'} color={'white'} size={'28px'} padding={'0 4px 0 0'}>
          {ratingValue}
        </RatingText>
        <Icon type={'rating'} color={'white'} width={16} height={16}/>
        <ImgBackground />
      </ComponentFlex>
    </RatingContainer>
  )
}

RatingBlock.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  goodwillRatingValue: PropTypes.string,
  ratingValue: PropTypes.number,
  colorFrom: PropTypes.string,
  colorTo: PropTypes.string,
}