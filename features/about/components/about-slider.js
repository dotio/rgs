import {useState, useRef, useEffect} from 'react'
import {useSelector} from 'react-redux'
import styled, {css, keyframes} from 'styled-components'
import {Well} from '../../../ui/well'
import {Wrapper} from '../../../ui/wrapper'
import {Container} from '../../../ui/grid/container'
import {MediumText} from '../../../ui/medium-text'
import {TitleText} from '../../../ui/title-text'
import {Text} from '../../../ui/text'
import {media} from '../../../helpers/media'
import {getColor} from '../../../ui/helpers/getColor'
import {getTranslator} from '../../../utils/translation'
import {useSwipeable} from 'react-swipeable'

const slides = [
  {
    bgImg: '/static/about-second-opinion.png',
    bgPosRight: '32px',
    bgPosBottom: '0',
    title: 'about.slider.slide1.title',
    subTitle: 'about.slider.slide1.subtitle',
  },
  {
    bgImg: '/static/about-medsovetnic.png',
    bgPosRight: '0',
    bgPosBottom: '0',
    title: 'about.slider.slide2.title',
    subTitle: 'about.slider.slide2.subtitle',
  },
  {
    bgImg: '/static/about-telemedicine.png',
    bgPosRight: '32px',
    bgPosBottom: '40px',
    title: 'about.slider.slide3.title',
    subTitle: 'about.slider.slide3.subtitle',
  },
  {
    bgImg: '/static/about-digital-medcard.png',
    bgPosRight: '0',
    bgPosBottom: '0',
    title: 'about.slider.slide4.title',
    subTitle: 'about.slider.slide4.subtitle',
  },
  {
    bgImg: '/static/about-family.png',
    bgPosRight: '0',
    bgPosBottom: '0',
    title: 'about.slider.slide5.title',
    subTitle: 'about.slider.slide5.subtitle',
  },
  {
    bgImg: '/static/about-doctors-base.png',
    bgPosRight: '0',
    bgPosBottom: '0',
    title: 'about.slider.slide6.title',
    subTitle: 'about.slider.slide6.subtitle',
  },
  {
    bgImg: '/static/about-rating.png',
    bgPosRight: '0',
    bgPosBottom: '0',
    title: 'about.slider.slide7.title',
    subTitle: 'about.slider.slide7.subtitle',
  },
  {
    bgImg: '/static/about-service-prices.png',
    bgPosRight: '0',
    bgPosBottom: '0',
    title: 'about.slider.slide8.title',
    subTitle: 'about.slider.slide8.subtitle',
  },
]

// TODO: пока не починим убрал в мобиле
const SliderWell = styled(Well)`
  
  height: 540px;
  position: relative; 
  background-image: ${p => p.bgImg ? `url(${p.bgImg})` : 'none' };
  background-position: bottom ${p => p.bgPosBottom} right ${p => p.bgPosRight};
  background-size: ${p => p.bgSize ? p.bgSize : 'auto'};
  background-repeat: no-repeat;
  padding-bottom: 48px;
  padding-top: 4px;

  ${media.mobile`
    display: none;
  `}
`
const TopControl = styled.div`
  background-color: rgba(0, 0, 0, .3);
  border-radius: 100px;
  height: 2px;
  ${(p) => p.active && css`
    background-color: ${getColor('black', p.theme)};
  `}
`
const TopControlContainer = styled.div`
  padding 17px 0;
  width: 100%;
  &:hover {
    & > div {
      background-color: ${p => getColor('black', p.theme)};
    }
    cursor: pointer;  
  }
`
const SliderContainer = styled(Container)`
  height: 100%;
`
const ContentWrapper = styled(Wrapper)`
  height: 100%;
  justify-content: space-between;
`
const MainTitle = styled(Text)`
  font-size: 48px;
  line-height: 60px;
  ${media.mobile`
    font-size: 24px;
    line-height: 28px;
  `}
`
const AnimationOpen = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const Slide = styled(Wrapper)`
  ${p => p.open && css`
    animation: ${AnimationOpen} 1s linear;
  `}
`
const NextPrevButton = styled.div`
  cursor: none;
  ${p => p.defaultCursor && `
    cursor: default;
  `}
  position: absolute;
  left: 0;
  width: 50%;
  height: calc(100% - 40px);
  bottom: 0;
  justify-content: center;
  align-content: center;

  ${p => p.right && `
    left: unset;
    right: 0;
  `}
`
const ArrowCursor = styled.div`
  width: 32px;
  height: 32px;
  position: fixed;
`

