import React from 'react'
import styled from 'styled-components'
import {ModalTemplate} from '../../../../templates/modal'
import {TitleText} from '../../../../ui/title-text'
import {Container} from '../../../../ui/grid/container'

const Iframe = styled.iframe`
  width: 100%;
  height: calc(100vh - 32px - 48px);
  border: none;
`

export const ProductPaymentModal = ({current}) => {
  return (
    <ModalTemplate payProduct={current.data.id}>
      <Container>
        <TitleText>Оплата</TitleText>
        <Iframe src={current.data.url} />
      </Container>
    </ModalTemplate>
  )
}