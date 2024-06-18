import React, {Fragment, useEffect, useRef, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {ModalTemplate} from '../../../templates/modal'
import {Container} from '../../../ui/grid/container'
import {Text} from '../../../ui/text'
import {Row} from '../../../ui/grid/row'
import {Col} from '../../../ui/grid/col'
import {Input} from '../../../ui/form/input'
import {LabeledBox} from '../../../ui/form/labeled-box'
import {ThemeTypesFilter} from './theme-types-filter'
import {Textarea} from '../../../ui/textarea'
import {Attachment} from '../../profile/medcard/components/attachment'
import {equals, reject} from 'ramda'
import {Divider} from '../../../ui/divider'
import {Wrapper} from '../../../ui/wrapper'
import {Circle} from '../../../ui/circle'
import {Icon} from '../../../ui/icon'
import styled from 'styled-components'
import {Button} from '../../../ui/button'
import {getTranslator} from '../../../utils/translation'

const FileInput = styled.input.attrs({type: 'file', accept: 'image/*'})`
  display: none;
  pointer-events: none;
`

export const FeedbackModal = ({current}) => {
  const fileInputRef = useRef(null)
  const translator = useSelector(state => getTranslator(state.localization))
  const dispatch = useDispatch()
  const {medcardId} = current
  const [form, setForm] = useState({
    medcardId,
    name: '',
    email: '',
    comment: '',
    typeId: ''
  })

  const isFormValid = ({comment, ...fields}) => {
    if (files.length === 0 && !comment) {
      return false
    }
    return !Object.values(fields).includes('')
  }

  const onSubmit = async () => {
    await dispatch.about.addFeedback({...form, files})
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
    if (!e.target.files[0]) {
      return
    }

    const file = e.target.files[0]
    const title = file.name.split('.').shift()
    const preview = URL.createObjectURL(file)
    setFiles([...files, {
      file,
      title,
      preview,
    }])
    e.target.value = ''
  }
  const [files, setFiles] = useState([])
  const onFileRename = (index, newName) => {
    setFiles(files.map((file, i) => index === i ? {...file, title: newName} : file))
  }

  useEffect(() => () => {
    files.forEach((file) => URL.revokeObjectURL(file.file))
  }, [files])

  return (
    <ModalTemplate>
      <Container>
        <Text size={'28px'} lineHeight={'32px'} smSize={'24px'} smLineHeight={'28px'} padding={'0 0 24px'}>{translator('about.feedback.title', true)}</Text>
        <Row>
          <Col lg={{cols: 4}} sm={{cols: 12}}>
            <LabeledBox text={translator('about.feedback.name', true)} margin={'0 0 20px'}>
              <Input
                value={form.name}
                wide
                size={'16px'}
                padding={'5px 11px'}
                onChange={(e) => handleChange('name', e.currentTarget.value)}
              />
            </LabeledBox>
          </Col>
          <Col lg={{cols: 4}} sm={{cols: 12}}>
            <LabeledBox text={translator('about.feedback.email', true)} margin={'0 0 20px'}>
              <Input
                value={form.email}
                wide
                size={'16px'}
                padding={'6px 12px'}
                placeholder={translator('about.feedback.email.placeholder', true)}
                onChange={(e) => handleChange('email', e.currentTarget.value)}
              />
            </LabeledBox>
          </Col>
          <Col lg={{cols: 4}} sm={{cols: 12}}>
            <LabeledBox text={translator('about.feedback.theme', true)} margin={'0 0 20px'}>
              <ThemeTypesFilter
                value={form.typeId}
                single
                withIcon
                onChange={(value) => handleChange('typeId', value)}
                mobileWidth={'100%'}
              />
            </LabeledBox>
          </Col>
          <Col>
            <LabeledBox text={translator('about.feedback.comment', true)} margin={'0 0 20px'}>
              <Textarea
                padding={'12px 12px 44px 12px'}
                placeholder={translator('about.feedback.comment.placeholder', true)}
                background={'transparent'}
                resize={'none'}
                width={'100%'}
                size={'16px'}
                lineHeight={'24px'}
                borderSize={'1px'}
                borderRadius={'16px'}
                borderColor={'black20'}
                placeholderColor={'black50'}
                value={form.comment}
                onChange={(e) => handleChange('comment', e.currentTarget.value)}
              />
            </LabeledBox>
          </Col>
        </Row>
        <Wrapper flow={'column'}>
          {files.map((file, i) => (
            <Fragment key={`${file.name}__${i}`}>
              <Attachment
                src={file.preview}
                name={file.title}
                onDelete={() => setFiles(reject(equals(file), files))}
                onRename={(name) => onFileRename(i, name)}
              />
              <Divider margin={'16px 0'} />
            </Fragment>
          ))}
          <Wrapper align={'center'} padding={'0 0 36px'}>
            <Circle size={36} color={'black05'}>
              <Icon type={'icon_file'} color={'black40'} width={24} height={24}/>
            </Circle>
            <Text pointer size={'16px'} lineHeight={'22px'} padding={'0 12px 0'} color={'primary'} onClick={handleAddFile}>
              {translator('about.feedback.add-file.title', true)}
            </Text>
            <FileInput ref={fileInputRef} onChange={onFileChange} />
          </Wrapper>
        </Wrapper>
        <Button color={'primary'} padding={'9px 16px'} fontSize={'20px'} lineHeight={'30px'} onClick={onSubmit} disabled={!isFormValid(form)}>{translator('about.feedback.send.button', true)}</Button>
      </Container>
    </ModalTemplate>
  )
}