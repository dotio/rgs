import React, {useRef, useState, useEffect} from 'react'
import styled from 'styled-components'
import {Container} from '../../ui/grid/container'
import {Wrapper} from '../../ui/wrapper'
import {media, sizes} from '../../helpers/media'
import {Icon} from '../../ui/icon'
import {scrollTo} from '../../helpers/animation/scroll'
import {SpecializationCard} from './specialization-card'
import {useDispatch, useSelector} from 'react-redux'
import {getPubSub} from '../../helpers/pubsub'
import {getTranslator} from '../../utils/translation'
import {TitleText} from '../../ui/title-text'
import {Well} from '../../ui/well'
import {useSwipeable} from 'react-swipeable'
import {isMobile} from 'react-device-detect'

const SpecializationsInnerContainer = styled.div`
  display: flex;
  width: 100%;
  overflow-x: hidden;
  ${media.mobile`
    overflow-x: scroll;
  `}
`

const ArrowsContainer = styled.div`
  ${media.mobile`
    display:none;
  `}
`

export const SpecializationsBlock = ({onShowAllClick, handleHideBlock}) => {
  const scrollContainer = useRef(null)
  const [scrolled, setScrolled] = useState(false)
  const dispatch = useDispatch()
  const onlyChild = useSelector(state => state.doctors.filters.onlyChildDF)
  const hidedDoctor = onlyChild ? 35 : 23
  const specializations = useSelector(state => state.doctors.specializations.filter(item => item.id !== hidedDoctor))
  const translator = useSelector(state => getTranslator(state.localization))
  const [hideBlockSpecializations, setHideBlockSpecializations] = useState(false)

  useEffect(() => {
    const resizeListener = (e) => {
      if (e.target.outerWidth <= sizes.mobile) {
        setScrolled(null)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])


  useEffect(() => {
    if (scrolled) {
      scrollTo(scrollContainer.current, scrollContainer.current.offsetWidth)
    } else {
      scrollTo(scrollContainer.current, 0)
    }
  }, [scrolled])

  const openSpecializationFilter = () => {
    getPubSub().emit('open-специальность') //TODO mb move to redux
    onShowAllClick()
  }

  const handleOnClick = (id) => {

    if(specializations.find(item => item.id === id)){
      setHideBlockSpecializations(hideBlockSpecializations)
      handleHideBlock && handleHideBlock(hideBlockSpecializations)
    }
    dispatch.doctors.updateFilters({specializationIdDF: id})
  }

  const handlers = !isMobile && useSwipeable({onSwiping: ({dir}) => dir === 'Right' && setScrolled(false) ||
        dir === 'Left' && setScrolled(true), trackMouse: true})

  return (
    <Well padding={'18px 0 0'} mobilePadding={'16px 0 0'} color={'transparent'} {...handlers}>
      <Container>
        <Wrapper padding={'0 0 16px'} justify={'space-between'} align={'center'}>
          <TitleText width={'auto'}>{translator('doctor.specilization.title', true)}</TitleText>
          <ArrowsContainer>
            <Icon
              onClick={() => setScrolled(false)}
              cursor={'pointer'}
              type={'arrow_left'}
              color={scrolled ? 'black40' : 'black10'}
            />
            <Icon
              onClick={() => setScrolled(true)}
              cursor={'pointer'}
              type={'arrow_right'}
              color={scrolled ? 'black10' : 'black40'}
            />
          </ArrowsContainer>
        </Wrapper>
        <SpecializationsInnerContainer ref={scrollContainer}>
          {specializations.map((specialization) =>
            <SpecializationCard
              key={specialization.id}
              image={specialization.image} // TODO вернуть когда загрузит бэк
              title={specialization.title}
              color={'black10'}
              borderColor={'transparent'}
              onClick={() => handleOnClick(specialization.id)}
            />
          )}
          <SpecializationCard borderColor={'black15'} image={'/static/doctor/more_image.png'} isAll onClick={openSpecializationFilter} title={translator('doctor.specilization.all', true)} color={'transparent'}/>
        </SpecializationsInnerContainer>
      </Container>
    </Well>
  )
}