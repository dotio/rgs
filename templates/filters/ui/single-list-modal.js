import React from 'react'
import {ModalTemplate} from '../../modal'
import {Container} from '../../../ui/grid/container'
import {SingleDropDown} from './single-list-dropdown'

export const SingleListModal = ({current}) => {
  return (
    <ModalTemplate mobilePadding={'16px 0'} withoutScroll>
      <Container>
        <SingleDropDown {...current.data} onClick={current.data.onChangeClick} />
      </Container>
    </ModalTemplate>
  )
}