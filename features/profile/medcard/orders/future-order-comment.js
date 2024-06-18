import React from 'react'
import styled from 'styled-components'
import {Well} from '../../../../ui/well'
import {Container} from '../../../../ui/grid/container'
import {Row} from '../../../../ui/grid/row'
import {Col} from '../../../../ui/grid/col'
import {Text} from '../../../../ui/text'
import {Icon} from '../../../../ui/icon'
import {T} from '../../../../utils/translation'
import {Button} from '../../../../ui/button'
import {getColor} from '../../../../ui/helpers/getColor'
import {useDispatch} from 'react-redux'

const IconWrapper = styled.span`
  display: inline-block;
  vertical-align: middle;
  line-height: 18px;
  padding: 0 3px 1px 4px;
  margin-right: 7px;
  background-color: ${p => getColor('black40', p.theme)};
  border-radius: 4px;
`

export const FutureOrderComment = ({comment}) => {

  const dispatch = useDispatch()

  const startConsultation = async () => {
    dispatch.loaders.showLoader()
    await dispatch.consultation.createOrGoToActive({type: 'chat', redirect: true})
    dispatch.loaders.hideLoader()
  }

  return (
    <Well>
      <Container>
        {comment &&
          <Row>
            <Col lg={{cols: 4, paddingBottom: '24px'}} sm={{cols: 12, paddingBottom: '0'}}>
              <Text width={'auto'} size={'20px'} lineHeight={'30px'} color={'black50'}>
                <IconWrapper>
                  <Icon type={'mk'} width={19} height={10} color={'black40'}/>
                </IconWrapper>
                <T width={'auto'} ucFirst>profile.medcard.order-payment-alert.comment</T>
              </Text>
            </Col>
            <Col lg={{cols: 8, paddingBottom: '24px'}} sm={{cols: 12, paddingBottom: '12px'}}>
              <Text size={'20px'} lineHeight={'30px'}>{comment}</Text>
            </Col>
          </Row>
        }
        <Row>
          <Col lg={{cols: 4}} sm={{cols: 12}}>
            <Text size={'20px'} lineHeight={'30px'} color={'black50'}><T ucFirst>profile.medcard.future-order-comment.change-plans-title</T></Text>
          </Col>
          <Col lg={{cols: 8}} sm={{cols: 12}}>
            <Text size={'20px'} lineHeight={'30px'} padding={'0 0 8px 0'}><T ucFirst>profile.medcard.future-order-comment.change-plans-description</T></Text>
            <Button color={'black05'} onClick={startConsultation}><T ucFirst>profile.medcard.future-order-comment.write-to-consultant</T></Button>
          </Col>
        </Row>
      </Container>
    </Well>
  )
}
