import React from 'react'
import {useDispatch} from 'react-redux'
import {ModalTemplate} from '../../../templates/modal'
import styled from 'styled-components'
import {Container} from '../../../ui/grid/container'
import {Row} from '../../../ui/grid/row'
import {Col} from '../../../ui/grid/col'
import {Wrapper} from '../../../ui/wrapper'
import {TitleText} from '../../../ui/title-text'
import {Text} from '../../../ui/text'
import {Button} from '../../../ui/button'
import {asyncModal} from '../../../helpers/hocs/asyncModal'
import {media} from '../../../helpers/media'
import {Icon} from '../../../ui/icon'
import {getColor} from '../../../ui/helpers/getColor'
import {T} from '../../../utils/translation'
import {ProductCard} from './product-card'
import {requestApi} from '../../../lib/api'

const CustomButton = styled(Button)`
  padding: 8px 15px;
  font-size: 20px;
  line-height: 30px;
`

const StyledText = styled(Text)`
  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`

const StyledButton = styled(Button)`
  background-color: ${p => getColor('black05', p.theme)};
  box-shadow: none;
`

const ProductContainer = styled(Container)`
  padding-bottom: 24px;
  ${media.mobile`
    padding-bottom: 24px;
  `}
`

const ProductPayModalComp = ({data}) => {
  const product = data
  const dispatch = useDispatch()

  const handleBuy = () => {
    dispatch.modal.deleteModal()
  }

  return (
    <ModalTemplate>
      <Container>
        <TitleText padding={'0 0 24px'}><T ucFirst>order.product.modal.pay.title</T></TitleText>
      </Container>
      <ProductContainer padding={'0 0 24px'}>
        <Row>
          <Col lg={{cols: 6}} sm={{cols: 12}}>
            <ProductCard photo={product.image} title={product.name} id={product.id} date={product.subtitle}/>
          </Col>
        </Row>
      </ProductContainer>
      <Container>
        <Wrapper flow={'column'} gap={'24px'} padding={'0 0 24px 0'}>
          <Row>
            <Col lg={{cols: 4}} sm={{cols: 12}}>
              <StyledText size={'20px'} lineHeight={'30px'} color={'black50'} width={'auto'}><T
                ucFirst>order.product.title.validity</T></StyledText>
            </Col>
            <Col lg={{cols: 6}} sm={{cols: 12}}>
              <StyledText size={'20px'} lineHeight={'30px'} width={'auto'}>{product.expiryDate.expiryDate}</StyledText>
            </Col>
          </Row>
          <Row>
            <Col lg={{cols: 4}} sm={{cols: 12}}>
              <StyledText size={'20px'} lineHeight={'30px'} color={'black50'} width={'auto'}>
                <T ucFirst>order.product.title.limit</T></StyledText>
            </Col>
            <Col lg={{cols: 6}} sm={{cols: 12}}>
              <StyledText size={'20px'} lineHeight={'30px'} width={'auto'}>{product.limitations}</StyledText>
            </Col>
          </Row>
          <Row>
            <Col lg={{cols: 4}} sm={{cols: 12}}>
              <StyledText size={'20px'} lineHeight={'30px'} color={'black50'} width={'auto'}>
                <T ucFirst>profile.product.payment-method</T></StyledText>
            </Col>
            <Col lg={{cols: 4}} sm={{cols: 12}}>
              <Wrapper>
                <StyledText size={'20px'} lineHeight={'30px'} width={'auto'} padding={'0 6px 0 0'}>
                  <T ucFirst>profile.product.card</T></StyledText>
                <Wrapper justify={'flex-start'}>
                  <Wrapper width={'auto'} padding={'5px 0 0'}>
                    <Icon type={'bank_card'} width={38} height={20}/>
                  </Wrapper>
                  <StyledText size={'20px'} lineHeight={'30px'} padding={'0 0 8px 0'}>•••• 4276</StyledText>
                </Wrapper>
              </Wrapper>
              <StyledButton onClick={() => {
              }}><T ucFirst>profile.product.change</T></StyledButton>
            </Col>
          </Row>
          <Row>
            <Col lg={{cols: 4}} sm={{cols: 12}}>
              <StyledText size={'20px'} lineHeight={'30px'} color={'black50'} width={'auto'}><T
                ucFirst>profile.product.payment-total</T></StyledText>
            </Col>
            <Col lg={{cols: 4}} sm={{cols: 12}}>
              <StyledText size={'20px'} lineHeight={'30px'} width={'auto'}>{product.products[0].price}</StyledText>
            </Col>
          </Row>
        </Wrapper>
      </Container>
      <Container>
        <CustomButton color={'primary'} onClick={handleBuy}><T ucFirst>order.product.button.pay</T></CustomButton>
      </Container>
    </ModalTemplate>
  )
}

export const ProductPayModal = asyncModal(
  ProductPayModalComp,
  ({current}) => requestApi('get', `/product/${current.data.id}`)
)