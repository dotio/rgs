import React, {useRef, useState} from 'react'
import ReactDOMServer from 'react-dom/server'
import styled from 'styled-components'
import {Wrapper} from '../../ui/wrapper'
import {Map, YMaps, ObjectManager} from 'react-yandex-maps'
import {useSelector, useDispatch} from 'react-redux'
import {Icon} from '../../ui/icon'
import {Circle} from '../../ui/circle'
import {flatten} from 'ramda'
import {media} from '../../helpers/media'
import {getColor} from '../../ui/helpers/getColor'

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
  ${p => media.mobile(p.mobileheight && `height: ${p.mobileheight}`)}
`

const clusterContainerStyle = `
  margin-top: -24px;
  margin-left: -24px;
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

export const DoctorsMap = React.memo(({doctors, height, mobileheight, coords}) => {
  const dispatch = useDispatch()
  const mapContainer = useRef(null)
  const doctorFilters = useSelector(state => state.doctors.filters)
  const [iconTemplate, setIconTemplate] = useState(null)
  const [clusterIconTemplate, setClusterIconTemplate] = useState(null)
  const loading = useSelector(state => state.router.isLoading)

  const clinics = flatten(doctors.filter(doctor => doctor.clinics).map(
    doctor => (doctor.clinics.map(
      clinic => ({
        clinic,
        doctor,
      })
    ))
  ))

  const data = clinics.map(({clinic, doctor}) => {
    return {
      type: 'Feature',
      id: clinic.id,
      href: doctor.photo ? doctor.photo : '/static/doctor/map_doctor.svg',
      geometry: {
        type: 'Point',
        coordinates: [+clinic.lat, +clinic.lon]
      },
      properties: {
        id: clinic.id,
        doctorId: doctor.id,
        href: doctor.photo ? doctor.photo : '/static/doctor/map_doctor.svg',
        isNoPhoto: !doctor.photo,
        isFavorite: doctor.isFavorite,
      },
      options: {
        pane: 'overlaps',
        iconLayout: iconTemplate
      }
    }})

  const onMapLoad = async (ymaps) => {
    if (ymaps && !iconTemplate) {
      const iconTemplateClass = ymaps.templateLayoutFactory.createClass(
        `<div style="position: relative; width: 40px; height: 40px; top: -20px; left: -20px;">
          <div style="
            border-radius: 50%;
            width: 36px;
            height: 36px;
            min-height: 36px;
            flex-shrink: 0;
            flex-grow: 0;
            background-image: url('$[properties.href]');
            background-size: 36px auto;
            background-position: top center;
            background-repeat: no-repeat;
            border: 2px solid #fff;
          " />
          {% if (properties.isFavorite) %} ${renderedStaticIcon} {% endif %}
        </div>        `
      )
      setIconTemplate(() => iconTemplateClass)
      const clusterIconTemplateClass = ymaps.templateLayoutFactory.createClass(
        `<div style="${clusterContainerStyle}">
          <div style="${clusterContentStyle}">{{properties.geoObjects.length}}</div>
        </div>`
      )
      setClusterIconTemplate(() => clusterIconTemplateClass)
    }
  }

  const onDoctorClick = (e) => {
    const properties = e._sourceEvent._sourceEvent.originalEvent.overlay._data.properties

    if(properties && properties.doctorId) {
      dispatch.modal.addAndShowModal({type: 'doctor-info-short', data: {id: properties.doctorId}})
      return
    }

    const features = e._sourceEvent._sourceEvent.originalEvent.overlay._data.features

    if(features && features.length > 0) {
      const someLength = features.filter(item => item.id === features[0].id).length
      if(someLength === features.length) {
        dispatch.modal.addAndShowModal({type: 'doctor-cluster-info', filters: doctorFilters, clinicId: features[0].id, limit: someLength})
      }
    }
  }

  return (
    !loading && <MapWrapper ref={mapContainer}>
      <YMaps>
        <StyledMap
          onLoad={onMapLoad}
          width={'100%'}
          height={height}
          mobileheight={mobileheight}
          defaultState={{center: coords ? coords : [55.75, 37.57], zoom: 10}}
          modules={['templateLayoutFactory', 'geolocation', 'geocode']}
        >
          <ObjectManager
            options={{
              clusterize: true,
              gridSize: 40,
            }}
            objects={{
              iconLayout: 'default#image',
              openBalloonOnClick: true,
              balloonContentLayout: iconTemplate,
              balloonPanelMaxMapArea: 0,
              hideIconOnBalloonOpen: false,
            }}
            clusters={{
              clusterIconLayout: clusterIconTemplate,
              clusterIconShape: {
                type: 'Circle',
                coordinates: [0, 0],
                radius: 24
              },
            }}
            defaultFeatures={data}
            onClick={onDoctorClick}
          />
        </StyledMap>
      </YMaps>
    </MapWrapper>
  )
})