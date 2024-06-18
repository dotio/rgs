import React, {useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled, {css} from 'styled-components'
import {Wrapper} from '../../ui/wrapper'
import {Clusterer, Map, Placemark, YMaps} from 'react-yandex-maps'
import {media} from '../../helpers/media'
import {Circle} from '../../ui/circle'
import {getColor} from '../../ui/helpers/getColor'
import ReactDOMServer from 'react-dom/server'
import {Icon} from '../../ui/icon'

const MapWrapper = styled(Wrapper)`
  position: relative;
  overflow: hidden;
  border-radius: 20px;
`

const StyledMap = styled(Map)`
  width: ${p => p.width};
  height: ${p => p.height};
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  overflow: hidden;
  border-radius: 20px;
  ${p => media.mobile(p.mobileheight && css`
    height: ${p.mobileheight}
  `)}
`

const clusterContainerStyle = `
  margin-top: -20px;
  margin-left: -20px;
  width: 48px;
  height: 48px;
  padding: 4px;
  background: linear-gradient(147.74deg, #40B2C9 13.44%, #55DF94 85.6%);
  border-radius: 50%;
`
const clusterContentStyle = `
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: white;
  font-size: 16px;
  line-height: 24px;
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

export const ClinicsMap = React.memo(({clinics, height, mobileheight, coords, isClinicMapDoctors}) => {
  const dispatch = useDispatch()
  const mapContainer = useRef(null)
  const loading = useSelector(state => state.router.isLoading)
  const clinicFilters = useSelector(state => state.clinics.filters)
  const [iconTemplate, setIconTemplate] = useState(null)
  const [clusterIconTemplate, setClusterIconTemplate] = useState(null)

  const placemarks = clinics.map(clinic => ({
    geometry: [+clinic.latitude, +clinic.longitude],
    properties: {
      clinic,
      clinicId: clinic.id,
      href:  clinic.logo ? clinic.logo : '/static/mocks/clinic_map.svg',
      isNoPhoto: !clinic.logo,
      isFavorite: clinic.isFavorite,
    },
    options: {
      iconLayout: iconTemplate,
      iconShape: {
        type: 'Circle',
        coordinates: [0, 0],
        radius: 24
      },
    }
  }))

  const onMapLoad = (ymaps) => {
    if (ymaps && !iconTemplate) {
      const iconTemplateClass = ymaps.templateLayoutFactory.createClass(
        `<div style="position: relative; width: 40px; height: 40px; top: -20px; left: -20px;">
          <div style="
            border-radius: 4px;
            width: 36px;
            height: 36px;
            min-height: 36px;
            flex-shrink: 0;
            flex-grow: 0;
            background-image: url('$[properties.href]');
            background-size: 40px auto;
            background-position: center center;
            background-repeat: no-repeat;
            border: 2px solid #fff;
          " />
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
      const clusterIconTemplateClass = ymaps.templateLayoutFactory.createClass(
        `<div style="${clusterContainerStyle}">
          <div style="${clusterContentStyle}">{{properties.geoObjects.length}}</div>
        </div>`, {
          build: function () {
            clusterIconTemplateClass.superclass.build.call(this)
            if (!this.inited) {
              this.inited = true
              this.getData().geoObject.events.add('mouseenter', function (e) {
                e.get('target').properties.set('hover', true)
              }, this)
              this.getData().geoObject.events.add('mouseleave', function (e) {
                e.get('target').properties.set('hover', false)
              }, this)
            }
          }
        }
      )
      setClusterIconTemplate(() => clusterIconTemplateClass)
    }
  }


  const onClickClinic = (e) => {
    e.stopPropagation()
    const currentClinicId = e.get('target')['properties'].get('clinicId')
    dispatch.modal.addAndShowModal({type: 'clinic-info-modal', data: {id: currentClinicId}})
  }

  const onClusterClick = (e) => {
    const geoObjects = e.get('target').getGeoObjects()
    const data = geoObjects.reduce((acc, geoObject) => {
      const clinic = geoObject.properties.get('clinic')
      return {
        ...acc,
        clinics: [...acc.clinics, clinic]
      }
    }, {
      clinics: [],
    })

    const geometry = geoObjects.map(item => item.geometry)
    const coords = geometry.map(item => item._coordinates)
    const equal = (a,b) => {
      for(let i=0; i<a.length; i++){
        if(a[i] !== b[i]){
          return false
        }
      }
      return true
    }

    if (equal(coords[0], coords[1])) {
      // Need new modal
      dispatch.loaders.showLoader()
      dispatch.modal.addAndShowModal({type: 'clinic-cluster-info', data: data.clinics, filters: clinicFilters, limit: 30})
    }
  }

  const coordinates = placemarks.map(item => item.geometry)
  const equalFirstAmount = (a,b) => {
    for(let i=0; i<a.length; i++){

      if(Math.ceil(a[0]) !== Math.ceil(b[0])){
        return false
      }
    }
    return true
  }

  return (
    !loading && <MapWrapper ref={mapContainer}>
      <YMaps>
        <StyledMap
          onLoad={onMapLoad}
          width={'100%'}
          height={height}
          mobileheight={mobileheight ? mobileheight : 'auto'}
          defaultState={{center: coords ? coords : [55.75, 37.57], zoom: isClinicMapDoctors && placemarks.length > 1 && !equalFirstAmount(coordinates[0], coordinates[1]) ? 2 : 9}}
          modules={['templateLayoutFactory']}
        >
          <Clusterer
            options={{
              clusterIconLayout: clusterIconTemplate,
              clusterIconShape: {
                type: 'Circle',
                coordinates: [0, 0],
                radius: 24
              },
            }}
            onClick={onClusterClick}
          >
            {iconTemplate && clusterIconTemplate && placemarks.map((placemarkParams, i) =>
              <Placemark
                onClick={onClickClinic}
                key={i}
                {...placemarkParams}
              />
            )}
          </Clusterer>
        </StyledMap>
      </YMaps>
    </MapWrapper>
  )
})