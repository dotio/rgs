import React from 'react'
import styled from 'styled-components'
import {ModalTemplate} from '../../../../templates/modal'
import {TitleText} from '../../../../ui/title-text'
import {asyncModal} from '../../../../helpers/hocs/asyncModal'
import {Container} from '../../../../ui/grid/container'
// import {T} from '../../../utils/translation'
import {BillsRepository} from '../../repository/bills'

const Iframe = styled.iframe`
  width: 100%;
  height: calc(100vh - 32px - 48px);
  border: none;
`

const BillPayModalComp = ({data}) => {
  return (
    <ModalTemplate payBill url={data.url}>
      <Container>
        <TitleText>Оплата</TitleText>
        <Iframe src={data.url} />
      </Container>
    </ModalTemplate>
  )
}

export const BillPayModal = asyncModal(BillPayModalComp, ({current}) => BillsRepository.buyPay(current.billId, current.userEmail, {cardId: current.cardId}))