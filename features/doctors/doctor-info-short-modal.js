import React, {useMemo, useState} from 'react'
import {ModalTemplate} from '../../templates/modal'
import {Container} from '../../ui/grid/container'
import {asyncModal} from '../../helpers/hocs/asyncModal'
import {requestApi} from '../../lib/api'
import {Wrapper} from '../../ui/wrapper'
import {Text} from '../../ui/text'
import {Gap} from '../../ui/gap'
import {Map, Placemark, YMaps} from 'react-yandex-maps'
import styled from 'styled-components'
import {media} from '../../helpers/media'
import {MediumText} from '../../ui/medium-text'
import {getRandomIntInclusive} from '../../ui/helpers/getRandomIntInclusive'
import {Icon} from '../../ui/icon'
import {Divider} from '../../ui/divider'
import {Button} from '../../ui/button'
import {Router} from '../../routes'
import {T} from '../../utils/translation'
import {Avatar} from '../../ui/avatar'
import {Circle} from '../../ui/circle'
import {getColor} from '../../ui/helpers/getColor'
import ReactDOMServer from 'react-dom/server'
import {useDispatch} from 'react-redux'

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

const SmallAvatar = styled(Avatar)`
  ${media.mobile`
    width: 24px;
    height: 24px;
    min-height: 24px
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

const DoctorInfoShortModalComp = ({ data }) => {
  const dispatch = useDispatch()
  const {id, name, surname, middlename, specializations, priceCategory, photo, gender, rating, clinics} = data
  const memoizedRandom = useMemo(() => getRandomIntInclusive(1,5), [id])
  const centerMap = clinics && clinics.length ? [+clinics[0].latitude, +clinics[0].longitude] : [55.75, 37.57]
  const [showPriceCategory, setShowPrice] = useState(false)
  const prices = priceCategory ? [...new Array(Math.max(priceCategory.id, 4)).keys()] : []
  const [iconTemplate, setIconTemplate] = useState(null)

  const onClickMoreInfo = () => {
    dispatch.router.toggleBottomTemplate(true)
    dispatch.doctors.setForMap(false)
    Router.pushRoute(`/doctor/${id}`)
  }

  const placemarks = clinics.map(clinic => (
    {
      geometry: [+clinic.latitude, +clinic.longitude],
      properties: {
        href: clinic.logo ? clinic.logo : `/static/mocks/clinic${memoizedRandom}.svg`,
        isNoPhoto: !clinic.logo,
        doctorId: clinic.id,
        isFavorite: clinic.isFavorite,
      },
      options: {
        iconLayout: iconTemplate,
        iconImageSize: [40, 40],
        iconImageOffset: [-5, -38],
      }
    }
  ))

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
              src={photo ? photo : `/static/doctor/${gender}_doctor.svg`}
              height={'80px'}
              minHeight={'80px'}
              width={'80px'}
              fromList
            />
            <Wrapper padding={'0 0 0 16px'} flow={'column'}>
              {surname && name && middlename && <Text>{surname} {name} {middlename}</Text>}
              {specializations && specializations.map(specialization => <Text color={'black50'} key={specialization.id}>{specialization.title}</Text>) }
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
                defaultState={{center: centerMap, zoom: 15}}
                modules={['templateLayoutFactory']}
              >
                {placemarks.map((placemarkParams, index) =>
                  <Placemark
                    key={index}
                    {...placemarkParams}
                  />
                )}
              </StyledMap>
            </YMaps>
          </MapWrapper>
          {clinics && clinics.map(clinic => <ItemsWrapper key={clinic.id}>
            <MediumText width={'232px'} color={'black50'}><T ucFirst>doctor.info-short.clinic.title</T></MediumText>
            <Wrapper>
              <SmallAvatar
                src={clinic.logo ? clinic.logo : `/static/mocks/clinic${memoizedRandom}.svg`}
                height={'24px'}
                minHeight={'24px'}
                width={'24px'}
                borderRadius={'4px'}
              />
              <Wrapper padding={'0 0 0 8px'} flow={'column'}>
                {clinic.name && <Text>{clinic.name}</Text>}
                {clinic.address && <Text color={'black50'}>{clinic.address}</Text>}
                {clinic.metro && clinic.metro.map(item => <Text key={item.id} color={item.color}>{`м. ${item.name}`}</Text>)}
              </Wrapper>
            </Wrapper>
          </ItemsWrapper>)}

          {priceCategory && <ItemsWrapper>
            <MediumText color={'black50'} width={'232px'}><T ucFirst>doctor.info-short.price.title</T></MediumText>
            <Wrapper flow={'column'}>
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
        <Button color={'primary'} onClick={onClickMoreInfo}><T ucFirst>doctor.info-short.button</T></Button>
      </Container>
    </ModalTemplate>
  )
}

export const DoctorInfoShortModal = asyncModal(
  DoctorInfoShortModalComp,
  ({ current }) => {
    return requestApi('get', `/doctor/${current.data.id}`)
  }
)
