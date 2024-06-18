import React from 'react'
import {ModalTemplate} from '../../../templates/modal'
import styled from 'styled-components'
import {Container} from '../../../ui/grid/container'
import {Row} from '../../../ui/grid/row'
import {Col} from '../../../ui/grid/col'
import {Wrapper} from '../../../ui/wrapper'
import {TitleText} from '../../../ui/title-text'
import {Text} from '../../../ui/text'
import {Divider} from '../../../ui/divider'
import {media} from '../../../helpers/media'
import {Img} from '../../../ui/img'
import {MedcardItem} from '../../../features/activation/components/medcard-item'
import {getColor} from '../../../ui/helpers/getColor'
import {Icon} from '../../../ui/icon'
import {T} from '../../../utils/translation'
import {Button} from '../../../ui/button'

const StyledText = styled(Text)`
  display: inline;
  font-size: 20px;
  line-height: 30px;
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`

const AddMedcardInfo = styled.div`
  padding-left: 8px;
`

const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(147.74deg, #40B2C9 13.44%, #55DF94 85.6%);
  border-radius: 20px;
`

const StyledBlockText = styled(Text)`
  display: block;
  font-size: 20px;
  line-height: 30px;
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`

const StyledImg = styled(Img)`
  display: inline;
  margin-bottom: -6px;
  margin-right: 8px;
  ${media.mobile`
    width: 24px;
    height: 24px;
  `}
`

const StyledButton = styled(Button)`
  font-size: 20px !important;
  height: 48px;
  padding: 9px 16px;
`

const WrapperWithBorder = styled.div`
  border: 1px solid ${p => getColor('black15', p.theme)};
  border-radius: 30px;
  margin-bottom: 16px;
  cursor: pointer;
`

export const AddFamilyToProductModal = () => {
  const onSubmit = () => {
  }
  const formDisabled = () => {
    return true
  }
  return (
    <ModalTemplate>
      <Container>
        <TitleText padding={'0 0 24px'}><T ucFirst>family-add-product.title</T></TitleText>
      </Container>
      <Container>
        <Wrapper flow={'column'} gap={'24px'} padding={'0 0 24px 0'}>
          <Row>
            <Col lg={{cols: 4}} sm={{cols: 12}}>
              <StyledText size={'20px'} lineHeight={'30px'} color={'black50'} width={'auto'}>
                <T ucFirst>family-add-product.product</T>
              </StyledText>
            </Col>
            <Col lg={{cols: 8}} sm={{cols: 12}}>
              <Wrapper>
                <StyledImg width={'24px'} height={'24px'} src={'/static/icons/woman_icon.png'}/>
                <StyledText bold={'bold'}>
                  Доктор Онлайн
                </StyledText>
              </Wrapper>
              <StyledText color={'black50'}>
                В продукт включены 2 медкарты близких.
              </StyledText>
            </Col>
          </Row>
          <Row>
            <Col lg={{cols: 4}} sm={{cols: 12}}>
              <StyledText size={'20px'} lineHeight={'30px'} color={'black50'} width={'auto'}>
                <T ucFirst>family-add-product.medcards</T>
              </StyledText>
            </Col>
            <Col lg={{cols: 8}} sm={{cols: 12}}>
              <Wrapper>
                <StyledImg width={'24px'} height={'24px'} src={'/static/icons/woman_icon.png'}/>
                <StyledText bold={'bold'}>
                  Анна Иванова
                </StyledText>
              </Wrapper>
            </Col>
          </Row>
        </Wrapper>
      </Container>
      <Divider color={'black10'}/>
      <Container>
        <Row>
          <Wrapper flow={'column'} gap={'24px'} padding={'24px 0 24px 0'}>
            <Row>
              <Col lg={{cols: 12}} sm={{cols: 12}}>
                <StyledBlockText size={'20px'} lineHeight={'30px'} width={'auto'} bold={'bold'}>
                  <T ucFirst>family-add-product.choose</T>
                </StyledBlockText>
                <StyledBlockText>
                  <T ucFirst>family-add-product.choose-attention</T>
                </StyledBlockText>
              </Col>
            </Row>
          </Wrapper>
        </Row>
      </Container>
      <Container>
        <Row>
          <Wrapper flow={'column'}>
            <Row>
              <Col lg={{cols: 6}} sm={{cols: 12}}>
                <WrapperWithBorder>
                  <MedcardItem selected={false} id={4345} name={'Arkadiy'} relationship={'docha'}/>
                </WrapperWithBorder>
              </Col>
              <Col lg={{cols: 6}} sm={{cols: 12}}>
                <WrapperWithBorder>
                  <MedcardItem selected={true} id={4345} name={'Arkadiy'} relationship={'docha'}/>
                </WrapperWithBorder>
              </Col>
              <Col lg={{cols: 6}} sm={{cols: 12}}>
                <WrapperWithBorder>
                  <Wrapper align={'center'} padding={'12px 12px 12px 12px'}>
                    <IconBox>
                      <Icon type={'big_plus'} width={20} height={20}/>
                    </IconBox>
                    <AddMedcardInfo>
                      <Text breakWord size={'16px'} lineHeight={'24px'} color={'primary'}>
                        <T ucFirst>family-add-product.add-card</T>
                      </Text>
                    </AddMedcardInfo>
                  </Wrapper>
                </WrapperWithBorder>
              </Col>
            </Row>
          </Wrapper>
        </Row>
      </Container>
      <Container>
        <Row>
          <Wrapper flow={'column'} gap={'24px'} padding={'24px 0 24px 0'}>
            <Row>
              <Col lg={{cols: 6}} sm={{cols: 12}}>
                <Wrapper>
                  <StyledButton
                    color={'green'}
                    onClick={onSubmit}
                    cursor={'pointer'}
                    disabled={formDisabled()}
                  >
                    <T ucFirst>family-add-product.save</T>
                  </StyledButton>
                </Wrapper>
              </Col>
            </Row>
          </Wrapper>
        </Row>
      </Container>
    </ModalTemplate>
  )
}
