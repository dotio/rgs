import React from 'react'
import styled from 'styled-components'
import {Button} from '../../../../ui/button'
import {TitleText} from '../../../../ui/title-text'
import {MediumText} from '../../../../ui/medium-text'
import {Row} from '../../../../ui/grid/row'
import {Col} from '../../../../ui/grid/col'
import {Wrapper} from '../../../../ui/wrapper'
import {OrderTypeData} from '../components/order-type-data'
import {useSelector} from 'react-redux'
import {getTranslator} from '../../../../utils/translation'
import {Text} from '../../../../ui/text'
import {Link} from '../../../../routes'
import {Container} from '../../../../ui/grid/container'
import moment from 'moment'
import {media} from '../../../../helpers/media'
import {Well} from '../../../../ui/well'

const HeaderWrapper = styled(Wrapper)`
  ${TitleText} {
    width: 50%;
    
    ${media.mobile`
      width: 100%;
    `}
  }

  ${media.mobile`
    flex-direction: column-reverse;
  `}
`

const TitleRightText = styled(TitleText)`
   ${media.mobile`
      text-align: left;
   `}
`

export const OrderInfo = (props) => {
  const {id, type, comment, date, serviceType, timeFrom, specialization, doctor, service, clinic, result} = props
  const translator = useSelector(state => getTranslator(state.localization))
  const orderDate = moment(date)
  const currentTime = moment()

  return (
    <Well>
      <Wrapper flow={'column'}>
        <Container>
          <HeaderWrapper>
            <TitleText color={'black'}>{orderDate.format('DD MMMM')}</TitleText>
            {moment(orderDate).isAfter(currentTime) && serviceType && <TitleRightText align={'right'} color={'secondary'}>{`Скоро ${serviceType.toLowerCase()}`}</TitleRightText>}
          </HeaderWrapper>
          <Wrapper flow={'column'} align={'flex-start'} gap={'16px'}>
            <TitleText color={'black50'}>
              {specialization && (typeof specialization === 'string' ? specialization : specialization.title)}
              {type === 'system' && ` в ${timeFrom}`}
            </TitleText>
            {(doctor  || clinic || service) && <Row>
              {doctor && <Col lg={{cols: 6, paddingBottom: '24px'}} sm={{cols: 12, paddingBottom: '16px'}}>
                <OrderTypeData type={'doctor'} img={doctor.photo ? doctor.photo : '/static/avatars/doctor_empty_big.svg'}>
                  <Text>{doctor.surname && doctor.surname} {doctor.name && doctor.name} {doctor.middlename && doctor.middlename}</Text>
                  <Text transform={'capitalize'} color={'black50'}>
                    {doctor.specializations.map(spec => spec.title.toLowerCase()).join(', ')}
                  </Text>
                </OrderTypeData>
              </Col>}
              {clinic && <Col lg={{cols: 6}} sm={{cols: 12, paddingBottom: '16px'}}>
                <OrderTypeData type={'clinic'} img={clinic.logo} uniqueId={id}>
                  <Text>{clinic.name}</Text>
                  <Text color={'black50'}>{clinic.address}</Text>
                  {clinic.metro && clinic.metro.map(item => <Text key={item.id} color={item.color}>{`м. ${item.name}`}</Text>)}
                </OrderTypeData>
              </Col>}
              {service && <Col lg={{cols: 6}} sm={{cols: 12}}>
                <OrderTypeData type={'service'} img={service.image}>
                  <Text whiteSpace={'nowrap'}>{service.title}</Text>
                  <Text color={'black50'}>{service.description}</Text>
                </OrderTypeData>
              </Col>}
            </Row>}
            {result && <Wrapper flow={'column'}>
              <MediumText>{result.title}</MediumText>
              <MediumText color={'black50'}>{result.values}</MediumText>
            </Wrapper>}
            {comment && <Wrapper flow={'column'}>
              <MediumText>{translator('profile.medcard.order.comments', true)}</MediumText>
              <MediumText color={'black50'}>{comment}</MediumText>
            </Wrapper>}
            <Link route={`/profile/medcard/order/${id}`} passHref>
              <Button color={'black05'}>{translator('profile.medcard.order.show-button', true)}</Button>
            </Link>
          </Wrapper>
        </Container>
        {/*{showPoll && <>*/}
        {/*<Divider margin={'24px 0'} smMargin={'20px 0'} />*/}
        {/*<Container>*/}
        {/*<ProfileRating onClick={() => dispatch.modal.addAndShowModal({type: 'doctor-rating-modal', data: {...props}})}/>*/}
        {/*</Container>*/}
        {/*</>}*/}
      </Wrapper>
    </Well>
  )
}