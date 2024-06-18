import React from 'react'
import styled from 'styled-components'
import {Wrapper} from '../../../ui/wrapper'
import {Text} from '../../../ui/text'
import {media} from '../../../helpers/media'
import {Container} from '../../../ui/grid/container'
import {Well} from '../../../ui/well'
import {Row} from '../../../ui/grid/row'
import {Col} from '../../../ui/grid/col'
import {Button} from '../../../ui/button'
import {Img} from '../../../ui/img'
import {T} from '../../../utils/translation'
import {useDispatch} from 'react-redux'

const DescriptionText = styled(Text)`
  font-size: 20px;
  line-height: 30px;
    ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `} 
`

const IconProductWrapper = styled.div`
  padding-right: 8px;
`
const OffsetButtonContainer = styled.div`
   padding-top: 8px;
`

export const AddFamilyInProduct = ({productName, productImg, description}) => {
  const dispatch = useDispatch()
  const addMedcardHandle = () => dispatch.modal.addAndShowModal({type: 'add-to-product-family-modal'})

  return (
    <Well>
      <Container>
        <Wrapper flow={'column'} gap={'24px'}>
          <Row>
            <Col lg={{cols: 4}} sm={{cols: 12}}>
              <DescriptionText color={'primary'}><T ucFirst>family.add.to.product</T></DescriptionText>
            </Col>
            <Col lg={{cols: 8}} sm={{cols: 12}}>
              <Wrapper justify={'flex-start'}>
                <IconProductWrapper>
                  <Img height={'24px'} width={'24px'} src={productImg}/>
                </IconProductWrapper>
                <DescriptionText color={'black'}>{productName}</DescriptionText>
              </Wrapper>
              <Wrapper justify={'flex-start'}>
                <DescriptionText color={'black50'}>{description}</DescriptionText>
              </Wrapper>
              <OffsetButtonContainer>
                <Button color={'black05'} onClick={addMedcardHandle}><T ucFirst>family.select.family</T></Button>
              </OffsetButtonContainer>
            </Col>
          </Row>
        </Wrapper>
      </Container>
    </Well>
  )
}
