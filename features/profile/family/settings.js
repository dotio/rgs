import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import moment from 'moment'
import {Wrapper} from '../../../ui/wrapper'
import {media} from '../../../helpers/media'
import {Container} from '../../../ui/grid/container'
import {Well} from '../../../ui/well'
import {Row} from '../../../ui/grid/row'
import {Col} from '../../../ui/grid/col'
//import {Icon} from '../../../ui/icon'
import {Button} from '../../../ui/button'
// import {Img} from '../../../ui/img'
import {Router} from '../../../routes'
// import {ControlTransfer} from './control-transfer'
import {ChildrenPhone} from './children-phone'
import {getTranslator, T} from '../../../utils/translation'
import {TitleText} from '../../../ui/title-text'
import {MediumText} from '../../../ui/medium-text'
import {Avatar} from '../../../ui/avatar'
import {useDropzone} from 'react-dropzone'
import {EditableField} from '../../../ui/editable-field'
import {formatName, genderNames, formatPhone} from '../medcard/general-data-block'

// const IconProductWrapper = styled.div`
//   padding-right: 8px;
// `
const OffsetButtonContainer = styled.div`
   padding-top: 8px;
`
// const CardContainer = styled.div`
//    margin-bottom: 20px;
// `
const DataContactsTitle = styled(TitleText)`
  padding-bottom: 24px;
  ${media.mobile`
    padding-bottom: 16px;
`}
`

