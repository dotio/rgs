import React, {useState, useEffect} from 'react'
import styled, {css} from 'styled-components'
import {Button} from '../../../ui/button'
import {media} from '../../../helpers/media'
import {Icon} from '../../../ui/icon'
import {Text} from '../../../ui/text'
import {Wrapper} from '../../../ui/wrapper'
import {CircleButton} from '../../../ui/circle-button'
import {Router} from '../../../routes'
import {useDispatch, useSelector} from 'react-redux'
import {Well} from '../../../ui/well'
import {getColor} from '../../../ui/helpers/getColor'
import {Container} from '../../../ui/grid/container'
import {FavoriteRepository} from '../../profile/repository/favorite'
import {getTranslator, T} from '../../../utils/translation'
import {Link} from 'react-scroll'
import {HeaderRatingBlock} from '../new-rating-block-doctor'
import {Col} from '../../../ui/grid/col'
import {Row} from '../../../ui/grid/row'
import {TitleText} from '../../../ui/title-text'
import {redirectNotAuth} from '../../../lib/redirect'
import {Avatar} from '../../../ui/avatar'

const DoctorButton = styled(Button)`
  display: flex;
  align-items: center;
`

const StyledWrapper = styled(Wrapper)`
  overflow-x: auto;
  overflow-y: hidden;
`

const MenuLink = styled.div`
  white-space: nowrap;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  color: ${p => getColor('black50', p.theme)};
  margin-right: 20px;
  position: relative;
  padding-bottom: 9px;
  display: block;
  height: 100%;

  ${(p) => p.active && css`
    color: ${p => getColor('primary', p.theme)};
    border-bottom: 1px solid ${p => getColor('primary', p.theme)};
  `}
`

const DesktopStyledText = styled(Text)`
  display: inline-block;
  ${media.mobile`
    display: none;
  `}
`

const MobileStyledText = styled(Text)`
  display: none;
  ${media.mobile`
    display: inline-block;
  `}
`

const MobileTitleText = styled(TitleText)`
  ${media.mobile`
    padding-right: 32px;
  `}
`

const StyledAvatar = styled(Avatar)`
  ${media.mobile`
    width: 110px;
    height: 110px;
    min-height: 110px
  `}
`

const RatingDescription = ({texts}) => {
  return (
    <TitleText width={'auto'}>
      {texts.map(one =>
        <TitleText
          as={'span'}
          key={one.text}
          color={one.highlight ? 'green' : 'black50'}
        >{one.text}</TitleText>
      )}
    </TitleText>
  )
}

const HEADER_ROUTES = [
  {
    name: 'doctor.header.menu.appointment',
    link: 'doctor-appointment',
  },
  {
    name: 'doctor.header.menu.about',
    link: 'doctor-about',
  },
  {
    name: 'doctor.header.menu.clinics',
    link: 'doctor-clinics',
  },
  // TODO Убрали из макета. Пока скрываем на случай, если вновь передумают
  // {
  //   name: 'doctor.header.menu.doctors',
  //   link: 'other-doctors',
  // },
]

const FixedCircleButton = styled(CircleButton)`
  position: fixed;
  right: 338px;
  
  ${media.medium`
    right: 16px;
  `}
   ${media.mobile`
    position: absolute;
    right: 16px;
  `}
`

const StyledBlockWrapper = styled(Wrapper)`
  height: 110px;
`

