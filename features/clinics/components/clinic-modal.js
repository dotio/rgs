import React, {useMemo, useState} from 'react'
import ReactDOMServer from 'react-dom/server'
import {useSelector, useDispatch} from 'react-redux'
import styled from 'styled-components'
import {Map, Placemark, YMaps} from 'react-yandex-maps'
import {Text} from '../../../ui/text'
import {Wrapper} from '../../../ui/wrapper'
import {Button} from '../../../ui/button'
import {Container} from '../../../ui/grid/container'
import {ModalTemplate} from '../../../templates/modal'
import {T} from '../../../utils/translation'
import {getRandomIntInclusive} from '../../../ui/helpers/getRandomIntInclusive'
import {TitleText} from '../../../ui/title-text'
import {media} from '../../../helpers/media'
import {Avatar} from '../../../ui/avatar'
import {Circle} from '../../../ui/circle'
import {Icon} from '../../../ui/icon'
import {getColor} from '../../../ui/helpers/getColor'

const StyledMap = styled(Map)`
  width: ${p => p.width};
  height: ${p => p.height};
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  overflow: hidden;
  border-radius: 20px;
  margin: 24px 0;
   ${media.mobile`
      width: 100%;
      height: 200px;
      margin: 24px 0 20px;
  `}
`

const ContentBlock = styled(Wrapper)`
    ${media.mobile`
      max-width: 303px;
      flex-direction: column;
  `}
`

const StyledText = styled(Text)`
    ${media.mobile`
      text-align: left;
      padding: 4px 0 0 75px;
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
  right: -4px;
  top: -4px;
`

const renderedStaticIcon = ReactDOMServer.renderToStaticMarkup(
  <IconWrapper>
    <Icon height={10} width={10} type={'star'} color={'white'}/>
  </IconWrapper>
)

export const ClinicModal = ({current}) => {
  const dispatch = useDispatch()
  const {id, name, address, logo, rating, latitude, longitude, metro, isFavorite} = useSelector((state) => state.clinics.currentClinic)
  const memoizedRandom = useMemo(() => getRandomIntInclusive(1,5), [id])
  const [iconTemplate, setIconTemplate] = useState(null)

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

  const showOtherClinics = () => {
    dispatch.modal.deleteAllModals()
    current.goToOtherMap && current.goToOtherMap()
  }

  return (
    <ModalTemplate>
      <Container>
        <TitleText padding={'0 0 16px'}><T ucFirst>clinic.modal.title</T></TitleText>
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
          {rating && <StyledText
            size={'24px'}
            lineHeight={'28px'}
            color={'primary'}
            align={'right'}
            width={'auto'}
            decoration={'underline'}
          >
            {rating}
          </StyledText>}
        </ContentBlock>
        <YMaps>
          <StyledMap
            onLoad={onMapLoad}
            width={'100%'}
            height={'380px'}
            defaultState={{center: [+latitude, +longitude], zoom: 15}}
            modules={['templateLayoutFactory']}
          >
            <Placemark
              {...placemarks}
            />
          </StyledMap>
        </YMaps>
        <Button onClick={showOtherClinics} color={'black05'}><T ucFirst>clinic.modal.button</T></Button>
      </Container>
    </ModalTemplate>
  )
}