import {Children, useState, useRef, useEffect} from 'react'
import styled, {css} from 'styled-components'
import {Wrapper} from './wrapper'
import {getColor} from './helpers/getColor'
import {Container} from './grid/container'

const SliderWrapper = styled(Wrapper)`
  position: relative;
  overflow: hidden;
  user-select: none;
`
const RelativeContainer = styled(Container)`
  display: flex;
  flex-shrink: 0;
  padding: 0;
`
const TopControls = styled(Wrapper)`
  position: absolute;
  top: 0;
  left: 0;
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
  cursor: pointer;
  
  &:hover {
    ${TopControl} {
      background-color: ${(p) => getColor('black', p.theme)};
    }
  }
`
const ContentWrapper = styled(Wrapper)`
  overflow-x: scroll;
  scroll-behavior: smooth;
`
const SlidesWrapper = styled(Wrapper)`
  flex-shrink: 0;
`
const NextPrevButton = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  width: 50%;
  bottom: 0;
  justify-content: center;
  align-content: center;
  cursor: url('/static/icons/arrow-left.png'), pointer;

  ${(p) => p.right && `
    left: unset;
    right: 0;
    cursor: url('/static/icons/arrow-right.png'), pointer;
  `}
  
  ${(p) => p.disabled && `
    cursor: default;
  `}
`
const StyledContainer = styled(Container)`
  padding: 0;
`

export const Slider = ({onChange, children}) => {
  const [slideIndex, setSlideIndex] = useState(0)
  const slidesWrapperRef = useRef(null)

  useEffect(() => {
    if (!slidesWrapperRef.current) {
      return
    }
    slidesWrapperRef.current.scrollLeft = slideIndex * (slidesWrapperRef.current.offsetWidth + 20)
  }, [slideIndex, slidesWrapperRef])

  useEffect(() => {
    if (onChange) {
      onChange(slideIndex)
    }
  }, [slideIndex])

  const canMoveBackwards = slideIndex > 0
  const canMoveForward = slideIndex < Children.count(children) - 1

  return (
    <SliderWrapper>
      <RelativeContainer>
        <ContentWrapper padding={'40px 0 0'} ref={slidesWrapperRef}>
          <TopControls justify={'center'} align={'center'} gap={'8px'}>
            <StyledContainer>
              <Wrapper gap={'8px'}>
                {Children.map(children, (child, i) => (
                  <TopControlContainer key={i} onClick={() => setSlideIndex(i)}>
                    <TopControl active={slideIndex === i} />
                  </TopControlContainer>
                ))}
              </Wrapper>
            </StyledContainer>
          </TopControls>
          <NextPrevButton disabled={!canMoveBackwards} onClick={() => canMoveBackwards && setSlideIndex(slideIndex - 1)} />
          <NextPrevButton right disabled={!canMoveForward} onClick={() => canMoveForward && setSlideIndex(slideIndex + 1)} />
          <SlidesWrapper width={'auto'} gap={'20px'}>
            {Children.map(children, (child, i) => (
              <Wrapper key={i} width={'auto'}>
                {child}
              </Wrapper>
            ))}
          </SlidesWrapper>
        </ContentWrapper>
      </RelativeContainer>
    </SliderWrapper>
  )
}