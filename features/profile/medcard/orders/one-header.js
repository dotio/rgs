import React, {useMemo, useState} from 'react'
import styled from 'styled-components'
import {Well} from '../../../../ui/well'
import {Container} from '../../../../ui/grid/container'
import {Row} from '../../../../ui/grid/row'
import {Col} from '../../../../ui/grid/col'
import {Text} from '../../../../ui/text'
import {Router} from '../../../../routes'
import {CircleButton} from '../../../../ui/circle-button'
import {Wrapper} from '../../../../ui/wrapper'
import {Img} from '../../../../ui/img'
import {useSelector, useDispatch} from 'react-redux'
import moment from 'moment'
import {ProfileRating} from '../components/rating'
import {TitleText} from '../../../../ui/title-text'
import {T} from '../../../../utils/translation'
import {Icon} from '../../../../ui/icon'
import {getRandomIntInclusive} from '../../../../ui/helpers/getRandomIntInclusive'
import {MediumText} from '../../../../ui/medium-text'
import {Button} from '../../../../ui/button'

const StyledWrapper = styled(Wrapper)`
  display: inline-flex;
`

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-left: 8px;
`

const HiddenButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`

export const OrderHeaderComponent = ({medcardId}) => {
  const order = useSelector(state => state.profileMedcard.currentOrder)
  const {
    id,
    specialization,
    date,
    doctor,
    clinic,
    orderType,
    price,
    type,
    rating,
    chatId,
    showPoll,
    comment,
  } = order

  const dispatch = useDispatch()
  const memoizedRandom = useMemo(() => getRandomIntInclusive(1,5), [id])
  const isFuture = moment(date).diff(moment()) > 0
  const [showDelete, setShowDelete] = useState(false)

  const handleDeleteFile = async id => {
    await dispatch.profileMedcard.deleteOrder(id)
    Router.pushRoute(`/profile/${medcardId}/medcard/orders`)
  }

  const onEditClick = async () => {
    await dispatch.modal.addAndShowModal({
      type: 'new-order-modal',
      medcardId,
      editForm: {
        id,
        specializationId: specialization.id.toString(),
        orderTypeId: orderType.id.toString(),
        comment,
        date,
      },
      isEditOneOrder: true
    })
  }

  return (
    <Well>
      <Container>
        <TitleText>{moment(date).format('D MMMM')}</TitleText>
        <CircleButton icon={'long_arrow_left'} onClick={() => Router.back()} />
        <TitleText padding={'0 0 16px'} color={'black50'}>
          {specialization && (typeof specialization === 'string' ? specialization : specialization.title)}
          {type !== 'created' && ` в ${moment(date).format('HH:mm')}`}
        </TitleText>
        {isFuture && <TitleText align={'right'} smAlign={'left'} color={'secondary'} padding={'0 0 16px'}>
          {`Скоро ${orderType.name.toLowerCase()}`}
        </TitleText>
        }
        {doctor && <Row>
          <Col lg={{cols: 4}} sm={{cols: 12}}>
            <MediumText color={'black50'}><T ucFirst>profile.medcard.order.doctor</T></MediumText>
          </Col>
          <Col lg={{cols: 8, paddingBottom: '24px'}} sm={{cols: 12}}>
            <Wrapper align={'center'}>
              <Img borderRadius={'100px'} width={'24px'} height={'24px'} shrink={'0'} src={doctor.photo ? doctor.photo : '/static/avatars/doctor_empty_big.svg'}/>
              <MediumText padding={'0 0 0 8px'}>{doctor.surname} {doctor.name} {doctor.middlename}</MediumText>
            </Wrapper>
          </Col>
        </Row>}
        {clinic && <Row>
          <Col lg={{cols: 4}} sm={{cols: 12}}>
            <MediumText color={'black50'}><T ucFirst>profile.medcard.order.clinic</T></MediumText>
          </Col>
          <Col lg={{cols: 8, paddingBottom: '24px'}} sm={{cols: 12}}>
            <Wrapper align={'center'}>
              <Img borderRadius={'4px'} width={'24px'} height={'24px'} shrink={'0'} src={clinic.logo ? clinic.logo : `/static/mocks/clinic${memoizedRandom}.svg`}/>
              <MediumText padding={'0 0 0 8px'}>{clinic.name}</MediumText>
            </Wrapper>
          </Col>
        </Row>}
        {orderType && (
          <Row>
            <Col lg={{cols: 4}} sm={{cols: 12}}>
              <MediumText color={'black50'}><T ucFirst>profile.medcard.order.sevice</T></MediumText>
            </Col>
            <Col lg={{cols: 8, paddingBottom: '24px'}} sm={{cols: 12}}>
              <MediumText>{orderType.name}</MediumText>
            </Col>
          </Row>
        )}
        {type === 'system' && price && <Row>
          <Col lg={{cols: 4}} sm={{cols: 12}}>
            <MediumText color={'black50'}><T ucFirst>profile.medcard.order.price</T></MediumText>
          </Col>
          <Col lg={{cols: 8, paddingBottom:'12px'}} sm={{cols: 12}}>
            {price.product ? (
              <Wrapper align={'center'} gap={'6px'}>
                <Text width={'auto'} shrink={'0'}>{price.product.title}</Text>
                <Img width={'24px'} height={'24px'} shrink={'0'} src={price.product.image}/>
                <Text width={'auto'} shrink={'0'}>{price.product.name}</Text>
              </Wrapper>
            ) : (
              <MediumText width={'auto'}>{price.value}</MediumText>
            )}
          </Col>
        </Row>}
        {type === 'created' && comment &&  <Row>
          <Col lg={{cols: 4, paddingBottom: '24px'}} sm={{cols: 12, paddingBottom: '0'}}>
            <MediumText width={'auto'} color={'black50'}><T ucFirst>Комментарий</T></MediumText>
          </Col>
          <Col lg={{cols: 8, paddingBottom: '24px'}} sm={{cols: 12, paddingBottom: '12px'}}>
            <MediumText >{comment}</MediumText>
          </Col>
        </Row>}
        {chatId > 0 && (
          <Row>
            <Col lg={{cols: 4}} sm={{cols: 12}}>
              <MediumText color={'black50'} padding={'16px 0 0 0'} smPadding={'12px 0 0 0'}>
                <T ucFirst>profile.medcard.order-reception.history-chat</T>
              </MediumText>
            </Col>
            <Col lg={{cols: 8}} sm={{cols: 12}}>
              <StyledWrapper width={'auto'} onClick={() => Router.pushRoute('profile/medcard/order-history-chat', {backUrl: `/profile/medcard/order/${id}`, chatId: chatId})} align={'center'} padding={'16px 0 0 0'} mobilePadding={'0'}>
                <MediumText color={'primary'} width={'auto'} padding={'0 7px 0 0'} pointer><T ucFirst>profile.medcard.order-reception.show.history-chat</T></MediumText>
                <Icon cursor={'pointer'} type={'circle_right'} width={24} height={24} color={'primary'} />
              </StyledWrapper>
            </Col>
          </Row>
        )}
        {type === 'system' && (showPoll || rating > 0) && <Row>
          <Col lg={{cols: 4}} sm={{cols: 12}}>
            <MediumText color={'black50'} padding={'16px 0 0 0'} smPadding={'12px 0 0 0'}>
              <T ucFirst>profile.medcard.total-quality-modal.title</T>
            </MediumText>
          </Col>
          <Col lg={{cols: 8}} sm={{cols: 12}}>
            {showPoll && !rating && <>
              <Wrapper width={'auto'} align={'center'} padding={'16px 0 12px'} mobilePadding={'0 0 12px 0'}>
                <MediumText color={'black'} width={'auto'} padding={'0 7px 0 0'} pointer>
                  <T ucFirst>profile.medcard.order.quality.description</T>
                </MediumText>
              </Wrapper>
              <ProfileRating onClick={() => dispatch.modal.addAndShowModal({type: 'doctor-rating-modal', order: {...order}})}/>
            </>}
            {rating > 0 && <Wrapper align={'center'} padding={'16px 0 0 0'}>
              <TitleText color={'primary'} decoration={'underline'}>{rating.toFixed(2)}</TitleText>
            </Wrapper>}
          </Col>
        </Row>}
        {type === 'created' && <Wrapper justify={'center'}>
          <Button onClick={onEditClick} color={'black05'}>Редактировать</Button>
          <StyledButton color={'black05'} padding={'0'} onClick={() => setShowDelete(!showDelete)}>
            <Icon type={'dots_16'} color={'black50'} width={16} height={16}/>
          </StyledButton>
          {showDelete && <HiddenButton color={'black05'} onClick={() => handleDeleteFile(id)}>
            <Wrapper><Icon type={'delete_trash_16'} color={'black50'} width={16} height={16}/></Wrapper>
            <Text padding={'0 0 0 6px'}>Удалить</Text>
          </HiddenButton>}
        </Wrapper>}
      </Container>
    </Well>
  )
}