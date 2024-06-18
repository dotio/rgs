import React from 'react'
import {ModalTemplate} from '../../../templates/modal'
import {Container} from '../../../ui/grid/container'
import {ControlSettings} from './control-settings'

export const ControlSettingsModal = () => (
  <ModalTemplate>
    <Container>
      <ControlSettings/>
    </Container>
  </ModalTemplate>
)