export const AboutSlider = () => {
  const translator = useSelector(state => getTranslator(state.localization))
  const [slideIndex, setSlideIndex] = useState(0)
  const slideBlock = useRef(null)
  const [open, setOpen] = useState(false)
  const { title, subTitle, bgImg, bgPosRight, bgPosBottom, bgSize } = slides[slideIndex]
  const cursor = useRef(null)

  const onSlideClick = index => {
    if (slideIndex === index) return
    setOpen(true)
    setSlideIndex(index)
  }

  useEffect(() => {
    slideBlock.current.addEventListener('animationend', () => {
      setOpen(false)
    })
  }, [])

  const handlers = useSwipeable({onSwiping: ({dir}) => dir === 'Right' && onSlideClick(isLastSlide ? 0 : (slideIndex + 1)) ||
        dir === 'Left' && onSlideClick(isFirstSlide ? (slides.length - 1) : (slideIndex - 1)), trackMouse: true})

  const isFirstSlide = slideIndex === 0
  const isLastSlide = slideIndex === slides.length - 1

  const mouseMove = event => {
    cursor.current.style.display = 'block'
    cursor.current.style.top = event.clientY + 'px'
    cursor.current.style.left = event.clientX + 'px'
  }

  const setCursorBg = dir => {
    cursor.current.style.background = `url(/static/icons/arrow-${dir}-green-svg.svg)`
  }

  const hideCursor = () => cursor.current.style.display = 'none'

  return (
    <>
      <SliderWell bgImg={bgImg} bgPosRight={bgPosRight} bgPosBottom={bgPosBottom} bgSize={bgSize} open={open} {...handlers}>
        <SliderContainer>
          <ContentWrapper flow={'column'} ref={slideBlock}>
            <Wrapper flow={'column'} gap={'4px'}>
              <Wrapper justify={'center'} align={'center'} gap={'8px'}>
                {slides.map((slide, i) => (
                  <TopControlContainer key={i} onClick={() => onSlideClick(i)}>
                    <TopControl active={i === slideIndex}/>
                  </TopControlContainer>
                ))}
              </Wrapper>
              <TitleText color={'rgba(0, 0, 0, 0.5)'}>{translator('about.main.title', true)}</TitleText>
            </Wrapper>
            <Slide flow={'column'} width={'447px'} gap={'16px'} open={open}>
              <MainTitle bold>{translator(title, true).split('\n').map((row, i) => <div key={i}>{row}</div>)}</MainTitle>
              <MediumText>{translator(subTitle, true)}</MediumText>
            </Slide>
          </ContentWrapper>
        </SliderContainer>
        <NextPrevButton
          onClick={() => onSlideClick(isFirstSlide ? (slides.length - 1) : (slideIndex - 1))}
          onMouseOut={hideCursor}
          onMouseMove={event => {
            mouseMove(event)
            setCursorBg('left')
          }}/>
        <NextPrevButton
          right
          onClick={() => onSlideClick(isLastSlide ? 0 : (slideIndex + 1))}
          onMouseOut={hideCursor}
          onMouseMove={event => {
            mouseMove(event)
            setCursorBg('right')
          }}/>
      </SliderWell>
      <ArrowCursor ref={cursor}/>
    </>
  )
}