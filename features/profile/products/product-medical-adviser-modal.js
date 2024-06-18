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
import {getColor} from '../../../ui/helpers/getColor'
import {useSelector} from 'react-redux'
import {getTranslator} from '../../../utils/translation'

const DescriptionText = styled(Text)`
  font-size: 20px;
  line-height: 30px;
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
    padding-top: 4px;
  `}
`

const Dote = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 10px;
  margin-top: 11px;
  margin-right: 20px;
  background-color: ${p => getColor('lightenGreen', p.theme)};
`

const StyledTitleText = styled(TitleText)`
  ${media.mobile`
    padding-bottom: 8px;
  `}
`

export const ProductMedicalAdviserModal = () => {
  const translator = useSelector(state => getTranslator(state.localization))

  return (
    <ModalTemplate backColor={'lightenGreen'}>
      <Container>
        <TitleText padding={'0 0 16px'} bold={'bold'}>{translator('product.medical.adviser.modal.title', true)}</TitleText>
      </Container>
      <Container>
        <Wrapper flow={'column'} gap={'12px'}>
          <Row>
            <Col lg={{cols: 12}} sm={{cols: 12}}>
              <DescriptionText>
                {translator('product.medical.adviser.modal.description', true)}
              </DescriptionText>
            </Col>
          </Row>
          <Row>
            <Col lg={{cols: 12}} sm={{cols: 12}}>
              <StyledTitleText bold={'bold'} padding={'28px 0 12px'} >
                {translator('product.medical.adviser.modal.type.consultation.title', true)}
              </StyledTitleText>
            </Col>
          </Row>
          <Row>
            <Col lg={{cols: 12}} sm={{cols: 12}}>
              <Well>
                <Wrapper flow={'column'} gap={'24px'} mobileGap={'20px'} padding={'0 24px 0 24px'}>
                  <Row>
                    <Col lg={{cols: 12}} sm={{cols: 12}}>
                      <DescriptionText bold={'bold'}>
                        {translator('product.medical.adviser.modal.first.type.consultation.title', true)}
                      </DescriptionText>
                    </Col>
                  </Row>
                  {[1,2,3,4,5].map(num => (
                    <Row key={num}>
                      <Col lg={{cols: 12}} sm={{cols: 12}}>
                        <Wrapper>
                          <Dote/>
                          <DescriptionText>
                            {translator(`product.medical.adviser.modal.first.type.consultation.description${num}`, true)}
                          </DescriptionText>
                        </Wrapper>
                      </Col>
                    </Row>
                  ))}
                </Wrapper>
              </Well>
            </Col>
          </Row>
          <Row>
            <Col lg={{cols: 12}} sm={{cols: 12}}>
              <Well>
                <Wrapper flow={'column'} gap={'24px'} mobileGap={'20px'} padding={'0 24px 0 24px'}>
                  <Row>
                    <Col lg={{cols: 12}} sm={{cols: 12}}>
                      <DescriptionText bold={'bold'}>
                        {translator('product.medical.adviser.modal.second.type.consultation.title', true)}
                      </DescriptionText>
                    </Col>
                  </Row>
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <Row key={num}>
                      <Col lg={{cols: 12}} sm={{cols: 12}}>
                        <Wrapper>
                          <Dote/>
                          <DescriptionText>
                            {translator(`product.medical.adviser.modal.second.type.consultation.description${num}`, true)}
                          </DescriptionText>
                        </Wrapper>
                      </Col>
                    </Row>
                  ))}
                </Wrapper>
              </Well>
            </Col>
          </Row>
        </Wrapper>
      </Container>
    </ModalTemplate>
  )
}