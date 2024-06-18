import React, {useState} from 'react'
import styled from 'styled-components'
import {Well} from '../../../../ui/well'
import {Container} from '../../../../ui/grid/container'
import {Row} from '../../../../ui/grid/row'
import {Col} from '../../../../ui/grid/col'
import {Text} from '../../../../ui/text'
import {Wrapper} from '../../../../ui/wrapper'
import {Icon} from '../../../../ui/icon'
import {Img} from '../../../../ui/img'
import {TitleText} from '../../../../ui/title-text'
import {T} from '../../../../utils/translation'
import {MediumText} from '../../../../ui/medium-text'
import {Button} from '../../../../ui/button'
import {useDispatch} from 'react-redux'

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

export const RecommendationComponent = ({recommendation, medcardId, orderId}) => {
  const dispatch = useDispatch()
  const [showDelete, setShowDelete] = useState(false)
  const {comment, files, id, specialization, serviceType, date} = recommendation

  const handleDeleteFile = async id => {
    dispatch.loaders.showLoader()
    await dispatch.profileMedcard.deleteRecommendation(id)
    await dispatch.profileMedcard.getOrder(orderId)
    dispatch.loaders.hideLoader()
  }

  const onEditClick = async () => {
    await dispatch.modal.addAndShowModal({
      type: 'new-recommendation',
      medcardId,
      editForm: {
        id,
        specializationId: specialization.id.toString(),
        orderTypeId: serviceType.id.toString(),
        comment,
        date,
        files
      },
      isEditInOrder: true
    })
  }

  return (
    <Well>
      <Container>
        <TitleText padding={'0 0 16px'}>Рекомендации</TitleText>
        {recommendation && comment && <Row>
          <Col lg={{cols: 4, paddingBottom:'24px'}} sm={{cols: 12}}>
            <MediumText color={'black50'}><T ucFirst>profile.medcard.order-reception.reccomendations</T></MediumText>
          </Col>
          <Col lg={{cols: 8, paddingBottom:'24px'}} sm={{cols: 12}}>
            <MediumText width={'auto'}>{comment }</MediumText>
          </Col>
        </Row>}
        {recommendation && files && files.length > 0 && <Row>
          <Col lg={{cols: 4, paddingBottom:'24px'}} sm={{cols: 12}}>
            <MediumText color={'black50'}><T ucFirst>profile.medcard.order-reception.files</T></MediumText>
          </Col>
          <Col lg={{cols: 8, paddingBottom:'24px'}} sm={{cols: 12}}>
            {files.map((file, index)=>(
              <Img borderRadius={'4px'} height={'128px'} shrink={'0'} src={file.url}  key={index}/>
            ))}
          </Col>
        </Row>}
        <Row>
          <Wrapper justify={'center'}>
            <Button onClick={onEditClick} color={'black05'}>Редактировать</Button>
            <StyledButton color={'black05'} padding={'0'} onClick={() => setShowDelete(!showDelete)}>
              <Icon type={'dots_16'} color={'black50'} width={16} height={16}/>
            </StyledButton>
            {showDelete && <HiddenButton color={'black05'} onClick={() => handleDeleteFile(id)}>
              <Wrapper><Icon type={'delete_trash_16'} color={'black50'} width={16} height={16}/></Wrapper>
              <Text padding={'0 0 0 6px'}>Удалить</Text>
            </HiddenButton>}
          </Wrapper>
        </Row>
      </Container>
    </Well>

  )
}


export const ResearchComponent = ({research, medcardId, orderId}) => {
  const dispatch = useDispatch()
  const [showDelete, setShowDelete] = useState(false)
  const {comment, files, id, name, serviceType, date} = research

  const handleDeleteFile = async id => {
    dispatch.loaders.showLoader()
    await dispatch.profileMedcard.deleteResearch(id)
    await dispatch.profileMedcard.getOrder(orderId)
    dispatch.loaders.hideLoader()
  }

  const onEditClick = async () => {
    await dispatch.modal.addAndShowModal({
      type: 'new-research-modal',
      medcardId,
      editForm: {
        id,
        name,
        orderTypeId: serviceType.id.toString(),
        comment,
        date,
        files
      },
      isEditInOrder: true
    })
  }

  return (
    <Well>
      <Container>
        <TitleText padding={'0 0 16px'}>Исследование или анализ</TitleText>
        {research && research.comment && <Row>
          <Col lg={{cols: 4, paddingBottom:'24px'}} sm={{cols: 12}}>
            <MediumText color={'black50'}>Комментарий</MediumText>
          </Col>
          <Col lg={{cols: 8, paddingBottom:'24px'}} sm={{cols: 12}}>
            <MediumText width={'auto'}>{research.comment}</MediumText>
          </Col>
        </Row>}
        {research && research.files && research.files.length > 0 && <Row>
          <Col lg={{cols: 4, paddingBottom:'24px'}} sm={{cols: 12}}>
            <MediumText color={'black50'}><T ucFirst>profile.medcard.order-reception.files</T></MediumText>
          </Col>
          <Col lg={{cols: 8, paddingBottom:'24px'}} sm={{cols: 12}}>
            {research.files.map((file, index)=>(
              <Img borderRadius={'4px'} height={'128px'} shrink={'0'} src={file.url} key={index}/>
            ))}
          </Col>
        </Row>}
        <Row>
          <Wrapper justify={'center'}>
            <Button onClick={onEditClick} color={'black05'}>Редактировать</Button>
            <StyledButton color={'black05'} padding={'0'} onClick={() => setShowDelete(!showDelete)}>
              <Icon type={'dots_16'} color={'black50'} width={16} height={16}/>
            </StyledButton>
            {showDelete && <HiddenButton color={'black05'} onClick={() => handleDeleteFile(id)}>
              <Wrapper><Icon type={'delete_trash_16'} color={'black50'} width={16} height={16}/></Wrapper>
              <Text padding={'0 0 0 6px'}>Удалить</Text>
            </HiddenButton>}
          </Wrapper>
        </Row>
      </Container>
    </Well>

  )
}