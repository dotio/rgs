import React, {useState} from 'react'
import styled from 'styled-components'
import {Well} from '../../../../ui/well'
import {Container} from '../../../../ui/grid/container'
import {Row} from '../../../../ui/grid/row'
import {Col} from '../../../../ui/grid/col'
import {Text} from '../../../../ui/text'
import {TitleText} from '../../../../ui/title-text'
import {media} from '../../../../helpers/media'
import {getColor} from '../../../../ui/helpers/getColor'
import {Divider} from '../../../../ui/divider'
import {Wrapper} from '../../../../ui/wrapper'
import {Icon} from '../../../../ui/icon'
import {Gap} from '../../../../ui/gap'
import {T} from '../../../../utils/translation'

const StyledText = styled(Text)`
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`

const HidingButton = styled(Gap)`
  display: inline-block;
  font-size: 16px;
  line-height: 24px;
  border: 1px solid ${p => getColor('black20', p.theme)};;
  border-radius: 50px;
  padding: 5px 11px;
  margin-top: 24px;
  cursor: pointer;
  position: static;
  visibility:visible;
  opacity:1;
  transition: visibility 0s linear 0.5s, opacity 0.5s linear;
`

const LastColWithoutPadding = styled(Col)`
  padding-bottom: 0;
`

export const ConsultationResultComponent = ({result, conclusion}) => {
  const [showConclusion, setShowConclusion] = useState(false)

  return (
    <Well>
      <Container>
        <TitleText padding={'0 0 16px'}><T ucFirst>profile.medcard.order-consultation.title</T></TitleText>
        {result.map((item, index) => {
          return <Row key={'result-' + index}>
            <Col lg={{cols: 4, paddingBottom: '24px'}} sm={{cols: 12, paddingBottom: '0'}}>
              <StyledText size={'20px'} lineHeight={'30px'} color={'black50'}>{item.title}</StyledText>
            </Col>
            <Col lg={{cols: 8, paddingBottom:'24px'}} sm={{cols: 12}}>
              <StyledText size={'20px'} lineHeight={'30px'} color={'black'} width={'auto'}>
                {item.value}
              </StyledText>
            </Col>
          </Row>
        })}
        {conclusion && conclusion.length > 0 && !showConclusion && <HidingButton onClick={() => setShowConclusion(true)}>
          <T ucFirst>profile.medcard.order-consultation.results</T> <Icon type={'dots'} width={17} color={'black40'}/>
        </HidingButton>}
        {showConclusion && <Wrapper flow={'column'}>
          <Divider margin={'24px 0'}/>
          <TitleText padding={'0 0 16px'}><T ucFirst>profile.medcard.order-examination.title</T></TitleText>
          {conclusion.map((item, index) => {
            return <Row>
              <Col lg={{cols: 4, paddingBottom: '24px'}} sm={{cols: 12, paddingBottom: '0'}}>
                <StyledText size={'20px'} lineHeight={'30px'} color={'black50'}>{item.title}</StyledText>
              </Col>
              {index < conclusion.length - 1 ?
                <Col lg={{cols: 8, paddingBottom:'24px'}} sm={{cols: 12}}>
                  <StyledText size={'20px'} lineHeight={'30px'} color={'black'} width={'auto'}>
                    {item.value}
                  </StyledText>
                </Col> :
                <LastColWithoutPadding lg={{cols: 8, paddingBottom:'24px'}} sm={{cols: 12}}>
                  <StyledText size={'20px'} lineHeight={'30px'} color={'black'} width={'auto'}>
                    {item.value}
                  </StyledText>
                </LastColWithoutPadding>
              }
            </Row>
          })}
        </Wrapper>}
      </Container>
    </Well>
  )
}
