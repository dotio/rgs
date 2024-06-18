import React, {Fragment, useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import {ModalTemplate} from '../../../../templates/modal'
import {Text} from '../../../../ui/text'
import {TitleText} from '../../../../ui/title-text'
import {Wrapper} from '../../../../ui/wrapper'
import {Container} from '../../../../ui/grid/container'
import {LabeledBox} from '../../../../ui/form/labeled-box'
import {CalendarInput} from '../../../../ui/form/calendar-input'
import {Icon} from '../../../../ui/icon'
import {Divider} from '../../../../ui/divider'
import {SpecializationFilter} from '../../../../templates/filters/components/specialization-filter'
import {getTranslator} from '../../../../utils/translation'
import {Textarea} from '../../../../ui/textarea'
import {Row} from '../../../../ui/grid/row'
import {Col} from '../../../../ui/grid/col'
import {OrderTypesFilter} from '../../../../templates/filters/components/order-types-filter'
import {Attachment} from './attachment'
import {equals, reject} from 'ramda'
import {Button} from '../../../../ui/button'
import {Circle} from '../../../../ui/circle'
import moment from 'moment'
import {nonEmptyOrDateFormat} from '../../../../helpers/validator'
import {isMobile} from 'react-device-detect'
import {ModalSaveButton} from '../../components/modal-save-button'
import {Loader} from '../../../../ui/loader'
import {uploadedFileExtensionChecker} from '../../../../ui/helpers/uploadedFileExtension-checker'
import {fileExtensionChecker, createdMimeTypeChecker} from '../../../../ui/helpers/mimeType-checker'
import {Router} from '../../../../routes'

const FileInput = styled.input.attrs({type: 'file', accept: ['image/*', '.pdf', '.xls', '.xlsx', '.xlsm', '.doc', '.docx', '.txt']})`
  display: none;
  pointer-events: none;
`

const FileWrapper = styled(Wrapper)`
  cursor: pointer;
`

export const NewRecommendationModal = ({current}) => {
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))
  const fileInputRef = useRef(null)
  const currentRecommendationId = useSelector(state => state.profileMedcard.currentRecommendation.id)
  const {medcardId, editForm, isEditInOrder} = current
  const [showLoader, setShowLoader] = useState(false)
  const today = isMobile ? moment().format('YYYY-MM-DD') : moment().format('DD.MM.YYYY')
  const orderId = useSelector(state => state.profileMedcard.currentOrder.id)

  const [form, setForm] = useState({
    medcardId,
    specializationId: editForm ? editForm.specializationId : '',
    date: editForm ? (isMobile ? moment(editForm.date).format('YYYY-MM-DD') : moment(editForm.date).format('DD.MM.YYYY')) : today,
    comment: editForm ? editForm.comment : '',
    orderTypeId: editForm ? editForm.orderTypeId : '',
    specialistId: 1, // TODO в сваггере specialistId
    doctorId: 0, // TODO не пашет без него
  })

  const [files, setFiles] = useState([])
  const [addedFiles, setAddedFiles] = useState(editForm && editForm.files ? editForm.files : [])

  const isFormValid = ({comment, date, specializationId, orderTypeId, ...fields}) => {
    if (!editForm && files.length === 0 && !comment || !nonEmptyOrDateFormat(date) || !specializationId || !orderTypeId) {
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

    const format =  isMobile || form.date.split('-').length > 1 ? 'YYYY-MM-DD' : 'DD.MM.YYYY'

    if(editForm && editForm.id) {
      const addedFilesIds = addedFiles.length > 0 ? addedFiles.map(file => file.id) : []
      await dispatch.profileMedcard.updateRecommendation({
        id: editForm.id,
        ...form,
        date: moment(form.date, format).format('YYYY-MM-DD[T]HH:mm:ssZ'),
        files,
        addedFilesIds,
        removedFilesIds: editForm && editForm.files ? editForm.files.map(item => item.id).filter(id => !addedFilesIds.includes(id)) : []
      })

      if(editForm.id !== currentRecommendationId && !isEditInOrder) {
        await dispatch.profileMedcard.getRecommendations({medcardId})
      } else {
        await dispatch.profileMedcard.getRecommendation(editForm.id)
        isEditInOrder && await dispatch.profileMedcard.getOrder(orderId)
      }
    } else {
      const addedFilesIds = addedFiles.length > 0 ? addedFiles.map(file => file.id) : []
      await dispatch.profileMedcard.addRecommendation({
        ...form,
        date: moment(form.date, format).format('YYYY-MM-DD[T]HH:mm:ssZ'),
        addedFilesIds,
        files,
      })
    }
    Router.route === '/profile/medcard/upload-file' && Router.pushRoute('profile/medcard')
    dispatch.modal.deleteAllModals()
  }

  const handleChange = (field, value) => {
    setForm({...form, [field]: value})
  }

  const handleAddFile = () => {
    fileInputRef.current.click()
  }
  const onFileChange = (e) => {
    e.preventDefault()
    if (!e.target.files[0] || e.target.files[0].size > 5 * 1024 * 1024) {
      return
    }

    const file = e.target.files[0]
    const title = file.name.split('.').shift()
    const preview = URL.createObjectURL(file)
    const fileExtensionAllowed = uploadedFileExtensionChecker(file.name)

    fileExtensionAllowed && setFiles([...files, {
      file,
      title,
      preview
    }])
    e.target.value = ''
  }
  const onFileRename = (index, newName) => {
    setFiles(files.map((file, i) => index === i ? {...file, title: newName} : file))
  }

  useEffect(() => () => {
    files.forEach((file) => URL.revokeObjectURL(file.file))
  }, [files])

  return (
    <ModalTemplate icon={editForm ? 'cross' : 'long_arrow_left'} padding={'24px 0 16px'} mobilePadding={'16px 0 16px'}>
      <Container>
        <Loader bgColor={'white70'} color={'primary'} size={'medium'} show={showLoader}/>
        <TitleText padding={'0 0 24px'} smPadding={'0 0 16px'}>{editForm ? translator('profile.medcard.edit-recommendation.title', true) : translator('profile.medcard.new-recommendation.title', true)}</TitleText>
        <Row>
          <Col lg={{cols: 4}} sm={{cols: 12, paddingBottom: '20px'}}>
            <LabeledBox text={translator('profile.medcard.new-recommendation.who', true)}>
              <SpecializationFilter
                withIcon
                mobileWidth={'100%'}
                isSelect
                value={form.specializationId}
                onChange={(value) => handleChange('specializationId', value)}
                isRecommendationModal
              />
            </LabeledBox>
          </Col>
          <Col lg={{cols: 4}} sm={{cols: 12, paddingBottom: '20px'}}>
            <LabeledBox text={translator('profile.medcard.new-recommendation.where', true)}>
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
            <LabeledBox text={translator('profile.medcard.new-recommendation.when', true)}>
              <CalendarInput
                placeholder={'дд.мм.гггг'}
                format={'DD.MM.YYYY'}
                mask={'99.99.9999'}
                color={'black'}
                onChange={(value) => handleChange('date', value)}
                value={form.date}
                width={'100%'}
                max={moment().format('YYYY-MM-DD')}
                maxDate={new Date()}
              />
            </LabeledBox>
          </Col>
        </Row>
        <Row>
          <Col lg={{cols: 12, paddingBottom: '20px'}} sm={{cols: 12, paddingBottom: '20px'}}>
            <LabeledBox text={translator('profile.medcard.new-recommendation.comment', true)}>
              <Textarea
                resize={'none'}
                width={'100%'}
                size={'16px'}
                lineHeight={'24px'}
                padding={'11px 11px 19px 11px'}
                borderSize={'1px'}
                borderRadius={'16px'}
                borderColor={'black20'}
                placeholderColor={'black40'}
                placeholder={translator('profile.medcard.new-recommendation.comment-placeholder', true)}
                background={'transparent'}
                value={form.comment}
                onChange={(e) => handleChange('comment', e.currentTarget.value)}
              />
            </LabeledBox>
          </Col>
        </Row>
        <Wrapper flow={'column'}>
          <Text size={'20px'} lineHeight={'30px'} padding={'0 0 12px'}>{translator('profile.medcard.new-recommendation.files', true)}</Text>
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
          {files.map((file, i) => (
            <Fragment key={`${file.name}__${i}`}>
              <Attachment
                src={fileExtensionChecker(file.file.name) ||file.preview}
                name={file.title.length > 30 ? !isMobile ? file.title.substring(0, 30) + '...' : file.title.substring(0, 15) + '...' : file.title}
                onDelete={() => setFiles(reject(equals(file), files))}
                onRename={(name) => onFileRename(i, name)}
              />
              <Divider margin={'12px 0 16px'} />
            </Fragment>
          ))}
          <FileWrapper align={'center'} onClick={handleAddFile}>
            <Circle color={'black05'} size={36}>
              <Icon type={'icon_file'} color={'black40'} width={24} height={24} />
            </Circle>
            <Text size={'16px'} lineHeight={'22px'} padding={'0 8px 0'} color={'primary'}>
              {translator('profile.medcard.new-recommendation.add-file', true)}
            </Text>
            <FileInput ref={fileInputRef} onChange={onFileChange} />
          </FileWrapper>
        </Wrapper>
      </Container>
      <Divider margin={'24px 0 16px'}/>
      <Container>
        {!editForm && <Wrapper mobilePadding={'0 0 48px'}>
          <Button color={'primary'} padding={'8px 15px'} fontSize={'20px'} lineHeight={'30px'} onClick={onSubmit} disabled={!isFormValid(form)}>{translator('profile.medcard.new-recommendation.button', true)}</Button>
        </Wrapper>}
        {editForm && <Wrapper mobilePadding={'0 0 48px'}>
          <ModalSaveButton
            mobileFixed
            color={'primary'}
            padding={'8px 15px'}
            fontSize={'20px'}
            lineHeight={'30px'}
            onClick={onSubmit}
            disabled={!isFormValid(form)}
          >
            {translator('profile.medcard.personal-edit.button', true)}
          </ModalSaveButton>
        </Wrapper>}
      </Container>
    </ModalTemplate>
  )
}