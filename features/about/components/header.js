import {useState} from 'react'
import styled from 'styled-components'
import {Well} from '../../../ui/well'
import {Container} from '../../../ui/grid/container'
import {TitleText} from '../../../ui/title-text'
import {Text} from '../../../ui/text'
import {Col} from '../../../ui/grid/col'
import {Row} from '../../../ui/grid/row'
import {T} from '../../../utils/translation'
import {Slider} from '../../../ui/slider'
import {media} from '../../../helpers/media'

const Empty = styled.div`
  height: 310px;
`

const ItemWrapper = styled(Container)`


  ${media.mobile`
    max-width: calc(100vw - 32px);
  `}
`

const slides = [{
  subtitle: <T ucFirst>about.main.subtitle-1</T>,
  description: <T ucFirst>about.main.description-1</T>,
  bgColor: 'white',
}, {
  subtitle: <T ucFirst>about.main.subtitle-2</T>,
  description: <T ucFirst>about.main.description-2</T>,
  bgColor: 'lightenBlue',
}, {
  subtitle: <T ucFirst>about.main.subtitle-3</T>,
  description: <T ucFirst>about.main.description-3</T>,
  bgColor: 'lightenGreen',
}, {
  subtitle: <T ucFirst>about.main.subtitle-4</T>,
  description: <T ucFirst>about.main.description-4</T>,
  bgColor: 'lightenAquamarin',
}, {
  subtitle: <T ucFirst>about.main.subtitle-5</T>,
  description: <T ucFirst>about.main.description-5</T>,
  bgColor: 'lightenBlue',
}, {
  subtitle: <T ucFirst>about.main.subtitle-6</T>,
  description: <T ucFirst>about.main.description-6</T>,
  bgColor: 'lightenGreen',
}, {
  subtitle: <T ucFirst>about.main.subtitle-7</T>,
  description: <T ucFirst>about.main.description-7</T>,
  bgColor: 'lightenAquamarin',
}, {
  subtitle: <T ucFirst>about.main.subtitle-8</T>,
  description: <T ucFirst>about.main.description-8</T>,
  bgColor: 'lightenBlue',
}]

export const AboutHeader = () => {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <Well padding={'24px 0 0'} mobilePadding={'20px 0 0'} color={slides[activeSlide].bgColor || 'white'}>
      <Slider onChange={(slide) => setActiveSlide(slide)}>
        {slides.map((slide, i) => (
          <ItemWrapper key={i}>
            <Row>
              <Col lg={{cols: 12}} sm={{cols: 12}}>
                <TitleText color={'black50'}>
                  <T ucFirst>about.main.title</T>
                </TitleText>
              </Col>
              <Col lg={{cols: 12}} sm={{cols: 12}}>
                <Empty/>
              </Col>
              <Col lg={{cols: 12}} sm={{cols: 12}}>
                <TitleText color={'black'} bold>
                  {slide.subtitle}
                </TitleText>
                <Text color={'black'} size={'20px'} lineHeight={'30px'} padding={'0 0 24px'}>
                  {slide.description}
                </Text>
              </Col>
            </Row>
          </ItemWrapper>
        ))}
      </Slider>
    </Well>
  )
}