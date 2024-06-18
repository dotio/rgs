import React from 'react'
import styled from 'styled-components'
import {media} from '../../helpers/media'
import {Icon} from '../../ui/icon'
import {Text} from '../../ui/text'
import {TitleText} from '../../ui/title-text'
import {Wrapper} from '../../ui/wrapper'
import {Well} from '../../ui/well'
import {Container} from '../../ui/grid/container'
import {Row} from '../../ui/grid/row'
import {Col} from '../../ui/grid/col'
import {Router} from '../../routes'
import {PageRatingItem} from './page-rating-item'

const InfoWrapperDesktop = styled.div`
  position: relative;
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
  
  ${media.mobile`
    display: none;
  `}
`

const InfoWrapperMobile = styled.div`
  position: relative;
  display: none;
  cursor: pointer;
  
  ${media.mobile`
    display: block;
    padding-top: 4px;
    transition: opacity 0.2s linear;
    &:hover {
      opacity: 0.7;
    }
  `}
`

const InfoIcon = styled(Icon)`
  position: absolute;
  top: 3px;
  
  ${media.mobile`
    top: 7px;
  `}
`

const InfoText = styled(Text)`
  text-indent: 20px;
  width: 160px;
  ${media.mobile`
    width: 100%;
  `}
`

export const PageRatingBlock = ({rating, additionalRating, ratingTitle, ratingInfo}) => {

  return (rating && rating > 0 && <Well padding={'24px 0 0'}>
    <Container>
      <TitleText padding={'0 0 16px'}>{ratingTitle}</TitleText>
      <Row>
        <Col sm={{cols: 12}} lg={{cols: 4}}>
          <Wrapper flow={'column'} gap={'12px'} padding={{bottom: '24px'}} mobilePadding={{bottom: '8px'}}>
            <Wrapper align={'baseline'} gap={'5px'}>
              <Text width={'auto'} color={'primary'} size={'48px'} lineHeight={'64px'} smSize={'36px'} smLineHeight={'48px'} decoration={'underline'}>
                {rating}
              </Text>
              <Text color={'black50'}>
									/ 5
              </Text>
            </Wrapper>
            <InfoWrapperDesktop onClick={() => Router.pushRoute('/about/rating')}>
              <InfoIcon width={16} height={16} type={'info'} color={'primary'} cursor={'pointer'} />
              <InfoText width={'auto'} color={'primary'}>
                {ratingInfo}
              </InfoText>
            </InfoWrapperDesktop>
          </Wrapper>
        </Col>
        <Col sm={{cols: 12}} lg={{cols: 8}}>
          {additionalRating && additionalRating.length >= 1 && (
            additionalRating.map(({id, title, value, description}) => (
              <PageRatingItem key={id} title={title} value={value} description={description}/>))
          )}
          <InfoWrapperMobile onClick={() => Router.pushRoute('/about/rating')}>
            <InfoIcon width={16} height={16} type={'info'} color={'primary'} cursor={'pointer'} />
            <InfoText width={'auto'} color={'primary'} >
              {ratingInfo}
            </InfoText>
          </InfoWrapperMobile>
        </Col>
      </Row>
    </Container>
  </Well>
  )
}