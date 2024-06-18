import React from 'react'
import styled from 'styled-components'
import {Link} from '../../../routes'
import {Well} from '../../../ui/well'
import {Wrapper} from '../../../ui/wrapper'
import {Img} from '../../../ui/img'
import {TitleText} from '../../../ui/title-text'
import {Container} from '../../../ui/grid/container'
import {Row} from '../../../ui/grid/row'
import {Col} from '../../../ui/grid/col'
import {media} from '../../../helpers/media'
import {getColor} from '../../../ui/helpers/getColor'
import {T} from '../../../utils/translation'

const items = [
  {
    title: <T ucFirst>profile.main.links.medcard</T>,
    img: '/static/medcard.svg',
    route: '/profile/medcard'
  },
  {
    title: <T ucFirst>profile.main.links.products</T>,
    img: '/static/green_heart.svg',
    route: '/profile/products'
  },
  {
    title: <T ucFirst>profile.main.links.other-medcards</T>,
    img: '/static/red_heart.svg',
    route:'/profile/family'
  }
]

const StyledNotification = styled(Wrapper)`
  height: 220px;
  border-radius: 16px;
  background-color: ${(p) => getColor('white', p.theme)};
  cursor: pointer;

  ${media.mobile`
    height: 169px;

    &:first-child {
      margin-bottom: 6px;
    }
  `}
`

const ImageBox = styled(Wrapper)`
  background-color: ${(p) => getColor('black05', p.theme)};
  border-radius: 16px;
  align-self: flex-end;
  height: 60px;
`

export const LinksBlock = () => {
  return <Well color={'transparent'}>
    <Container>
      <Row>
        {items.map((item, index) =>
          <Col lg={{cols: 4}} sm={{cols: 6}} key={'item-' + index}>
            <Link route={item.route} passHref>
              <StyledNotification flow={'column'} justify={'space-between'} padding={'16px'}>
                <TitleText>{item.title}</TitleText>
                {item.img && <ImageBox justify={'center'} align={'center'} width={'60px'}>
                  <Img src={item.img}/>
                </ImageBox>}
              </StyledNotification>
            </Link>
          </Col>
        )}
      </Row>
    </Container>
  </Well>
}
