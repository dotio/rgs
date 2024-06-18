import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment'
import {Well} from '../../../../ui/well'
import {Container} from '../../../../ui/grid/container'
import {Row} from '../../../../ui/grid/row'
import {Col} from '../../../../ui/grid/col'
import {Text} from '../../../../ui/text'
import {getTranslator, T} from '../../../../utils/translation'
import {Button} from '../../../../ui/button'

export const OrderPaymentAlert = ({date}) => {
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))
  const finalPaymentDate = moment(date).subtract('days', 1).format('D MMMM')
  return (
    <Well>
      <Container>
        <Row>
          <Col lg={{cols: 9, paddingBottom: '12px'}}>
            <Text size={'20px'} lineHeight={'30px'} color={'dangerousRed'}>{`${translator('order.payment.alert', true)} ${finalPaymentDate} ${translator('order.payment.alert-continue', true)}`}</Text>
          </Col>
        </Row>
        <Button color={'primary'} onClick={() => dispatch.modal.addAndShowModal({type: 'product-pay-modal'})}><T ucFirst>profile.medcard.order-payment-alert.pay</T></Button>
      </Container>
    </Well>
  )
}
