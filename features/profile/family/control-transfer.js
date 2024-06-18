import React from 'react'
import styled from 'styled-components'
import {media} from '../../../helpers/media'
import {Well} from '../../../ui/well'
import {Container} from '../../../ui/grid/container'
import {Col} from '../../../ui/grid/col'
import {Text} from '../../../ui/text'
import {Row} from '../../../ui/grid/row'
import {Button} from '../../../ui/button'
import {T} from '../../../utils/translation'

const Title = styled(Text)`
  ${media.mobile`
    margin-bottom: 8px;
  `}
`

const Description = styled(Text)`
  margin-bottom: 8px;
`

export const ControlTransfer = () => {

  const onTransferClicked = () => {
    console.log('Clicked')
  }

  return (
    <Well>
      <Container>
        <Row>
          <Col lg={{cols: 4}}>
            <Title size={'20px'} lineHeight={'30px'} color={'black50'}>
              <T ucFirst>family.control-transfer.title</T>
            </Title>
          </Col>
          <Col lg={{cols: 8}}>
            <Description size={'20px'} lineHeight={'30px'} color={'black50'}>
              <T ucFirst>family.control-transfer.description</T>
            </Description>
            <Button color={'black05'} onClick={onTransferClicked}><T ucFirst>family.control-transfer.sent</T></Button>
          </Col>
        </Row>
      </Container>
    </Well>
  )
}