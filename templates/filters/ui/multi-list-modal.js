import React from 'react'
import {ModalTemplate} from '../../modal'
import {Container} from '../../../ui/grid/container'
import {MultiDropDown} from './multi-list-dropdown'

export const MultiListModal = ({current}) => {

  return (
    <ModalTemplate mobilePadding={'16px 0'} withoutScroll>
      <Container>
        <MultiDropDown {...current.data} />
      </Container>
    </ModalTemplate>
  )
}