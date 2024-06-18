import React, { useState } from 'react'
import { ModalTemplate } from '../../templates/modal'
import { DoctorCard } from './doctor-card'
import styled from 'styled-components'
import { Container } from '../../ui/grid/container'
import { Row } from '../../ui/grid/row'
import { Col } from '../../ui/grid/col'
import { Map, Placemark, YMaps } from 'react-yandex-maps'
import { Wrapper } from '../../ui/wrapper'
import { Text } from '../../ui/text'
import { Divider } from '../../ui/divider'
import { Button } from '../../ui/button'
import { Link } from '../../routes'
import { asyncModal } from '../../helpers/hocs/asyncModal'
import { requestApi } from '../../lib/api'
import { Avatar } from '../../ui/avatar'
import { media } from '../../helpers/media'
import { Icon } from '../../ui/icon'

const StyledDoctorCard = styled(DoctorCard)`
  padding: 0 24px 24px 24px;
`
const StyledMap = styled(Map)`
  width: 100%;
  height: 240px;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  border-radius: 20px;
  overflow: hidden;
  ${media.mobile`
    height: 200px;
  `}
`
const StyledText = styled(Text)`
  font-size: 20px;
  line-height: 30px;
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`

const DoctorInfoModalComp = ({ data }) => {
  const [priceCategory, togglePriceCategory] = useState(false)
  const { clinics, additionalInfo } = data
  const clinic = clinics[0]

  return (
    <ModalTemplate padding={'8px 0 16px'}>
      <Container>
        <Row>
          <Col lg={{ cols: 12 }}>
            <StyledDoctorCard  {...data} />
          </Col>
          <Col lg={{ cols: 12, paddingBottom: '24px' }}>
            <YMaps>
              <StyledMap
                width={'100%'}
                height={'100%'}
                defaultState={{ center: [+clinic.latitude, +clinic.longitude], zoom: 15 }}
              >
                <Placemark
                  geometry={[+clinic.latitude, +clinic.longitude]}
                  options={{
                    iconLayout: 'default#image',
                    iconImageHref: 'static/mocks/clinic-default.png',
                    iconImageSize: [42, 42],
                    iconImageOffset: [-5, -38]
                  }}
                />
              </StyledMap>
            </YMaps>
          </Col>
        </Row>
        <Row>
          <Col lg={{ cols: 4 }}>
            <StyledText color={'black50'}>Клиника</StyledText>
          </Col>
          <Col lg={{ cols: 8, paddingBottom: '24px' }}>
            <Wrapper align={'center'} gap={'8px'} >
              <Avatar src={clinic.logo || 'static/mocks/clinic-default.png'} width={'24px'} height={'24px'} borderRadius={'4px'} />
              <StyledText width={'auto'}>{clinic.name}</StyledText>
            </Wrapper>
            <Wrapper align={'center'} flexWrap>
              <StyledText width={'auto'} color={'black50'}>{clinic.address}</StyledText>
              {clinic.metro && (
                <StyledText width={'auto'} color={clinic.metro.color}>{`м. ${clinic.metro.name}`}</StyledText>
              )}
            </Wrapper>
          </Col>
        </Row>
        {additionalInfo &&
          <Row>
            <Col lg={{ cols: 4 }}>
              <StyledText color={'black50'}>Ценовая категория</StyledText>
            </Col>
            <Col lg={{ cols: 8 }}>
              <Wrapper flow={'column'}>
                <Wrapper margin={{ bottom: '6px' }}>
                  <StyledText padding={'0 6px 0 0'} width={'auto'}>
                    {additionalInfo.value}
                  </StyledText>
                  <Icon
                    shrink={'0'}
                    cursor={'pointer'}
                    onClick={() => togglePriceCategory(!priceCategory)}
                    type={'info'}
                    color={'black40'}
                  />
                </Wrapper>
                {priceCategory && (
                  <StyledText padding={'0 6px 0 0'} width={'auto'}>
                    {additionalInfo.info}
                  </StyledText>
                )}
              </Wrapper>
            </Col>
          </Row>
        }
      </Container>
      <Divider width={'100%'} margin={additionalInfo ? '24px 0' : '0 0 24px 0'} />
      <Container>
        <Wrapper>
          <Link passHref route={`/doctor/${data.id}`}>
            <Button color={'primary'}>Подробнее про врача</Button>
          </Link>
        </Wrapper>
      </Container>
    </ModalTemplate>
  )
}

export const DoctorInfoModal = asyncModal(
  DoctorInfoModalComp,
  ({ current }) => {
    return requestApi('get', `/doctor/${current.data.id}`)
  }
)