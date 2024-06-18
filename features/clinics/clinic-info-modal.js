import {ModalTemplate} from '../../templates/modal'
import React, {useState, useMemo} from 'react'
import styled from 'styled-components'
import {Container} from '../../ui/grid/container'
import {Map, Placemark, YMaps} from 'react-yandex-maps'
import {Wrapper} from '../../ui/wrapper'
import {Text} from '../../ui/text'
import {Icon} from '../../ui/icon'
import {Divider} from '../../ui/divider'
import {Button} from '../../ui/button'
import {asyncModal} from '../../helpers/hocs/asyncModal'
import {ClinicsRepository} from './repository'
import {media} from '../../helpers/media'
import {getRandomIntInclusive} from '../../ui/helpers/getRandomIntInclusive'
import {Gap} from '../../ui/gap'
import {MediumText} from '../../ui/medium-text'
import {Router} from '../../routes'
import {T} from '../../utils/translation'
import {Avatar} from '../../ui/avatar'
import {Circle} from '../../ui/circle'
import {getColor} from '../../ui/helpers/getColor'
import ReactDOMServer from 'react-dom/server'
import {useSelector, useDispatch} from 'react-redux'

const MapWrapper = styled(Wrapper)`
  position: relative;
  border-radius: 20px;
  margin-top: 24px;
   ${media.mobile`
    height: 200px;
  `}
`

const StyledMap = styled(Map)`
  width: ${p => p.width};
  height: ${p => p.height};
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  overflow: hidden;
  border-radius: 20px;
   ${media.mobile`
      width: 100%;
      height: 200px;
  `}
`

const ContentBlock = styled(Wrapper)`
    ${media.mobile`
      max-width: 303px;
      flex-direction: column;
  `}
`

const RatingText = styled(Text)`
    ${media.mobile`
      text-align: left;
      padding: 4px 0 0 75px;
  `}
`

const ItemsWrapper = styled(Wrapper)`
    ${media.mobile`
      flex-direction: column;
  `}
`

const IconWrapper = styled(Circle)`
display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 14px;
  height: 14px;
  background-color: ${p => getColor('starred', p.theme)};
  border-radius: 20px;
  right: 0;
  
  ${media.mobile`
    top: -5px;
  `}
`

const renderedStaticIcon = ReactDOMServer.renderToStaticMarkup(
  <IconWrapper>
    <Icon height={10} width={10} type={'star'} color={'white'}/>
  </IconWrapper>
)

