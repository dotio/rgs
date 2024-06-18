import React from 'react'
import styled from 'styled-components'
import {useSelector, useDispatch} from 'react-redux'
import {Router} from '../../../routes'
import {ModalTemplate} from '../../../templates/modal'
import {media} from '../../../helpers/media'
import {Wrapper} from '../../../ui/wrapper'
import {Container} from '../../../ui/grid/container'
import {Col} from '../../../ui/grid/col'
import {Row} from '../../../ui/grid/row'
import {Icon} from '../../../ui/icon'
import {Button} from '../../../ui/button'
import {Divider} from '../../../ui/divider'
import {getTranslator} from '../../../utils/translation'
import {TitleText} from '../../../ui/title-text'
import {MediumText} from '../../../ui/medium-text'

const PriceSm = styled(MediumText)`
  display:none;
  ${media.mobile`
    display: flex;
  `}
`
const PriceLg = styled(MediumText)`
  display:flex;
  ${media.mobile`
    display: none;
  `}
`

const LgCol = styled(Col)`
  display: flex;
  ${media.mobile`
  display:none;
    
  `}
`

export const ClinicCartModal = () => {
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))
  const clinic = useSelector((state) => state.clinics.currentClinic)
  const medcardId = useSelector((state) => state.user.mainMedcardId)
  const cart = useSelector(state => state.clinics.cart)
  const cartSum = useSelector(state => state.clinics.cartSum)
  const cartClinics = (cart && cart.length) ? cart.reduce((result, cartItem) => {
    if (result.find(item => item.clinicId === cartItem.clinic.id)) {
      return result
    }
    result = result.concat({
      clinicId: cartItem.clinic.id,
      diagnostics: cart.filter(({clinic}) => cartItem.clinic.id === clinic.id)
    })

    return result
  }, []) : []

  const changeCount = (productId, isAdded) => {
    const diagnostic = cart.find(({productId : id}) => id === productId)
    const count = isAdded ? diagnostic.qty + 1 : diagnostic.qty - 1

    if(count === 0 && cart.length === 1){
      dispatch.modal.deleteAllModals()
    }

    if (count) {
      dispatch.clinics.updateProductCart({productId, productType: diagnostic.productType, qty: count })
    } else {
      dispatch.clinics.deleteProductCart(diagnostic.id)
    }
  }

  const deleteOne = (productId) => {
    const diagnostic = cart.find(({id}) => id === productId)

    if(cart.length === 1){
      dispatch.modal.deleteAllModals()
    }

    diagnostic && dispatch.clinics.deleteProductCart(diagnostic.id)
  }

  const onPay = async () => {
    dispatch.clinics.addClinicOrder({id: clinic.id, medcardId})
    dispatch.modal.deleteModal()
    await dispatch.consultation.create({connectionType: 'chat', medcardId})
    Router.pushRoute('/consultation')
    dispatch.consultation.getActiveConsultation({force: true})
  }

  return (
    <ModalTemplate>
      <Container>
        <TitleText>{translator('clinic.cart.modal.title', true)}</TitleText>
      </Container>
      <Divider margin={'24px 0'} smMargin={'20px 0 24px'}/>
      {cartClinics && cartClinics.map((clinic, index) => (
        <>
          <Container key={index}>
            {clinic.diagnostics.map((diagnostic, index) => (
              <div key={diagnostic.id}>
                {index === 0 && <MediumText padding={'0 0 16px'} color={'black50'}>{diagnostic.clinic.name}</MediumText>}
                <Row>
                  <Col lg={{cols: 6}} sm={{cols: 6}}>
                    <MediumText>{diagnostic.title}</MediumText>
                    <PriceSm color={'black50'}>{`${diagnostic.price} ₽`}</PriceSm>
                  </Col>
                  <Col lg={{cols: 2}} sm={{cols: 3}}>
                    <Wrapper align={'center'} justify={'center'}>
                      <Icon
                        onClick={() => changeCount(diagnostic.productId, false)}
                        type={'minus'}
                        width={24}
                        height={24}
                        cursor={'pointer'}
                        color={diagnostic.qty === 1 ? '#C4C4C4' : 'black50'}
                      />
                      <MediumText padding={'0 8px'} width={'auto'}>{diagnostic.qty || 1}</MediumText>
                      <Icon
                        onClick={() => changeCount(diagnostic.productId, true)}
                        type={'add'}
                        width={24}
                        height={24}
                        cursor={'pointer'}
                        color={'black50'}
                      />
                    </Wrapper>
                  </Col>
                  <LgCol lg={{cols: 2}} sm={{cols: 0}}>
                    <PriceLg color={'black50'} align={'right'}>{`${diagnostic.price} ₽`}</PriceLg>
                  </LgCol>
                  <Col lg={{cols: 2}} sm={{cols: 3}}>
                    <Wrapper justify={'flex-end'}>
                      <Icon
                        onClick={() => deleteOne(diagnostic.id)}
                        type={'delete_trash'}
                        width={24}
                        height={24}
                        color={'black40'}
                        cursor={'pointer'}
                      />
                    </Wrapper>
                  </Col>
                </Row>
                {index !== clinic.diagnostics.length - 1 && <Divider margin={'24px 0'}/>}
              </div>
            ))}
          </Container>
          {index !== cartClinics.length - 1 && <Divider margin={'24px 0'}/>}
        </>
      ))}
      {/* <OffsetRow>
            <Col lg={{ cols: 4 }} sm={{ cols: 6 }}>
              <CartText color={'black50'}>Способ оплаты</CartText>
            </Col>
            <Col lg={{ cols: 4 }} sm={{ cols: 6 }}>
              <Wrapper justify={'flex-start'}>
                <BankCardItem>Картой</BankCardItem>
                <Icon
                  type={'bank_card'}
                  width={32}
                  height={20}
                />
                <Icon
                  type={'more'}
                  width={32}
                  height={20}
                />
                <BankCardItem>4276</BankCardItem>
              </Wrapper>
              <Button color={'black05'}>Сменить</Button>
            </Col>
          </OffsetRow> */}
      <Divider margin={'24px 0'}/>
      <Container>
        <Row>
          <Col lg={{ cols: 4 }} sm={{ cols: 6 }}>
            <MediumText color={'black50'}>{translator('clinic.cart.modal.pay', true)}</MediumText>
          </Col>
          <Col lg={{ cols: 8, paddingBottom: '24px' }} sm={{ cols: 6, paddingBottom: '28px' }}>
            <MediumText>{`${cartSum} ${translator('clinic.diagnostics.currency', true)}`}</MediumText>
          </Col>
        </Row>
        <Button
          fontSize={'20px'}
          lineHeight={'30px'}
          padding={'8px 15px'}
          color={'primary'}
          onClick={onPay}
          disabled={cartSum === 0}
        >
          {translator('clinic.cart.modal.order', true)}
        </Button>
      </Container>
    </ModalTemplate >
  )
}