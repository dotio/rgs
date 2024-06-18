import React, {Fragment, useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import {ModalTemplate} from '../../../../templates/modal'
import {media} from '../../../../helpers/media'
import {getColor} from '../../../../ui/helpers/getColor'
import {Text} from '../../../../ui/text'
import {TitleText} from '../../../../ui/title-text'
import {Wrapper} from '../../../../ui/wrapper'
import {Container} from '../../../../ui/grid/container'
import {LabeledBox} from '../../../../ui/form/labeled-box'
import {CalendarInput} from '../../../../ui/form/calendar-input'
import {Icon} from '../../../../ui/icon'
import {Divider} from '../../../../ui/divider'
import {SpecializationFilter} from '../../../../templates/filters/components/specialization-filter'
import {Textarea} from '../../../../ui/textarea'
import {Col} from '../../../../ui/grid/col'
import {Row} from '../../../../ui/grid/row'
import {Button} from '../../../../ui/button'
import {Attachment} from './attachment'
import {equals, reject} from 'ramda'
import {OrderTypesFilter} from '../../../../templates/filters/components/order-types-filter'
import moment from 'moment'
import {Circle} from '../../../../ui/circle'
import {getTranslator} from '../../../../utils/translation'
import {isMobile} from 'react-device-detect'
import {nonEmptyOrDateFormat} from '../../../../helpers/validator'
import {Loader} from '../../../../ui/loader'
import {createdMimeTypeChecker, fileExtensionChecker} from '../../../../ui/helpers/mimeType-checker'
import {uploadedFileExtensionChecker} from '../../../../ui/helpers/uploadedFileExtension-checker'
import {Router} from '../../../../routes'

const StyledTextArea = styled(Textarea)`
  ${media.mobile`
    min-height: 100px
  `}
`

const TextSpan = styled.span`
  font-size: 20px;
  line-height: 30px;
  color: ${p => getColor('black50', p.theme)};
`

const FileInput = styled.input.attrs({type: 'file', accept: ['image/*', '.pdf', '.xls', '.xlsx', '.xlsm', '.doc', '.docx', '.txt']})`
  display: none;
  pointer-events: none;
`

const FileWrapper = styled(Wrapper)`
  cursor: pointer;
`

export const NewOrderModal = ({current}) => {
  const translator = useSelector(state => getTranslator(state.localization))
  const dispatch = useDispatch()
  const {medcardId, editForm, isEditOneOrder} = current
  const fileResearchInputRef = useRef(null)
  const fileRecommendationInputRef = useRef(null)
  const [showLoader, setShowLoader] = useState(false)
  const today = isMobile ? moment().format('YYYY-MM-DD') : moment().format('DD.MM.YYYY')

  const [form, setForm] = useState({
    medcardId,
    specializationId: editForm ? editForm.specializationId : '',
    orderTypeId: editForm ? editForm.orderTypeId : '',
    dateStart: editForm ? (isMobile ? moment(editForm.date).format('YYYY-MM-DD') : moment(editForm.date).format('DD.MM.YYYY')) : today,
    comment: editForm ? editForm.comment : '',
    researchFilesIds: editForm && editForm.researchFilesIds ? editForm.researchFilesIds : [],
    recommendationFilesIds: editForm && editForm.recommendationFilesIds ? editForm.recommendationFilesIds : [],
    //doctorId: 0,
  })
  const [researchFiles, setResearchFiles] = useState([])
  const [recommendationFiles, setRecommendationFiles] = useState([])
  const [addedFiles, setAddedFiles] = useState(editForm && editForm.files ? editForm.files : [])

  const isFormValid = ({comment, dateStart, specializationId, orderTypeId, ...fields}) => {
    if (!editForm && researchFiles.length === 0 && recommendationFiles.length === 0 && !comment || !nonEmptyOrDateFormat(dateStart) || !specializationId || !orderTypeId) {
      return false
    }
    return !Object.values(fields).includes('')
  }

  const handleShowLoader = () => {
    if(showLoader){
      setShowLoader(false)
    }
    setShowLoader(true)
  }

  const onSubmit = async () => {
    handleShowLoader()

    if(isEditOneOrder){
      await dispatch.profileMedcard.updateOrder({
        id: editForm.id,
        ...form,
      })
      await dispatch.profileMedcard.getOrder(editForm.id)
      dispatch.modal.deleteAllModals()

    } else {
      const addedFilesIds = addedFiles.length > 0 ? addedFiles.map(file => file.id) : []
      const format =  isMobile || form.dateStart.split('-').length > 1 ? 'YYYY-MM-DD' : 'DD.MM.YYYY'
      await dispatch.profileMedcard.addOrder({...form, dateStart: moment(form.dateStart, format).format('YYYY-MM-DD[T]HH:mm:ssZ'), addedFilesIds, researchFiles, recommendationFiles})
      await dispatch.profileMedcard.getFiles({medcardId, limit: 3, offset: 0})
      Router.route === '/profile/medcard/upload-file' && Router.pushRoute('profile/medcard')
      dispatch.modal.deleteAllModals()
    }
  }

  const handleChange = (field, value) => {
    setForm({...form, [field]: value})
  }

  const handleAddResearchFile = () => {
    fileResearchInputRef.current.click()
  }
  const handleAddRecommendationFile = () => {
    fileRecommendationInputRef.current.click()
  }

  const onFileResearchChange = (e) => {
    e.preventDefault()
    if (!e.target.files[0] || e.target.files[0].size > 5 * 1024 * 1024) {
      return
    }

    const file = e.target.files[0]
    const title = file.name.split('.').shift()
    const preview = URL.createObjectURL(file)
    const fileExtensionAllowed = uploadedFileExtensionChecker(file.name)

    fileExtensionAllowed && setResearchFiles([...researchFiles, {
      file,
      title,
      preview,
    }])
    e.target.value = ''
  }
  const onFileRecommendationChange = (e) => {
    e.preventDefault()
    if (!e.target.files[0] || e.target.files[0].size > 5 * 1024 * 1024) {
      return
    }

    const file = e.target.files[0]
    const title = file.name.split('.').shift()
    const preview = URL.createObjectURL(file)
    const fileExtensionAllowed = uploadedFileExtensionChecker(file.name)

    fileExtensionAllowed && setRecommendationFiles([...recommendationFiles, {
      file,
      title,
      preview,
    }])
    e.target.value = ''
  }

  const onFileResearchRename = (index, newName) => {
    setResearchFiles(researchFiles.map((file, i) => index === i ? {...file, title: newName} : file))
  }
  const onFileRecommendationRename = (index, newName) => {
    setRecommendationFiles(recommendationFiles.map((file, i) => index === i ? {...file, title: newName} : file))
  }

  useEffect(() => () => {
    researchFiles.forEach((file) => URL.revokeObjectURL(file.file))
  }, [researchFiles])

  useEffect(() => () => {
    recommendationFiles.forEach((file) => URL.revokeObjectURL(file.file))
  }, [recommendationFiles])

  return (
    <ModalTemplate icon={'long_arrow_left'} padding={'24px 0 16px'} mobilePadding={'16px 0 16px'}>
      <Container>
        <Loader bgColor={'white70'} color={'primary'} size={'medium'} show={showLoader}/>
        <TitleText padding={'0 0 24px'} smPadding={'0 0 16px'}>{translator('profile.medcard.new-order.title', true)}</TitleText>
        <Row>
          <Col lg={{cols: 4}} sm={{cols: 12, paddingBottom: '20px'}}>
            <LabeledBox text={translator('profile.medcard.new-order.who', true)}>
              <SpecializationFilter
                withIcon
                isSelect
                mobileWidth={'100%'}
                value={form.specializationId}
                onChange={(value) => handleChange('specializationId', value)}
              />
            </LabeledBox>
          </Col>
          <Col lg={{cols: 4}} sm={{cols: 12, paddingBottom: '20px'}}>
            <LabeledBox text={translator('profile.medcard.new-order.where', true)}>
              <OrderTypesFilter
                value={form.orderTypeId}
                single
                withIcon
                isSelect
                onChange={(value) => handleChange('orderTypeId', value)}
                mobileWidth={'100%'}
              />
            </LabeledBox>
          </Col>
          <Col lg={{cols: 4, paddingBottom: '20px'}} sm={{cols: 12, paddingBottom: '20px'}}>
            <LabeledBox text={translator('profile.medcard.new-order.when', true)}>
              <CalendarInput
                lineHeight={'24px'}
                placeholder={'дд.мм.гггг'}
                format={'DD.MM.YYYY'}
                mask={'99.99.9999'}
                color={'black'}
                onChange={(value) => handleChange('dateStart', value)}
                value={form.dateStart}
                width={'100%'}
                max={moment().format('YYYY-MM-DD')}
                maxDate={new Date()}
              />
            </LabeledBox>
          </Col>
        </Row>
        <Row>
          <Col lg={{cols: 12, paddingBottom: '20px'}} sm={{cols: 12, paddingBottom: '20px'}}>
            <LabeledBox text={translator('profile.medcard.new-order.comment', true)}>
              <StyledTextArea
                resize={'none'}
                width={'100%'}
                size={'16px'}
                lineHeight={'24px'}
                padding={'11px 11px 19px 11px'}
                borderSize={'1px'}
                borderRadius={'16px'}
                borderColor={'black20'}
                placeholderColor={'black40'}
                placeholder={translator('profile.medcard.new-order.comment.placeholder', true)}
                background={'transparent'}
                value={form.comment}
                onChange={(e) => handleChange('comment', e.currentTarget.value)}
              />
            </LabeledBox>
          </Col>
        </Row>
        {!isEditOneOrder && <>
          <Wrapper flow={'column'}>
            <Text size={'20px'} lineHeight={'30px'} padding={'0 0 12px'}>{translator('profile.medcard.new-order.file-description', true)} <TextSpan>{translator('profile.medcard.new-order.file-description.colored', true)}</TextSpan></Text>
            {addedFiles && addedFiles.map((file, i) => (
              <Fragment key={`${file.name}__${i}`}>
                <Attachment
                  src={createdMimeTypeChecker(file.mimeType) || file.thumbnail}
                  name={file.title.length > 30 ? !isMobile ? file.title.substring(0, 30) + '...' : file.title.substring(0, 15) + '...' : file.title}
                  onDelete={() => setAddedFiles(reject(equals(file), addedFiles))}
                />
                <Divider margin={'12px 0 16px'} />
              </Fragment>
            ))}
            {recommendationFiles.map((file, i) => (
              <Fragment key={`${file.name}__${i}`}>
                <Attachment
                  src={fileExtensionChecker(file.file.name) || file.preview}
                  name={file.title.length > 30 ? !isMobile ? file.title.substring(0, 30) + '...' : file.title.substring(0, 15) + '...' : file.title}
                  onDelete={() => setRecommendationFiles(reject(equals(file), recommendationFiles))}
                  onRename={(name) => onFileRecommendationRename(i, name)}
                />
                <Divider margin={'12px 0 16px'} />
              </Fragment>
            ))}
            <FileWrapper align={'center'} onClick={handleAddRecommendationFile}>
              <Circle size={36} color={'black05'}>
                <Icon type={'icon_file'} color={'black40'} width={24} height={24} />
              </Circle>
              <Text size={'16px'} lineHeight={'22px'} padding={'0 8px 0'} color={'primary'}>{translator('profile.medcard.new-order.file.title', true)}</Text>
              <FileInput ref={fileRecommendationInputRef} onChange={onFileRecommendationChange} />
            </FileWrapper>
          </Wrapper>
          <Wrapper flow={'column'}>
            <Text  size={'20px'} lineHeight={'30px'} padding={'20px 0 12px'}>
              {translator('profile.medcard.new-order.file-description2', true)} <TextSpan>{translator('profile.medcard.new-order.file-description2.colored', true)}</TextSpan>
            </Text>
            {researchFiles.map((file, i) => (
              <Fragment key={`${file.name}__${i}`}>
                <Attachment
                  src={fileExtensionChecker(file.file.name) || file.preview}
                  name={file.title.length > 30 ? !isMobile ? file.title.substring(0, 30) + '...' : file.title.substring(0, 15) + '...' : file.title}
                  onDelete={() => setResearchFiles(reject(equals(file), researchFiles))}
                  onRename={(name) => onFileResearchRename(i, name)}
                />
                <Divider margin={'12px 0 16px'} />
              </Fragment>
            ))}
            <FileWrapper align={'center'} onClick={handleAddResearchFile}>
              <Circle size={36} color={'black05'}>
                <Icon type={'icon_file'} color={'black40'} width={24} height={24} />
              </Circle>
              <Text size={'16px'} lineHeight={'22px'} padding={'0 8px 0'} color={'primary'}>{translator('profile.medcard.new-order.file.title', true)}</Text>
              <FileInput ref={fileResearchInputRef} onChange={onFileResearchChange} />
            </FileWrapper>
          </Wrapper>
        </>}
      </Container>
      <Divider margin={'24px 0 16px'}/>
      <Container>
        <Wrapper mobilePadding={'0 0 48px'}>
          <Button color={'primary'} padding={'8px 15px'} fontSize={'20px'} lineHeight={'30px'} onClick={onSubmit} disabled={!isFormValid(form)}>{translator('profile.medcard.new-order.save.button', true)}</Button>
        </Wrapper>
      </Container>
    </ModalTemplate>
  )
}