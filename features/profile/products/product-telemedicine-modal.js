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
import {Img} from '../../../ui/img'
import {useSelector} from 'react-redux'
import {getTranslator} from '../../../utils/translation'
import {T} from '../../../utils/translation'

const DescriptionText = styled(Text)`
  font-size: 20px;
  line-height: 30px;
  display: inline;
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`
const StyledImg = styled(Img)`
  display: inline;
  margin-bottom: -6px;
  margin-left: 3px;
  margin-right: 3px;
  ${media.mobile`
    width: 24px;
    height: 24px;
  `}
`
const StyledTitleText = styled(TitleText)`
  ${media.mobile`
    padding-bottom: 8px;
  `}
`

export const ProductTelemedicineModal = () => {
  const translator = useSelector(state => getTranslator(state.localization))

  return (
    <ModalTemplate backColor={'lightenBlue'}>
      <Container>
        <TitleText padding={'0 0 12px'} bold>{translator('product.telemedicine.modal.title', true)}</TitleText>
      </Container>
      <Container>
        <Wrapper flow={'column'} gap={'12px'}>
          <Row>
            <Col lg={{cols: 12}} sm={{cols: 12}}>
              <DescriptionText>
                {translator('product.telemedicine.modal.description', true)}
              </DescriptionText>
            </Col>
          </Row>
          <Row>
            <Col lg={{cols: 12}} sm={{cols: 12}}>
              <StyledTitleText bold={'bold'} padding={'28px 0 12px'}>
                {translator('product.telemedicine.modal.service.title', true)}
              </StyledTitleText>
            </Col>
          </Row>
          <Row>
            <Col lg={{cols: 12}} sm={{cols: 12}}>
              <Well>
                <Wrapper flow={'column'} gap={'24px'} mobileGap={'20px'} mobilePadding={{top: 0, right: '13px', bottom: 0, left: '13px'}} padding={{top: 0, right: '18px', bottom: 0, left: '18px'}}>
                  <Row>
                    <Col lg={{cols: 12}} sm={{cols: 12}}>
                      <DescriptionText>
                        {translator('product.telemedicine.modal.service.first.description1', true)}
                      </DescriptionText>
                      <StyledImg width={'24px'} height={'24px'} src={'/static/icons/woman_icon.png'}/>
                      <DescriptionText>
                        <T>product.telemedicine.modal.service.first.description2</T>
                      </DescriptionText>
                      <StyledImg width={'24px'} height={'24px'} src={'/static/icons/child_icon.png'}/>
                      <DescriptionText>
                        <T>product.telemedicine.modal.service.first.description3</T>
                      </DescriptionText>
                    </Col>
                  </Row>
                </Wrapper>
              </Well>
            </Col>
          </Row>
          <Row>
            <Col lg={{cols: 12}} sm={{cols: 12}}>
              <Well>
                <Wrapper flow={'column'} gap={'24px'} mobileGap={'20px'} mobilePadding={{top: 0, right: '13px', bottom: 0, left: '13px'}} padding={{top: 0, right: '18px', bottom: 0, left: '18px'}}>
                  <Row>
                    <Col lg={{cols: 12}} sm={{cols: 12}}>
                      <DescriptionText>
                        {translator('product.telemedicine.modal.service.second.description1', true)}
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