import styled from 'styled-components'
import {ModalTemplate} from '../../../templates/modal'
import {TitleText} from '../../../ui/title-text'
import {asyncModal} from '../../../helpers/hocs/asyncModal'
import {Container} from '../../../ui/grid/container'
import React from 'react'
import {ProductRepository} from '../repository/product'

const Iframe = styled.iframe`
  width: 100%;
  height: calc(100vh - 32px - 48px);
  border: none;
`

const ServicePayModalComp = ({data}) => {
  return (
    <ModalTemplate servicePay>
      <Container>
        <TitleText>Оплата</TitleText>
        <Iframe src={data.url} />
      </Container>
    </ModalTemplate>
  )
}

export const ServicePayModal = asyncModal(ServicePayModalComp, ({current}) => ProductRepository.buyProduct(current.productId, current.userEmail))