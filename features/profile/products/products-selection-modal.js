import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ModalTemplate} from '../../../templates/modal'
import styled from 'styled-components'
import {Container} from '../../../ui/grid/container'
import {Row} from '../../../ui/grid/row'
import {Col} from '../../../ui/grid/col'
import {Wrapper} from '../../../ui/wrapper'
import {TitleText} from '../../../ui/title-text'
import {Text} from '../../../ui/text'
import {Divider} from '../../../ui/divider'
import {Button} from '../../../ui/button'
import {asyncModal} from '../../../helpers/hocs/asyncModal'
import {media} from '../../../helpers/media'
import {ProductRepository} from '../repository/product'
import {T} from '../../../utils/translation'
import {ProductSelectionCard} from './product-selection-card'
import {CardSelect} from './components/card-select-block'
import {Input} from '../../../ui/form/input'
import {LabeledBox} from '../../../ui/form/labeled-box'
import {isEmail} from '../../../helpers/validator'

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

const ProductsSelectionModalComp = ({data, current}) => {
  const dispatch = useDispatch()
  const cards = useSelector(state => state.profileSettings.bankCards)
  const userEmail = useSelector(state => state.profileMedcard.currentMedcard.email)
  const [cardId, setCardId] = useState(cards.length > 0 ? cards.find(card => card.active).id : null)

  const [form, setForm] = useState({
    userEmail,
  })

  const handleBuy = () => {
    dispatch.modal.addAndShowModal({type: 'service-pay-modal', productId: current.productId, userEmail: form.userEmail})
  }

  const handleChange = (field, value) => {
    setForm({...form, [field]: value})
  }

  return (
    <ModalTemplate>
      <Container>
        <TitleText padding={'0 0 24px'}><T ucFirst>profile.product.select-quantity</T></TitleText>
      </Container>
      <Container>
        <Row>
          <Col key={data.id} lg={{cols: 4}} sm={{cols: 6}}>
            <ProductSelectionCard
              name={data.name}
              discountPrice={data.discountPrice}
              price={data.price}
              active={true}
            />
          </Col>
        </Row>
      </Container>
      <Divider color={'black10'} margin={'24px 0'}/>
      <Container>
        <Wrapper flow={'column'} gap={'24px'} padding={'0 0 24px 0'}>
          <Row>
            <Col lg={{cols: 4}} sm={{cols: 12, paddingBottom: '8px'}}>
              <StyledText size={'20px'} lineHeight={'30px'} color={'black50'} width={'auto'}>
                <T ucFirst>profile.product.payment-method</T>
              </StyledText>
            </Col>
            <Col lg={{cols: 4}} sm={{cols: 12}}>
              <CardSelect cards={cards} selected={cardId} onChange={setCardId} />
            </Col>
          </Row>
          <Row>
            <Col lg={{cols: 4}} sm={{cols: 12}}>
              <StyledText size={'20px'} lineHeight={'30px'} color={'black50'} width={'auto'}>
                <T ucFirst>profile.product.payment-total</T>
              </StyledText>
              <LabeledBox margin={'24px 0'}>
                <Input
                  value={form.userEmail}
                  wide
                  size={'16px'}
                  lineHeight={'24px'}
                  padding={'5px 11px'}
                  placeholder={'введите ваш email'}
                  onChange={(e) => handleChange('userEmail', e.currentTarget.value)}
                />
              </LabeledBox>
            </Col>
            <Col lg={{cols: 4}} sm={{cols: 12}}>
              <StyledText size={'20px'} lineHeight={'30px'} width={'auto'}>
                {data.discountPrice || data.price}
              </StyledText>
            </Col>
          </Row>
        </Wrapper>
      </Container>
      <Container>
        <CustomButton color={'primary'} onClick={handleBuy} disabled={!isEmail || !isEmail(form.userEmail)}>
          <T ucFirst>profile.product.service.buy</T>
        </CustomButton>
      </Container>
    </ModalTemplate>
  )
}

export const ProductsSelectionModal = asyncModal(
  ProductsSelectionModalComp,
  ({current}) => {
    return ProductRepository.get(current.productId)
  }
)