export const DoctorHeader = () => {
  const dispatch = useDispatch()
  const doctor = useSelector((state) => state.doctors.currentDoctor)
  const translator = useSelector(state => getTranslator(state.localization))
  const loggedIn = useSelector(state => state.login.loggedIn)
  const doctorCityFilter = useSelector(state => state.doctors.filters.cityIdDF)

  const [isFavorite, setIsFavorite] = useState(doctor.isFavorite)
  const [loading, setLoading] = useState(false)

  const toggleFavorite = async () => {
    if (!loggedIn) {
      redirectNotAuth({asPath: 'login'})
    } else {
      const fn = isFavorite ? FavoriteRepository.removeFavorite : FavoriteRepository.addFavorite
      setLoading(true)
      try {
        await fn('doctor', doctor.id)
        dispatch.doctors.changeFavoriteStatus(!isFavorite)
        setIsFavorite(!isFavorite)
      } finally {
        setLoading(false)
      }
    }
  }

  const toggleShare = async () => {
    await dispatch.modal.addAndShowModal({type: 'share-doctor-modal'})
  }

  const handleAvatarClick = async () => {
    if (doctor.photo) {
      const fullName = `${doctor.surname} ${doctor.name} ${doctor.middlename}`
      await dispatch.modal.addAndShowModal({type: 'image', data: { url: doctor.photo, title: fullName, withoutControlsButton: true}})
    }
  }

  useEffect(() => {
    setIsFavorite(doctor.isFavorite)
  }, [doctor.isFavorite])

  const backFilters = doctorCityFilter ? {
    cityIdDF: doctorCityFilter
  } : {}

  const [activeLink, setActiveLink] = useState('doctor-appointment')
  const renderMenuLink = (link) => (
    <Link to={link.link} key={link.name} smooth>
      <MenuLink onClick={() => setActiveLink(link.link)} active={link.link === activeLink}>
        <T ucFirst>{link.name}</T>
      </MenuLink>
    </Link>
  )

  return (
    <Well padding={'24px 0 0'} mobilePadding={'20px 0 0'}>
      <Container>
        <MobileTitleText>{doctor.surname} {doctor.name} {doctor.middlename}</MobileTitleText>
        <FixedCircleButton icon={'long_arrow_left'} onClick={() =>  Router.pushRoute('doctors/list', backFilters)} />
        <TitleText color={'black50'} padding={'0 0 24px'}>
          {doctor.specializations && doctor.specializations.length > 0 && doctor.specializations.map((value, index) => index !== 0 ? value && value.title.toLowerCase() : value && value.title.charAt(0).toUpperCase() + value.title.slice(1)).join(', ')}
        </TitleText>
        <Row>
          <StyledBlockWrapper width={'auto'}>
            <Col lg={{cols: 2, paddingBottom: '24px'}} sm={{cols: 2, paddingBottom: '24px'}}>
              <StyledAvatar
                src={doctor.photo ? doctor.photo : '/static/avatars/doctor_empty_big.svg'}
                height={'110px'}
                minHeight={'110px'}
                width={'110px'}
                clickable={!!doctor.photo}
                onClick={handleAvatarClick}
              />
            </Col>
          </StyledBlockWrapper>
          {doctor && doctor.rating && <StyledBlockWrapper width={'auto'}>
            <Col lg={{cols: 2, paddingBottom: '24px'}} sm={{cols: 2, paddingBottom: '24px'}}>
              <HeaderRatingBlock
                title={translator('doctor.header.raiting', true)}
                ratingValue={parseFloat(doctor.rating)}
                toLink={'doctor-rating'}
              />
            </Col>
          </StyledBlockWrapper>}
        </Row>
        {doctor.achievement && <Wrapper justify={'flex-start'}>
          <RatingDescription texts={doctor.achievement.texts}/>
        </Wrapper>}
        <Wrapper justify={'flex-start'} padding={'24px 0 0'} gap={'8px'}>
          <DoctorButton showLoader={loading} onClick={toggleFavorite} color={isFavorite ? 'starred' : 'transparent'}>
            <Icon type={'star'} color={isFavorite ? 'white' : 'black50'} width={16} height={16}/>
            <DesktopStyledText color={isFavorite ? 'inherit' : 'black50'} padding={'0 0 0 6px'}>{isFavorite ? <T ucFirst>doctor.header.button.in-favorite</T> : <T ucFirst>doctor.header.button.add-favorite</T>}</DesktopStyledText>
            <MobileStyledText color={isFavorite ? 'inherit' : 'black50'} padding={'0 0 0 6px'}>{isFavorite ? <T ucFirst>doctor.header.button.in-favorite</T> : <T ucFirst>doctor.header.button.in-favorite-mob</T>}</MobileStyledText>
          </DoctorButton>
          <DoctorButton color={'transparent'} onClick={toggleShare}>
            <Icon type={'share_doctor'} color={'black50'} width={16} height={16}/>
            <Text color={'black50'} padding={'0 0 0 6px'}>{translator('doctor.header.button.share', true)}</Text>
          </DoctorButton>
        </Wrapper>
        <StyledWrapper margin={'32px 0 0'}>{HEADER_ROUTES.map(renderMenuLink)}</StyledWrapper>
      </Container>
    </Well>
  )
}