import React, {useState, useEffect, useRef, Fragment} from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {reject, equals} from 'ramda'
import moment from 'moment'
import {ModalTemplate} from '../../../../templates/modal'
import {TitleText} from '../../../../ui/title-text'
import {Container} from '../../../../ui/grid/container'
import {Row} from '../../../../ui/grid/row'
import {Col} from '../../../../ui/grid/col'
import {Wrapper} from '../../../../ui/wrapper'
import {LabeledBox} from '../../../../ui/form/labeled-box'
import {Input} from '../../../../ui/form/input'
import {CalendarInput} from '../../../../ui/form/calendar-input'
import {Button} from '../../../../ui/button'
import {Icon} from '../../../../ui/icon'
import {Text} from '../../../../ui/text'
import {Divider} from '../../../../ui/divider'
import {Attachment} from './attachment'
import {OrderTypesFilter} from '../../../../templates/filters/components/order-types-filter'
import {Textarea} from '../../../../ui/textarea'
import {Circle} from '../../../../ui/circle'
import {media} from '../../../../helpers/media'
import {getTranslator} from '../../../../utils/translation'
import {isMobile} from 'react-device-detect'
import {nonEmptyOrDateFormat} from '../../../../helpers/validator'
import {Loader} from '../../../../ui/loader'
import {uploadedFileExtensionChecker} from '../../../../ui/helpers/uploadedFileExtension-checker'
import {fileExtensionChecker, createdMimeTypeChecker} from '../../../../ui/helpers/mimeType-checker'
import {Router} from '../../../../routes'

const FileInput = styled.input.attrs({type: 'file', accept: ['image/*', '.pdf', '.xls', '.xlsx', '.xlsm', '.doc', '.docx', '.txt']})`
  display: none;
  pointer-events: none;
`

const Title = styled(TitleText)`
  padding: 0 0 24px;
  ${media.mobile`
    padding: 0 0 16px;
  `}
`

const FileWrapper = styled(Wrapper)`
  cursor: pointer;
`

