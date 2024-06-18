import React, {useState, useMemo, useEffect} from 'react'
import styled, {css} from 'styled-components'
import {Link} from 'react-scroll'
import {Button} from '../../../ui/button'
import {Icon} from '../../../ui/icon'
import {Row} from '../../../ui/grid/row'
import {Container} from '../../../ui/grid/container'
import {Col} from '../../../ui/grid/col'
import {Text} from '../../../ui/text'
import {Wrapper} from '../../../ui/wrapper'
import {CircleButton} from '../../../ui/circle-button'
import {Router} from '../../../routes'
import {getColor} from '../../../ui/helpers/getColor'
import {useDispatch, useSelector} from 'react-redux'
import {Well} from '../../../ui/well'
import {FavoriteRepository} from '../../profile/repository/favorite'
import {T} from '../../../utils/translation'
import {TitleText} from '../../../ui/title-text'
import {HeaderRatingBlock} from '../../doctors/new-rating-block-doctor'
import {media} from '../../../helpers/media'
import {getRandomIntInclusive} from '../../../ui/helpers/getRandomIntInclusive'
import {redirectNotAuth} from '../../../lib/redirect'
import {Avatar} from '../../../ui/avatar'

const ClinicButton = styled(Button)`
  display: flex;
  align-items: center;
`

const StyledWrapper = styled(Wrapper)`
  overflow-x: auto;
  overflow-y: hidden;
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

const MenuLink = styled.div`
  white-space: nowrap;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  color: ${p => getColor('black50', p.theme)};
  margin-right: 20px;
  position: relative;
  display: block;
  height: 100%;
  padding-bottom: 9px;

  ${p => p.active && css`
    color: ${p => getColor('primary', p.theme)};
    border-bottom: 1px solid ${p => getColor('primary', p.theme)};
  `}
`

const HEADER_MENU = [
  // {
  //   name: 'clinic.header.menu.sign',
  //   link: 'clinic-order',
  // },
  {
    name: 'clinic.header.menu.about',
    link: 'clinic-about',
  },
  {
    name: 'clinic.header.menu.diagnostic',
    link: 'clinic-diagnostics',
    field: 'clinicDiagnostics'
  },
  {
    name: 'clinic.header.menu.doctors',
    link: 'clinic-doctors',
    field: 'clinicDoctors',
  },
  {
    name: 'clinic.header.menu.gallery',
    link: 'clinic-gallery',
    field: 'images'
  },
  // {
  //   name: 'clinic.header.menu.clinics',
  //   link: 'other-clinics'
  // },
]

const StyledAvatar = styled(Avatar)`
  cursor: default;
  ${media.mobile`
    width: 110px;
    height: 110px;
    min-height: 110px
  `}
