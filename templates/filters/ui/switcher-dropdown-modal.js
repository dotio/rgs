import React from 'react'
import {ModalTemplate} from '../../modal'
import {Container} from '../../../ui/grid/container'
import {SwitcherDropDown} from './switcher-dropdown'

export const SwitcherDropdownModal = ({current}) => {
  return (
    <ModalTemplate mobilePadding={'16px 0'}>
      <Container>
        <SwitcherDropDown {...current.data} onClick={current.data.onSwitchClicked} />
      </Container>
    </ModalTemplate>
  )
}