export const NewResearchModal = ({current}) => {
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))
  const fileInputRef = useRef(null)
  const currentResearchId = useSelector(state => state.profileMedcard.currentResearch.id)
  const {medcardId, editForm, isEditInOrder} = current
  const [showLoader, setShowLoader] = useState(false)
  const today = isMobile ? moment().format('YYYY-MM-DD') : moment().format('DD.MM.YYYY')
  const orderId = useSelector(state => state.profileMedcard.currentOrder.id)

  const [form, setForm] = useState({
    medcardId,
    name: editForm ? editForm.name : '',
    orderTypeId: editForm ? editForm.orderTypeId : '',
    date: editForm ? (isMobile ? moment(editForm.date).format('YYYY-MM-DD') : moment(editForm.date).format('DD.MM.YYYY')) : today,
    comment: editForm ? editForm.comment : '',
  })
  const [files, setFiles] = useState([])
  const [addedFiles, setAddedFiles] = useState(editForm && editForm.files ? editForm.files : [])

  const isFormValid = ({comment, date, name, orderTypeId, ...fields}) => {
    if (!editForm && files.length === 0 && !comment || !nonEmptyOrDateFormat(date) || !orderTypeId || !name) {
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
      await dispatch.profileMedcard.updateResearch({
        id: editForm.id,
        ...form,
        date: moment(form.date, format).format('YYYY-MM-DD[T]HH:mm:ssZ'),
        files,
        addedFilesIds,
        removedFilesIds: editForm && editForm.files ? editForm.files.map(item => item.id).filter(id => !addedFilesIds.includes(id)) : []
      })

      if(editForm.id !== currentResearchId && !isEditInOrder) {
        await dispatch.profileMedcard.getResearches({medcardId})
      } else {
        await dispatch.profileMedcard.getResearch(editForm.id)
        isEditInOrder && await dispatch.profileMedcard.getOrder(orderId)
      }
    } else {
      const addedFilesIds = addedFiles.length > 0 ? addedFiles.map(file => file.id) : []
      await dispatch.profileMedcard.addResearch({
        ...form,
        date: moment(form.date, format).format('YYYY-MM-DD[T]HH:mm:ssZ'),
        addedFilesIds,
        files
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
      preview,
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
        <Title>{translator('research.new-research.title', true)}</Title>
        <Row>
          <Col lg={{cols: 8}} sm={{cols: 12}}>
            <LabeledBox text={translator('research.new-research.name', true)} margin={'0 0 20px'}>
              <Input
                value={form.name}
                wide
                size={'16px'}
                padding={'5px 11px'}
                placeholder={translator('research.new-research.name-placeholder', true)}
                onChange={(e) => handleChange('name', e.currentTarget.value)}
              />
            </LabeledBox>
          </Col>
        </Row>
        <Row>
          <Col lg={{cols: 4}} sm={{cols: 12}}>
            <LabeledBox text={translator('research.new-research.where', true)} margin={'0 0 20px'}>
              <OrderTypesFilter
                value={form.orderTypeId}
                single
                isSelect
                withIcon
                onChange={(value) => handleChange('orderTypeId', value)}
                mobileWidth={'100%'}
              />
            </LabeledBox>
          </Col>
          <Col lg={{cols: 4}} sm={{cols: 8}}>
            <LabeledBox text={translator('research.new-research.when', true)} margin={'0 0 20px'}>
              <CalendarInput
                placeholder={'дд.мм.гггг'}
                format={'DD.MM.YYYY'}
                mask={'99.99.9999'}
                borderSize={'1px'}
                borderColor={'black20'}
                color={'black'}
                onChange={(value) => handleChange('date', value)}
                value={form.date}
                width={'100%'}
                max={moment().format('YYYY-MM-DD')}
                maxDate={new Date()}
              />
            </LabeledBox>
          </Col>
          <Col>
            <LabeledBox text={translator('research.new-research.comment', true)} margin={'0 0 20px'}>
              <Textarea
                padding={'11px 11px 43px 11px'}
                placeholder={translator('research.new-research.comment.placeholder', true)}
                background={'transparent'}
                resize={'none'}
                width={'100%'}
                size={'16px'}
                lineHeight={'24px'}
                borderSize={'1px'}
                borderRadius={'16px'}
                borderColor={'black20'}
                placeholderColor={'black40'}
                value={form.comment}
                onChange={(e) => handleChange('comment', e.currentTarget.value)}
              />
            </LabeledBox>
          </Col>
        </Row>
        <Row>
          <Col lg={{cols: 12}} sm={{cols: 12}}>
            <Wrapper flow={'column'}>
              <Text size={'20px'} lineHeight={'30px'} padding={'0 0 12px'}>{translator('research.new-research.files', true)}</Text>
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
                  <Divider margin={'16px 0'} />
                </Fragment>
              ))}
              <FileWrapper align={'center'} onClick={handleAddFile}>
                <Circle size={36} color={'black05'}>
                  <Icon type={'icon_file'} color={'black40'} width={24} height={24}/>
                </Circle>
                <Text pointer size={'16px'} lineHeight={'22px'} padding={'0 12px 0'} color={'primary'}>
                  {translator('research.new-research.add-file', true)}
                </Text>
                <FileInput ref={fileInputRef} onChange={onFileChange} />
              </FileWrapper>
            </Wrapper>
          </Col>
        </Row>
      </Container>
      <Divider margin={'24px 0 16px'}/>
      <Container>
        <Wrapper mobilePadding={'0 0 48px'}>
          <Button color={'primary'} padding={'8px 15px'} fontSize={'20px'} lineHeight={'30px'} onClick={onSubmit} disabled={!isFormValid(form)}>{translator('research.new-research.save', true)}</Button>
        </Wrapper>
      </Container>
    </ModalTemplate>
  )
}