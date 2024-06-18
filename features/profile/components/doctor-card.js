import {Col} from '../../../ui/grid/col'
import {Text} from '../../../ui/text'
import {Card} from './card'
import {Br} from '../../../ui/br'
import {Link} from '../../../routes'
import {Button} from '../../../ui/button'
import {Row} from '../../../ui/grid/row'
import React, {useMemo} from 'react'
import styled from 'styled-components'
import {media} from '../../../helpers/media'
import moment from 'moment'
import {TitleText} from '../../../ui/title-text'
import {Wrapper} from '../../../ui/wrapper'
import {getRandomIntInclusive} from '../../../ui/helpers/getRandomIntInclusive'
import {useDispatch} from 'react-redux'
import {T} from '../../../utils/translation'

const NotificationText = styled(TitleText)`
  ${media.mobile`
    text-align: left;
  `}
`

const DesktopMetro = styled(Text)`
  ${media.mobile`
    display: none
  `}
`

const MobileMetro = styled(Text)`
  display: none;
  ${media.mobile`
    display: inline;
  `}
`

const MobileMetroDistance = styled(Text)`
  display: none;
  ${media.mobile`
    display: block;
  `}
`

const getColsProps = (isWidget) => {
  if(isWidget) {
    return [
      {cols: 12, order: 2},
      {cols: 12, order: 1},
      {cols: 12, order: 3},
      {cols: 12, order: 4},
      {cols: 12, order: 5}
    ]
  } else {
    return [
      {cols: 6, paddingBottom: '16px'},
      {cols: 6, paddingBottom: '16px'},
      {cols: 6, paddingBottom: '16px'},
      {cols: 6, paddingBottom: '16px'},
      {cols: 12}
    ]
  }
}

const NonClickableCard = styled('div')`
  pointer-events: none;
`

export const DoctorCard = ({id, notification, date, specialization, doctor, clinic, isWidget, alignNotification, showButton, serviceType, address}) => {
  const dateObj = moment(date)
  const [firstCol, secondCol, thirdCol, fourthCol, fifthCol] = getColsProps(isWidget)
  const memoizedRandom = useMemo(() => getRandomIntInclusive(1,5), [id])
  const dispatch = useDispatch()

  const onClickClinic = (e) => {
    e.stopPropagation()
    dispatch.modal.addAndShowModal({type: 'clinic-info-modal', data: {id: clinic.id}})
  }

  const onDoctorClick = (e) => {
    e.stopPropagation()
    dispatch.modal.addAndShowModal({type: 'doctor-info-short', data: {id: doctor.id}})
  }

  return (
    <Row>
      <Col lg={firstCol} sm={{cols: 12, order: 2, paddingBottom: '28px'}}>
        <TitleText>{dateObj.format('D MMMM')}</TitleText>
        <TitleText color={'black50'}>{specialization.title} в {dateObj.format('HH:mm')}</TitleText>
      </Col>
      <Col lg={secondCol} sm={{cols: 12, order: 1, paddingBottom: '0'}}>
        {notification && <NotificationText color={'secondary'} align={alignNotification}>{notification.message}</NotificationText>}
      </Col>
      <Col lg={thirdCol} sm={{cols: 12, order: 3, paddingBottom: '16px'}}>
        <Card src={doctor.photo ? doctor.photo : `/static/doctor/${doctor.gender}_doctor.svg`} onClick={onDoctorClick} isDoctor>
          <Text>{doctor.surname} {doctor.name}<Br mobile={false}/> {doctor.middlename}</Text>
          <Text color={'black50'}>{specialization.title}</Text>
        </Card>
      </Col>
      <Col lg={fourthCol} sm={{cols: 12, order: 4}}>

        {serviceType.code === 'booking' && <Card cursor={'pointer'} src={clinic.logo ? clinic.logo : `/static/mocks/clinic${memoizedRandom}.svg`} onClick={onClickClinic} borderRadius={'16px'}>
          <Text>{clinic.name}</Text>
          <Text color={'black50'}>{clinic.address}</Text>
          {clinic.metro && clinic.metro.map(item => <DesktopMetro key={item.id} color={item.color}>{`м. ${item.name} `}</DesktopMetro>)}
          {clinic.metro && clinic.metro.map(item => <MobileMetroDistance key={item.id} color={'black50'}>
            &#8594; {item.distance} от
            <MobileMetro color={item.color}>{` м. ${item.name} `}</MobileMetro>
          </MobileMetroDistance>)}
        </Card>}

        {serviceType.code === 'home' && <NonClickableCard>
          <Card src='/static/icons/search_home.svg' border={'1px solid #D9D9D9'} borderRadius={'16px'}>
            <Text>{serviceType.title}</Text>
            <Text color={'black50'}>{address}</Text>
          </Card>
        </NonClickableCard>}

        {serviceType.code === 'telemed' && <NonClickableCard>
          <Card src='/static/mocks/product-consultations-online.svg' border={'1px solid #D9D9D9'} borderRadius={'16px'}>
            <Text>{serviceType.title}</Text>
            <Text color={'black50'}>{serviceType.description}</Text>
          </Card>
        </NonClickableCard>}

      </Col>
      {showButton && <Col lg={fifthCol} sm={{cols: 12, order: 5}}>
        <Link route={`/profile/medcard/order/${id}`} passHref>
          <Wrapper padding={'4px 0 0'} mobilePadding={'0'}><Button as={'a'} color={'black05'}><T ucFirst>order.main.more.button</T></Button></Wrapper>
        </Link>
      </Col>}
    </Row>
  )
}

DoctorCard.defaultProps = {
  alignNotification: 'right',
  showButton: true
}