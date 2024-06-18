import React, {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import {ModalTemplate} from '../../../templates/modal'
import {Text} from '../../../ui/text'
import {Divider} from '../../../ui/divider'
import {Wrapper} from '../../../ui/wrapper'
import {Icon} from '../../../ui/icon'
import {Container} from '../../../ui/grid/container'
import {Row} from '../../../ui/grid/row'
import {Col} from '../../../ui/grid/col'
import {media} from '../../../helpers/media'
import {TitleText} from '../../../ui/title-text'
import {CardWithIcon} from './components/card-with-icon'
import {getTranslator, T} from '../../../utils/translation'
import {Router} from '../../../routes'
import {FilesRepository} from '../../medcards/repository/file'
import {isMobile} from 'react-device-detect'
import {uploadedFileExtensionChecker} from '../../../ui/helpers/uploadedFileExtension-checker'

const StyledDivider = styled(Divider)`
   ${media.mobile`
      margin-top: 24px;
   `}
`

const LockIconWrapper = styled.div`
 padding-right: 6px;
 display: inline-block;
 line-height: 24px;
`

const FileInput = styled.input.attrs({type: 'file', accept: ['image/*', '.pdf', '.xls', '.xlsx', '.xlsm', '.doc', '.docx', '.txt']})`
  display: none;
  pointer-events: none;
`

export const AddToMedcardModal = ({current}) => {
  const {medcardId} = current.data
  const dispatch = useDispatch()
  const translator = useSelector(state => getTranslator(state.localization))
  const [files, setFiles] = useState([])
  const fileInputRef = useRef(null)
  const mainMedcardId = useSelector(state => state.user.mainMedcardId)
  const backUrl = medcardId === mainMedcardId ? '/profile/medcard' : `/profile/family/${medcardId}/medcard`

  const onFileChange = (e) => {
    e.preventDefault()
    if (!e.target.files[0]) {
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

    fileExtensionAllowed && FilesRepository.create({file, title, medcardId})
      .then((file) => {
        dispatch.modal.addAndShowModal({
          type: 'new-file',
          data: {file, backUrl, medcardId}
        })
      })
      .catch(() => {})
  }

  const handleAddFile = () => {
    fileInputRef.current.click()
  }

  useEffect(() => () => {
    files.forEach((file) => URL.revokeObjectURL(file.file))
  }, [files])

  return (
    <ModalTemplate mobilePadding={'16px 0 16px'}>
      <Container>
        <TitleText><T ucFirst>profile.medcard.add-to-modal.title</T></TitleText>
        <TitleText color={'black50'} padding={'0 0 24px'}><T ucFirst>profile.medcard.add-to-modal.subtitle</T></TitleText>
        <Row>
          <Col lg={{cols: 3}} sm={{cols: 6, paddingBottom: '6px'}}>
            <CardWithIcon
              icon={'opened_plus'}
              iconColor={'primary'}
              label={translator('order.main.new-order', true)}
              onClick={() => dispatch.modal.addAndShowModal({type: 'new-order-modal', medcardId})}
            />
          </Col>
          <Col lg={{cols: 3}} sm={{cols: 6, paddingBottom: '6px'}}>
            <CardWithIcon
              icon={'opened_plus'}
              iconColor={'primary'}
              label={translator('order.main.recommend', true)}
              onClick={() => dispatch.modal.addAndShowModal({type: 'new-recommendation', medcardId})}
            />
          </Col>
          <Col lg={{cols: 3}} sm={{cols: 6}}>
            <CardWithIcon
              onClick={() => dispatch.modal.addAndShowModal({type: 'new-research-modal', medcardId})}
              icon={'opened_plus'}
              iconColor={'primary'}
              label={translator('order.main.research', true)}
            />
          </Col>
          <Col lg={{cols: 3}} sm={{cols: 6}}>
            <CardWithIcon
              icon={'opened_plus'}
              iconColor={'black50'}
              bgColor={'black05'}
              label={translator('order.main.other', true)}
              onClick={isMobile ? handleAddFile : () => Router.pushRoute(`/profile/${medcardId}/medcard/upload`)}
            />
            <FileInput ref={fileInputRef} onChange={onFileChange} />
          </Col>
        </Row>
      </Container>
      <StyledDivider margin={'32px 0 0'}/>
      <Container>
        <Row>
          <Col lg={{ cols: 11 }} sm={{ cols: 12}}>
            <Wrapper padding={'16px 0 0'}>
              <LockIconWrapper>
                <Icon type={'lock'} color={'black40'} width={16} height={16}/>
              </LockIconWrapper>
              <Text size={'16px'} lineHeight={'24px'} color={'black50'}><T ucFirst>profile.medcard.add-to-modal.footer-title</T></Text>
            </Wrapper>
          </Col>
        </Row>
      </Container>
    </ModalTemplate>
  )
}