import React from 'react'
import {ModalTemplate} from '../../../../templates/modal'
import {Container} from '../../../../ui/grid/container'
import {Text} from '../../../../ui/text'

export const ProductCardModal = ({current}) => {
  const {title, description} = current.data

  return (
    <ModalTemplate >
      <Container>
        <Text size={'24px'} lineHeight={'28px'} width={'303px'} padding={'0 0 24px'}>{title}</Text>
        <Text dangerouslySetInnerHTML={{__html: description}} />
      </Container>
    </ModalTemplate>
  )
}