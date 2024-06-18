import React from 'react'
import {ModalTemplate} from '../../../templates/modal'
import styled from 'styled-components'
import {Container} from '../../../ui/grid/container'
import {Row} from '../../../ui/grid/row'
import {Col} from '../../../ui/grid/col'
import {Wrapper} from '../../../ui/wrapper'
import {TitleText} from '../../../ui/title-text'
import {Text} from '../../../ui/text'
import {media} from '../../../helpers/media'
import {Well} from '../../../ui/well'
import {useSelector} from 'react-redux'
import {getTranslator} from '../../../utils/translation'

const DescriptionText = styled(Text)`
  font-size: 20px;
  line-height: 30px;
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`

const StyledTitleText = styled(TitleText)`
  ${media.mobile`
    padding-bottom: 20px;
  `}
`

export const ProductSecondMedicalOpinionModal = () => {
  const translator = useSelector(state => getTranslator(state.localization))

  return (
    <ModalTemplate backColor={'lightenAquamarin'}>
      <Container>
        <StyledTitleText padding={'0 0 24px'} bold={'bold'}>
          {translator('product.second.medical.opinion.modal.title', true)}
        </StyledTitleText>
      </Container>
      <Container>
        <Wrapper flow={'column'} gap={'24px'}>
          <Row>
            <Col lg={{cols: 12}} sm={{cols: 12}}>
              <Well>
                <Wrapper flow={'column'} gap={'24px'} mobilePadding={{top: 0, right: '13px', bottom: 0, left: '13px'}} padding={{top: 0, right: '18px', bottom: 0, left: '18px'}}>
                  <Row>
                    <Col lg={{cols: 12}} sm={{cols: 12}}>
                      <DescriptionText>
                        {translator('product.second.medical.opinion.modal.description', true)}
                      </DescriptionText>
                    </Col>
                  </Row>
                </Wrapper>
              </Well>
            </Col>
          </Row>
        </Wrapper>
      </Container>
    </ModalTemplate>
  )
}