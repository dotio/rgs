import React from 'react'
import {useDispatch} from 'react-redux'
import styled from 'styled-components'
import {ModalTemplate} from '../../templates/modal'
import {Text} from '../../ui/text'
import {CheckCamera} from './components/checkConnection/check-camera'
import {CheckDynamic} from './components/checkConnection/check-dynamic'
import {CheckMic} from './components/checkConnection/check-mic'
import {Container} from '../../ui/grid/container'
import {Row} from '../../ui/grid/row'
import {Col} from '../../ui/grid/col'
import {T} from '../../utils/translation'

const ComponentWrapper = styled.div`
margin-top: 16px;

`

export const CheckConnectionModal = () => {
  const dispatch = useDispatch()

  const onDisable = (msg) => () => {
    dispatch.notifications.addNotify({
      title: <T ucFirst>{msg}</T>
    })
  }

  return (
    <ModalTemplate>
      <Container>
        <Row>
          <Col sm={{paddingBottom: '4px'}}>
            <Text size={'24px'} lineHeight={'28px'} >
              <T ucFirst>consultation.modal.title</T>
            </Text>
            <ComponentWrapper>
              <CheckCamera onDisable={onDisable('consultation.modal.camera')}/>
            </ComponentWrapper>
            <ComponentWrapper>
              <CheckMic onDisable={onDisable('consultation.modal.micro')}/>
            </ComponentWrapper>
            <ComponentWrapper>
              <CheckDynamic onDisable={onDisable('consultation.modal.dynamic')}/>
            </ComponentWrapper>
          </Col>
        </Row>
      </Container>
    </ModalTemplate>
  )
}