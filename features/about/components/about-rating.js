import React from 'react'
import styled from 'styled-components'
import {Wrapper} from '../../../ui/wrapper'
import {CircleButton} from '../../../ui/circle-button'
import {Router} from '../../../routes'
import {TitleText} from '../../../ui/title-text'
import {Container} from '../../../ui/grid/container'
import {Img} from '../../../ui/img'
import {MediumText} from '../../../ui/medium-text'
import {T} from '../../../utils/translation'
import {Well} from '../../../ui/well'
import {media} from '../../../helpers/media'
import {Text} from '../../../ui/text'
import {getColor} from '../../../ui/helpers/getColor'
import {DoctorClinicRatingBlock} from './doctor-clinic-raiting-block'

const HeaderImg = styled.div`
  display: flex;
  background-image: ${p => `url(${p.src})`};
  width: 100%;
  height: 300px;
  flex-shrink: 0;
  flex-grow: 0;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  ${media.mobile`
    height: 200px;
    background-size: cover;
  `};
  @media (max-width: 1089px) {
    height: 300px;
    background-size: cover;
  }
  @media (max-width: 760px) {
    height: 200px;
  }
`

const RelativeWrapper = styled(Wrapper)`
  position: relative;
`

const IconBlock = styled(Wrapper)`
  border-radius: 16px;
  width: 232px;
  height: 140px;
  background: ${p => getColor('black05', p.theme)};
  ${media.mobile`
    min-width: 110px;
    width: 110px;
    height: 110px;
  `}
`

const ContentWrapper = styled(Wrapper)`
  &:not(:last-child){
    margin-right: 12px;
  }
  ${media.mobile`
    flex-direction: row;
    margin-right: 0px;
    &:not(:last-child){
      margin-bottom: 24px;
    }
  `}
`

const ReviewWrapper = styled(Wrapper)`
  ${media.mobile`
    flex-direction: column;
  `}
`

const StyledImg = styled(Img)`
  ${media.mobile`
    width: 85px;
    height: 16px;
  `}
`


export const AboutRating = () => {
  return (
    <RelativeWrapper flow={'column'} gap={'6px'}>
      <Well color={'transparent'}>
        <Container>
          <TitleText><T ucFirst>about.rating.title</T></TitleText>
          <CircleButton icon={'long_arrow_left'} onClick={() => Router.back()}/>
        </Container>
        <Wrapper padding={'24px 0'} mobilePadding={'40px 0'}>
          <HeaderImg src={'/static/banners/about_rating_header.svg'}/>
        </Wrapper>
        <Container>
          <Text size={'20px'} lineHeight={'30px'}><T ucFirst>about.rating.description1</T></Text>
          <Text size={'20px'} lineHeight={'30px'} padding={'16px 0 0'}><T ucFirst>about.rating.description2</T></Text>
        </Container>
      </Well>
      <Well>
        <Container>
          <Text size={'28px'} lineHeight={'32px'} smLineHeight={'30px'} smSize={'20px'}><T ucFirst>about.rating.feedbacks.title</T></Text>
          <Text size={'28px'} lineHeight={'32px'} smLineHeight={'30px'} smSize={'20px'}color={'black50'}><T ucFirst>about.rating.feedbacks.subtitle</T></Text>
          <ReviewWrapper padding={'24px 0 0'} mobilePadding={'32px 0 0'}>
            <ContentWrapper flow={'column'}>
              <IconBlock align={'center'} justify={'center'}>
                <Img width={'110px'} height={'110px'} src={'/static/about_doctor.png'} />
              </IconBlock>
              <Wrapper padding={'12px 0 0'} mobilePadding={'0 0 0 16px'}>
                <MediumText ><T ucFirst>about.rating.feedbacks.step1</T></MediumText>
              </Wrapper>
            </ContentWrapper>
            <ContentWrapper flow={'column'}>
              <IconBlock align={'center'} justify={'center'}>
                <Img width={'88px'} height={'100px'} src={'/static/icons/about-feedback.svg'} />
              </IconBlock>
              <Wrapper padding={'12px 0 0'} mobilePadding={'0 0 0 16px'}>
                <MediumText ><T ucFirst>about.rating.feedbacks.step2</T></MediumText>
              </Wrapper>
            </ContentWrapper>
            <ContentWrapper flow={'column'}>
              <IconBlock align={'center'} justify={'center'}>
                <StyledImg width={'160px'} height={'30px'} src={'/static/icons/about-rating-line.svg'} />
              </IconBlock>
              <Wrapper padding={'12px 0 0'} mobilePadding={'0 0 0 16px'}>
                <MediumText ><T ucFirst>about.rating.feedbacks.step3</T></MediumText>
              </Wrapper>
            </ContentWrapper>
          </ReviewWrapper>
        </Container>
      </Well>
      <DoctorClinicRatingBlock doctor />
      <DoctorClinicRatingBlock />
    </RelativeWrapper>
  )
}