`

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

export const ClinicOneHeader = () => {
  const dispatch = useDispatch()
  const doctors = useSelector((state) => state.doctors.list)
  const doctorTotal = useSelector((state) => state.doctors.total)
  const clinic = useSelector((state) => state.clinics.currentClinic)
  const clinicDiagnostics = useSelector((state) => state.clinics.clinicDiagnostics.length)
  const clinicCityFilter = useSelector(state => state.clinics.filters.cityIdCF)
  const loggedIn = useSelector(state => state.login.loggedIn)
  const [isFavorite, setIsFavorite] = useState(clinic.isFavorite)
  const [loading, setLoading] = useState(false)
  const [activeLink, setActiveLink] = useState(HEADER_MENU[0].link)
  const {name, subtitle, logo, rating, images} = clinic
  const memoizedRandom = useMemo(() => getRandomIntInclusive(1,5), [clinic.id])

  const getMenu = () => {
    return HEADER_MENU.filter(item => item.field
      ? (
        item.field === 'clinicDiagnostics' && clinicDiagnostics > 0
        || item.field === 'images' && images && images.length > 0
        || item.field === 'clinicDoctors' && doctors.length > 0
      ) : true)
  }

  const toggleFavorite = async () => {
    if (!loggedIn) {
      redirectNotAuth({asPath: 'login'})
    } else {
      const fn = isFavorite ? FavoriteRepository.removeFavorite : FavoriteRepository.addFavorite
      setLoading(true)
      try {
        await fn('clinic', clinic.id)
        dispatch.clinics.changeFavoriteStatus(!isFavorite)
        setIsFavorite(!isFavorite)
      } finally {
        setLoading(false)
      }
    }
  }

  const toggleShare = async () => {
    await dispatch.modal.addAndShowModal({type: 'share-clinic-modal'})
  }

  const getDoctorTotal = async () => {
    for(let i = 1; i <= Math.floor(doctorTotal/50); i++) {
      await dispatch.doctors.loadMoreDoctors({limit: 50})
    }
  }

  useEffect(() => {
    getDoctorTotal()
  }, [])

  useEffect(() => {
    setIsFavorite(clinic.isFavorite)
  }, [clinic.isFavorite])

  const backFilters = clinicCityFilter ? {
    cityIdCF: clinicCityFilter
  } : {}

  return (
    <Well padding={'24px 0 0'} mobilePadding={'20px 0 0'}>
      <Container>
        <TitleText padding={'0 32px 0 0'}>{name}</TitleText>
        <FixedCircleButton icon={'long_arrow_left'} onClick={() => Router.pushRoute('clinics/list', backFilters)} />
        <TitleText color={'black50'} padding={'0 0 24px'}>{subtitle}</TitleText>
        <Row>
          <Wrapper width={'auto'}>
            <Col lg={{cols: 2}} sm={{cols: 2}}>
              <StyledAvatar
                src={logo ? logo : `/static/mocks/clinic${memoizedRandom}.svg`}
                height={'110px'}
                minHeight={'110px'}
                width={'110px'}
                borderRadius={'16px'}
              />
            </Col>
          </Wrapper>
          {rating &&
            <Wrapper width={'auto'}>
              <Col lg={{cols: 2}} sm={{cols: 2}}>
                <HeaderRatingBlock title={'Рейтинг клиники'} ratingValue={parseFloat(rating)} toLink={'clinic-rating'}/>
              </Col>
            </Wrapper>
          }
        </Row>
        <Wrapper align={'center'} padding={'24px 0 0'} gap={'8px'}>
          <ClinicButton showLoader={loading} onClick={toggleFavorite} color={isFavorite ? 'starred' : 'transparent'}>
            <Icon type={'star'} color={isFavorite ? 'white' : 'black50'} width={16} height={16} shrink={'0'}/>
            <DesktopStyledText color={isFavorite ? 'inherit' : 'black50'} padding={'0 0 0 6px'}>{isFavorite ? <T ucFirst>clinic.header.button.in-favorite</T> : <T ucFirst>clinic.header.button.add-favorite</T>}</DesktopStyledText>
            <MobileStyledText color={isFavorite ? 'inherit' : 'black50'} padding={'0 0 0 6px'}>{isFavorite ? <T ucFirst>clinic.header.button.in-favorite</T> : <T ucFirst>clinic.header.button.in-favorite-mob</T>}</MobileStyledText>
          </ClinicButton>
          <ClinicButton color={'transparent'} onClick={toggleShare}>
            <Icon type={'share'} color={'black50'} width={16} height={16} shrink={'0'}/>
            <Text color={'black50'} padding={'0 0 0 6px'}><T ucFirst>clinic.header.button.share</T></Text>
          </ClinicButton>
        </Wrapper>
        <StyledWrapper margin={'32px 0 0'}>
          {getMenu().map((link, index) => (
            <Link to={link.link} key={'link-' + index} smooth offset={-6}>
              <MenuLink onClick={() => setActiveLink(link.link)} active={link.link === activeLink}>
                <T ucFirst>{link.name}</T>
              </MenuLink>
            </Link>
          ))}
        </StyledWrapper>
      </Container>
    </Well>
  )
}