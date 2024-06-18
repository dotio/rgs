import React from 'react'
import {Well} from '../../../ui/well'
import {Container} from '../../../ui/grid/container'
import {Col} from '../../../ui/grid/col'
import {Row} from '../../../ui/grid/row'
import {Button} from '../../../ui/button'
import {useDispatch} from 'react-redux'
import {T} from '../../../utils/translation'
import {MediumText} from '../../../ui/medium-text'
import {Wrapper} from '../../../ui/wrapper'

export const ChildrenPhone = () => {
  const dispatch = useDispatch()

  const onAddPhoneClicked = () => {
    dispatch.modal.addAndShowModal({type: 'add-child-phone'})
  }

  return (
    <Well>
      <Container>
        <Row>
          <Col lg={{cols: 4}}>
            <MediumText color={'dangerousRed'}>
              <T ucFirst>family.children-phone.title</T>
            </MediumText>
          </Col>
          <Col lg={{cols: 8}}>
            <Wrapper flow={'column'} gap={'8px'}>
              <MediumText color={'black50'}>
                <T ucFirst>family.children-phone.description</T>
              </MediumText>
              <Wrapper>
                <Button color={'black05'} onClick={onAddPhoneClicked}><T ucFirst>family.children-phone.add</T></Button>
              </Wrapper>
            </Wrapper>
          </Col>
        </Row>
      </Container>
    </Well>
  )
}