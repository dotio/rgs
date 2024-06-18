import React from 'react'
import styled from 'styled-components'
import {Container} from '../../ui/grid/container'
import {Well} from '../../ui/well'
import {Row} from '../../ui/grid/row'
import {Col} from '../../ui/grid/col'
import {Text} from '../../ui/text'
import {TitleText} from '../../ui/title-text'
import {Button} from '../../ui/button'
import {Wrapper} from '../../ui/wrapper'
import {Link}        from '../../routes'
import {T} from '../../utils/translation'
import {media} from '../../helpers/media'
import {isMobile} from 'react-device-detect'

const StyledWrapper = styled(Wrapper)`
  ${media.mobile`
    flex-direction: column;
  `}
`

const NumberBox = styled(Wrapper)`
  background: #E2E2E2;
  backdrop-filter: blur(5px);
  border-radius: 20px;
  height: 110px;
`

const StyledButton = styled(Button)`
  ${media.mobile`
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
  `}
`

const banners = [
  {
    title:'banner.advantages.catalog',
  },
  {
    title:'banner.advantages.rating',
  },
  {
    title:'banner.advantages.consultation',
  },
  {
    title:'banner.advantages.family',
  },
]

export const MainBannersBlock = () => {
  return (
    <Well color={'transparent'}>
      <Container>
        <StyledWrapper padding={'0 0 20px'} gap={'12px'} mobileGap={'0'}>
          <TitleText width={'auto'}><T ucFirst>banner.medservice.title</T></TitleText>
          <TitleText width={'auto'} color={'black50'}><T ucFirst>banner.medservice.subtitle</T></TitleText>
        </StyledWrapper>
        <Row>
          {banners.map((banner, index) => (
            <Col key={index} lg={{cols: 3, paddingBottom: '24px'}} sm={{cols: 6, paddingBottom: '20px'}}>
              <NumberBox justify={'center'} align={'center'}>
                <Text
                  size={'48px'}
                  lineHeight={'48px'}
                  align={'center'}
                  color={'white'}
                >
                  {index + 1}
                </Text>
              </NumberBox>
              <Text padding={'12px 0 0'}><T ucFirst>{banner.title}</T></Text>
            </Col>
          ))}
        </Row>
        <Wrapper align={'center'} justify={'center'}>
          <Link route={'/about'} passHref>
            <StyledButton><T ucFirst>{isMobile ? 'banner.medservice.about.mobile' : 'banner.medservice.about'}</T></StyledButton>
          </Link>
        </Wrapper>
      </Container>
    </Well>
  )
}