export const ClinicInfoModalComp = ({data}) => {
  const dispatch = useDispatch()
  const {id, logo, name, address, metro, rating, latitude, longitude, schedule, phones, priceCategory, isFavorite} = data
  const [showSchedule, setShowSchedule] = useState(false)
  const [showPriceCategory, setShowPrice] = useState(false)
  const prices = priceCategory ? [...new Array(Math.max(priceCategory.id, 4)).keys()] : []
  const memoizedRandom = useMemo(() => getRandomIntInclusive(1,5), [id])
  const [iconTemplate, setIconTemplate] = useState(null)
  const cityId = useSelector(state => state.doctors.filters.cityIdDF)
  const params = cityId ? {cityIdCF: cityId} : {}

  const placemarks =
    {
      geometry: [+latitude, +longitude],
      properties: {
        href: logo ? logo : `/static/mocks/clinic${memoizedRandom}.svg`,
        isNoPhoto: !logo,
        id,
        isFavorite,
      },
      options: {
        iconLayout: iconTemplate,
        iconImageSize: [40, 40],
        iconImageOffset: [-5, -38],
      }
    }

  const onMapLoad = (ymaps) => {
    if (ymaps && !iconTemplate) {
      const iconTemplateClass = ymaps.templateLayoutFactory.createClass(
        `<div style="position: relative; width: 40px; height: 40px;">
          <div style="
            border-radius: 4px;
            width: 40px;
            height: 40px;
            min-height: 40px;
            flex-shrink: 0;
            flex-grow: 0;
            background-image: url('$[properties.href]');
            background-size: 40px auto;
            background-position: top center;
            background-repeat: no-repeat;
          "
          />
          {% if (properties.isFavorite) %} ${renderedStaticIcon} {% endif %}
        </div>
        `, {
          build: function() {
            iconTemplateClass.superclass.build.call(this)
            if (!this.inited) {
              this.inited = true

              this.getData().geoObject.events.add('mouseenter', (e) => {
                e.get('target').properties.set('hover', true)
              })
              this.getData().geoObject.events.add('mouseleave', (e) => {
                e.get('target').properties.set('hover', false)
              })
            }
          }
        }
      )
      setIconTemplate(() => iconTemplateClass)
    }
  }

  return (
    <ModalTemplate>
      <Container>
        <ContentBlock justify={'space-between'}>
          <Wrapper>
            <Avatar
              src={logo ? logo : `/static/mocks/clinic${memoizedRandom}.svg`}
              height={'80px'}
              minHeight={'80px'}
              width={'80px'}
              borderRadius={'16px'}
              fromList
            />
            <Wrapper padding={'0 0 0 16px'} flow={'column'}>
              {name && <Text>{name}</Text>}
              {address && <Text color={'black50'} >{address}</Text>}
              {metro && metro.map(item => <Text key={item.id} color={item.color}>{`м. ${item.name}`}</Text>)}
            </Wrapper>
          </Wrapper>
          {rating && <RatingText
            size={'24px'}
            lineHeight={'28px'}
            color={'primary'}
            align={'right'}
            width={'auto'}
            decoration={'underline'}
          >
            {rating}
          </RatingText>}
        </ContentBlock>
        <Gap gap={'24px'}>
          <MapWrapper>
            <YMaps>
              <StyledMap
                onLoad={onMapLoad}
                width={'100%'}
                height={'240px'}
                defaultState={{center: [+latitude, +longitude], zoom: 15}}
                modules={['templateLayoutFactory']}
              >
                <Placemark
                  {...placemarks}
                />
              </StyledMap>
            </YMaps>
          </MapWrapper>
          {schedule && <ItemsWrapper>
            <MediumText width={'232px'} padding={'0 10px 0 0'} color={'black50'}><T ucFirst>clinic.info-modal.schedule</T></MediumText>
            <Wrapper  width={'auto'} flow={'column'}>
              <Wrapper  align={'center'}>
                <MediumText width={'auto'} padding={'0 6px 0 0'}>{schedule.title}</MediumText>
                <Icon
                  width={24}
                  height={24}
                  shrink={'0'}
                  cursor={'pointer'}
                  onClick={() => setShowSchedule(!showSchedule)}
                  type={'info'}
                  color={showSchedule ? 'black' : 'black40'}
                />
              </Wrapper>
              {showSchedule && schedule.ranges && <Wrapper padding={'8px 0 0'} flow={'column'}>
                {schedule && schedule.ranges.map(({title, timeRange}, index) => (
                  <MediumText width={'auto'} color={'black'} key={index}>{`${title}: ${timeRange}`}</MediumText>
                ))}
              </Wrapper>}
            </Wrapper>
          </ItemsWrapper>}

          {phones && phones.map((item, index) => <ItemsWrapper key={index}>
            <MediumText width={'232px'} padding={'0 10px 0 0'} color={'black50'}>{item.title}</MediumText>
            <Wrapper  width={'auto'}><MediumText width={'auto'}>{item.value}</MediumText></Wrapper>
          </ItemsWrapper>)}

          {priceCategory && <ItemsWrapper>
            <MediumText width={'232px'} padding={'0 10px 0 0'} color={'black50'}><T ucFirst>clinic.info-modal.price</T></MediumText>
            <Wrapper flow={'column'} width={'auto'}>
              <Wrapper margin={{bottom: '6px'}} align={'center'}>
                {prices.map((item, index) => {
                  const isColored = priceCategory.id - index  > 0
                  return (
                    <MediumText key={index} color={isColored ? 'black' : 'black50'} width={'auto'}>₽</MediumText>
                  )
                })}
                <MediumText padding={'0 6px'} width={'auto'}>{priceCategory.name}</MediumText>
                {priceCategory.description !== '' && <Icon
                  width={24}
                  height={24}
                  shrink={'0'}
                  cursor={'pointer'}
                  onClick={() => setShowPrice(!showPriceCategory)}
                  type={'info'}
                  color={'black40'}
                />}
              </Wrapper>
              {showPriceCategory && priceCategory.description &&(
                <MediumText padding={'0 6px 0 0'} width={'auto'}>{priceCategory.description}</MediumText>
              )}
            </Wrapper>
          </ItemsWrapper>}
        </Gap>
        <Divider margin={'24px 0'} smMargin={'24px 0 20px 0'}/>
        <Button color={'primary'} onClick={() => {
          dispatch.clinics.setForMap(false)
          Router.pushRoute('clinics/one', {...params, clinicId: id})
        }}><T ucFirst>clinic.info-modal.button</T></Button>
      </Container>
    </ModalTemplate>
  )
}

export const ClinicInfoModal = asyncModal(
  ClinicInfoModalComp,
  ({current}) => {
    return ClinicsRepository.getClinic(current.data.id)
  }
)