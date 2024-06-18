import React, {useMemo, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ModalTemplate} from '../../../../templates/modal'
import styled from 'styled-components'
import {Container} from '../../../../ui/grid/container'
import {Row} from '../../../../ui/grid/row'
import {Col} from '../../../../ui/grid/col'
import {Wrapper} from '../../../../ui/wrapper'
import {TitleText} from '../../../../ui/title-text'
import {Text} from '../../../../ui/text'
import {Button} from '../../../../ui/button'
import {asyncModal } from '../../../../helpers/hocs/asyncModal'
import {media} from '../../../../helpers/media'
import {getTranslator} from '../../../../utils/translation'
import {BillsRepository} from '../../repository/bills'
import {DataRowWithImage} from './data-row-with-image'
import moment from 'moment'
import {EditableDataRow} from '../../../../ui/editable-data-row'
import {CardSelect} from '../../products/components/card-select-block'
import {getRandomIntInclusive} from '../../../../ui/helpers/getRandomIntInclusive'
import {Input} from '../../../../ui/form/input'
import {LabeledBox} from '../../../../ui/form/labeled-box'
import {isEmail} from '../../../../helpers/validator'

const CustomButton = styled(Button)`
  padding: 8px 15px;
  font-size: 20px;
  line-height: 30px;
`

const StyledText = styled(Text)`
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`

const BillInfoModalComp = ({data, current}) => {
  const dispatch = useDispatch()
  const cards = useSelector(state => state.profileSettings.bankCards)
  const userEmail = useSelector(state => state.profileMedcard.currentMedcard.email)
  const translator = useSelector(state => getTranslator(state.localization))
  const [cardId, setCardId] = useState(null)
  const memoizedRandom = useMemo(() => getRandomIntInclusive(1,5), [current.billId])

  const [form, setForm] = useState({
    userEmail,
  })

  const handleBuy = () => {
    dispatch.modal.addAndShowModal({type: 'bill-pay-modal', billId: current.billId, userEmail: form.userEmail, cardId})
  }

  const handleChange = (field, value) => {
    setForm({...form, [field]: value})
  }

  return (
    <ModalTemplate>
      <Container>
        <TitleText padding={'0 0 24px'}>{translator('order.doctor.pay', true)}</TitleText>
      </Container>
      <Container>
        <Wrapper flow={'column'} gap={'24px'}>
          {data.doctor && (
            <DataRowWithImage
              label={translator('settings.bill-info.doctor', true)}
              src={data.doctor.photo || '/static/doctor/male_doctor.svg'}
              borderRadius={'100px'}
              value={[data.doctor.surname, data.doctor.name, data.doctor.middlename].filter(item => !!item).join(' ')}
            />
          )}
          {data.clinic && (
            <DataRowWithImage
              label={translator('settings.bill-info.clinic', true)}
              src={data.clinic.img || `/static/mocks/clinic${memoizedRandom}.svg`}
              value={data.clinic.name}
            />
          )}
          <EditableDataRow
            label={translator('settings.bill-info.date', true)}
            value={moment(data.date).format('DD MMM, HH:mm')}
          />
        </Wrapper>
      </Container>
      <Container>
        <Wrapper flow={'column'} gap={'24px'} padding={'24px 0'}>
          <Row>
            <Col lg={{cols: 4}} sm={{cols: 12}}>
              <StyledText size={'20px'} lineHeight={'30px'} color={'black50'} width={'auto'}>
                {translator('settings.bill-info.pay', true)}
              </StyledText>
            </Col>
            <Col lg={{cols: 4}} sm={{cols: 12}}>
              <CardSelect cards={cards} selected={cardId} onChange={setCardId} />
            </Col>
          </Row>
          <Row>
            <Col lg={{cols: 4}} sm={{cols: 12}}>
              <StyledText size={'20px'} lineHeight={'30px'} color={'black50'} width={'auto'}>
                {translator('profile.product.payment-total', true)}
              </StyledText>
              <LabeledBox margin={'24px 0'}>
                <Input
                  value={form.userEmail}
                  wide
                  size={'16px'}
                  lineHeight={'24px'}
                  padding={'5px 11px'}
                  placeholder={'введите ваш email'}
                  onChange={(e) => handleChange('userEmail', e.currentTarget.value)}
                />
              </LabeledBox>
            </Col>
            <Col lg={{cols: 4}} sm={{cols: 12}}>
              <StyledText size={'20px'} lineHeight={'30px'} width={'auto'}>
                {data.sum} {translator('settings.bill-info.rubl', true)}
              </StyledText>
            </Col>
          </Row>
        </Wrapper>
      </Container>
      <Container>
        <CustomButton color={'primary'} onClick={handleBuy} disabled={!isEmail || !isEmail(form.userEmail)}>
          {translator('order.product.button.pay', true)}
        </CustomButton>
      </Container>
    </ModalTemplate>
  )
}

export const BillInfoModal = asyncModal(
  BillInfoModalComp,
  ({current}) => {
    return BillsRepository.getBill(current.billId)
  }
)