const StyledWrapper = styled(Wrapper)`
  outline: none;
`
// TODO скрыли карту взрослого, Миха так сказал
export const RelativeMedcardSettings = () => {
  const translator = useSelector(state => getTranslator(state.localization))
  const dispatch = useDispatch()
  const {
    id,
    relationship,
    phone,
    confirmation,
    //cards,
    // product,
    createdDate,
    // activationDate,
    isAdult,
    // isAdultSoon,
    photo,
    name,
    surname,
    middlename,
    gender,
    birthDate,
  } = useSelector(state => state.medcards.relativeMedcardSettings)

  const [preview, setPreview] = useState(photo)
  useEffect(() => () => {URL.revokeObjectURL(preview)}, [])
  useEffect(() => {
    setPreview(photo)
  }, [photo])

  const onFileInputChange = (files) => {
    if(files && files[0]) {
      setPreview(URL.createObjectURL(files[0]))
      dispatch.profileMedcard.updateMedcard({medcardId: id, data: {file: files[0]}})
    }
  }

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({accept: ['.jpg', '.jpeg', '.png'], maxSize: 2 * 1024 * 1024, onDropAccepted: onFileInputChange, disabled: !!photo})


  const deleteCard = async (medcardId) => {
    await dispatch.medcards.deleteMedcard(medcardId)
    Router.pushRoute('/profile/family')
    dispatch.medcards.removeRelativeMedcardSettings(medcardId)
  }

  return (
    <>
      <Wrapper flow={'column'} gap={'6px'} margin={{bottom: '6px'}}>
        {moment().diff(moment(birthDate, 'YYYY-MM-DD'), 'days') <= 14 && !isAdult && <ChildrenPhone />}
        {!isAdult &&  (
          <Well>
            <Container>
              <DataContactsTitle>{translator('profile.settings.data-and-contacts', true)}</DataContactsTitle>
              <Wrapper flow={'column'} gap={'24px'}>
                <Row>
                  <Col lg={{cols: 4}} sm={{cols: 12}}>
                    <MediumText color={'black50'}>{translator('profile.medcard.anamnesis.foto', true)}</MediumText>
                  </Col>
                  <Col lg={{cols: 8}} sm={{cols: 12}}>
                    <StyledWrapper flow={'column'} padding={{top: '6px'}} {...getRootProps()}>
                      <Avatar
                        width={'80px'}
                        height={'80px'}
                        size={'80px'}
                        borderRadius={'50%'}
                        src={preview}
                        text={`${name && name[0] ? name[0] : ''}`}
                        color={'white'}
                        bgColor={'secondary'}
                        fontSize={'28px'}
                        lineHeight={'32px'}
                      />
                      {!preview && <Wrapper padding={'12px 0 0'}><EditableField emptyText={translator('profile.medcard.anamnesis.add-foto', true)} onClick={() => {}} /></Wrapper>}
                    </StyledWrapper>

                    {!preview && <>
                      <MediumText color={'black50'}>
                        {translator('profile.medcard.anamnesis.add-foto.subtitle', true)}
                      </MediumText>
                      <input {...getInputProps()} />
                    </>}
                  </Col>
                </Row>
                {name && surname && <Row>
                  <Col lg={{cols: 4}} sm={{cols: 12}}>
                    <MediumText color={'black50'}><T ucFirst>profile.medcard.anamnesis.fullname</T></MediumText>
                  </Col>
                  <Col lg={{cols: 8}} sm={{cols: 12}}>
                    <MediumText>{formatName(surname, name, middlename)}</MediumText>
                  </Col>
                </Row>}
                {gender && <Row>
                  <Col lg={{cols: 4}} sm={{cols: 12}}>
                    <MediumText color={'black50'}><T ucFirst>profile.medcard.anamnesis.gender</T></MediumText>
                  </Col>
                  <Col lg={{cols: 8}} sm={{cols: 12}}>
                    <MediumText>{genderNames[gender]}</MediumText>
                  </Col>
                </Row>}
                {birthDate && <Row>
                  <Col lg={{cols: 4}} sm={{cols: 12}}>
                    <MediumText color={'black50'}><T ucFirst>profile.medcard.anamnesis.birthdate</T></MediumText>
                  </Col>
                  <Col lg={{cols: 8}} sm={{cols: 12}}>
                    <MediumText>{moment(birthDate).format('DD.MM.YYYY')}</MediumText>
                  </Col>
                </Row>}
                <Row>
                  <Col lg={{cols: 4}}>
                    <MediumText size={'20px'} lineHeight={'30px'} color={'black50'}>
                      {translator('family.confirm-phone.title', true)}
                    </MediumText>
                  </Col>
                  <Col lg={{cols: 8}}>
                    <EditableField
                      emptyText={translator('family.settings.child.phone-fill', true)} value={phone ? `+ ${formatPhone(phone)}` : ''}
                      editableWhenFilled
                      onClick={() => dispatch.modal.addAndShowModal({type: 'add-child-phone', value: phone ? phone.substr(1) : null})}
                    />
                    <MediumText color={'black50'}>{translator('family.settings.child.phone-description', true)}</MediumText>
                  </Col>
                </Row>
                {/*<Wrapper align={'center'} justify={'center'}>*/}
                {/*<Button color={'black05'} onClick={() => null}>*/}
                {/*{translator('profile.medcard.anamnesis.edit-button', true)}*/}
                {/*</Button>*/}
                {/*</Wrapper>*/}
              </Wrapper>
            </Container>
          </Well>
        )}
        <Well>
          <Container>
            <Wrapper flow={'column'} gap={'24px'}>
              {relationship && <Row>
                <Col lg={{cols: 4}} sm={{cols: 12}}>
                  <MediumText color={'black50'}><T ucFirst>family.settings.description</T></MediumText>
                </Col>
                <Col lg={{cols: 8}} sm={{cols: 12}}>
                  <MediumText color={'black'}>{relationship}</MediumText>
                </Col>
              </Row>}
              {isAdult && (
                <>
                  {confirmation && <Row>
                    <Col lg={{cols: 4}} sm={{cols: 12}}>
                      <MediumText color={'black50'}><T ucFirst>family.settings.phone</T></MediumText>
                    </Col>
                    <Col lg={{cols: 8}} sm={{cols: 12}}>
                      <MediumText color={'black'}>{phone}</MediumText>
                      {confirmation && !confirmation.active && (
                        <>
                          <div>
                            <MediumText color={'dangerousRed'} as={'span'}><T ucFirst>family.settings.not-confirm</T></MediumText>
                            <MediumText as={'span'} color={'black50'}>
                              {` ${translator('family.settings.sms', true)} ${confirmation.date} в ${confirmation.time} ${translator('family.settings.link', true)}`}
                            </MediumText>
                          </div>
                          <OffsetButtonContainer>
                            <Button color={'black05'}><T ucFirst>family.settings.recent-code</T></Button>
                          </OffsetButtonContainer>
                        </>
                      )}
                    </Col>
                  </Row>}
                  {/*{cards && cards.length >= 1 && (*/}
                  {/*  <Row>*/}
                  {/*    <Col lg={{cols: 4}} sm={{cols: 12}}>*/}
                  {/*      <MediumText color={'black50'}><T ucFirst>family.settings.card</T></MediumText>*/}
                  {/*    </Col>*/}
                  {/*    <Col lg={{cols: 8}} sm={{cols: 12}}>*/}
                  {/*      {cards.map(({linked, lastNumbers}, index) => (*/}
                  {/*        <CardContainer key={'card-' + index}>*/}
                  {/*          <MediumText color={'black'} as={'span'}>{linked ? translator('family.settings.tied', true) : translator('family.settings.not-tied', true)}</MediumText>*/}
                  {/*          <MediumText color={'black50'} as={'span'}>{linked ? '' : translator('family.settings.do-tied', true)}</MediumText>*/}
                  {/*          <Icon*/}
                  {/*            type={'bank_card'}*/}
                  {/*            width={32}*/}
                  {/*            height={20}*/}
                  {/*          />*/}
                  {/*          <Icon*/}
                  {/*            type={'more'}*/}
                  {/*            width={32}*/}
                  {/*            height={20}*/}
                  {/*          />*/}
                  {/*          <MediumText color={'black'} as={'span'}>{`${lastNumbers}${linked ? '' : ', '}`}</MediumText>*/}
                  {/*          {!linked && <MediumText color={'black50'} as={'span'} breakWord><T ucFirst>family.settings.to-pay</T></MediumText>}*/}
                  {/*          <OffsetButtonContainer>*/}
                  {/*            <Button color={'black05'}>{linked ? translator('family.settings.remove', true) : translator('family.settings.add', true)}</Button>*/}
                  {/*          </OffsetButtonContainer>*/}
                  {/*        </CardContainer>*/}
                  {/*      ))}*/}
                  {/*    </Col>*/}
                  {/*  </Row>*/}
                  {/*)}*/}
                </>
              )}
              {/*{product && <Row>*/}
              {/*<Col lg={{cols: 4}} sm={{cols: 12}}>*/}
              {/*<MediumText color={'black50'}><T ucFirst>family.settings.product</T></MediumText>*/}
              {/*</Col>*/}
              {/*<Col lg={{cols: 8}} sm={{cols: 12}}>*/}
              {/*<Wrapper justify={'flex-start'}>*/}
              {/*{product && product.img && (*/}
              {/*<IconProductWrapper>*/}
              {/*<Img height={'24px'} width={'24px'} src={product.img}/>*/}
              {/*</IconProductWrapper>*/}
              {/*)}*/}
              {/*<MediumText color={'black'}>{product && product.name}</MediumText>*/}
              {/*</Wrapper>*/}
              {/*<OffsetButtonContainer>*/}
              {/*<Button color={'black05'}><T ucFirst>family.settings.manage</T></Button>*/}
              {/*</OffsetButtonContainer>*/}
              {/*</Col>*/}
              {/*</Row>}*/}
              {createdDate && <Row>
                <Col lg={{cols: 4}} sm={{cols: 12}}>
                  <MediumText color={'black50'}><T ucFirst>family.settings.when</T></MediumText>
                </Col>
                <Col lg={{cols: 8}} sm={{cols: 12}}>
                  <MediumText color={'black'}>
                    {moment(createdDate).format('DD.MM.YYYY')}
                  </MediumText>
                </Col>
              </Row>}
            </Wrapper>
          </Container>
        </Well>
        {isAdult && (
          <Well>
            <Container>
              <Row>
                <Col lg={{cols: 4}} sm={{cols: 12}}>
                  <MediumText color={'dangerousRed'}><T ucFirst>family.settings.danger</T></MediumText>
                </Col>
                <Col lg={{cols: 8}} sm={{cols: 12}}>
                  <MediumText><T ucFirst>family.settings.danger-description</T>
                  </MediumText>
                  <OffsetButtonContainer>
                    <Button color={'black05'} onClick={() => deleteCard(id)}><T ucFirst>family.settings.off</T></Button>
                  </OffsetButtonContainer>
                </Col>
              </Row>
            </Container>
          </Well>
        )}
        {/*{!isAdult && <ControlTransfer/>}*/}
      </Wrapper>
    </>
  )
}
