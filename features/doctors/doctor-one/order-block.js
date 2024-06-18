import React from 'react'
import {Container} from '../../../ui/grid/container'
import {Router} from '../../../routes'
import styled from 'styled-components'
import {useSelector} from 'react-redux'
import {T} from '../../../utils/translation'
import {Well} from '../../../ui/well'
import {TitleText} from '../../../ui/title-text'
import {CardWithIcon} from '../../profile/medcard/components/card-with-icon'
import {Text} from '../../../ui/text'
import {Wrapper} from '../../../ui/wrapper'
import {media} from '../../../helpers/media'

const OrderContentWrapper = styled(Wrapper)`
  overflow-x: auto;
  flex-wrap: nowrap;
`

const CardWrapper = styled(Wrapper)`
  height: 120px;
  width: 232px;
  ${media.mobile`
    min-width: 146px;
    width: 146px;
    height: 120px;
  `}
`

export const DoctorOrderBlock = () => {
  const doctor = useSelector((state) => state.doctors.currentDoctor)

  return (
    <Well color={'transparent'}>
      <Container>
        <TitleText><T ucFirst>doctor.order.title</T></TitleText>
        <TitleText color={'black50'} padding={'0 0 16px'}><T ucFirst>doctor.order.subtitle</T></TitleText>
        <OrderContentWrapper gap={'12px'}>
          {doctor.orderTypes.map((type) =>
            <CardWrapper key={type.id}>
              <CardWithIcon
                onClick={() => Router.pushRoute('order/doctor', {doctorId: doctor.id, type: type.code})}
                icon={'circle_plus'}
                iconColor={'primary'}
                bgColor={'white'}
                labelComponent={
                  <Text size={'20px'} lineHeight={'24px'} smSize={'16px'} smLineHeight={'24px'}>
                    {type.title}
                  </Text>
                }
              />
            </CardWrapper>
          )}
        </OrderContentWrapper>
      </Container>
    </Well>
  )
}