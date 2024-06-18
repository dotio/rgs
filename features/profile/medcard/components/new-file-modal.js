import {useState} from 'react'
import {ModalTemplate} from '../../../../templates/modal'
import {Container} from '../../../../ui/grid/container'
import {TitleText} from '../../../../ui/title-text'
import {T} from '../../../../utils/translation'
import {Divider} from '../../../../ui/divider'
import {Attachment} from './attachment'
import {Text} from '../../../../ui/text'
import {Row} from '../../../../ui/grid/row'
import {Col} from '../../../../ui/grid/col'
import {CardWithIcon} from './card-with-icon'
import {FilesRepository} from '../../../medcards/repository/file'
import {Router} from '../../../../routes'
import {useDispatch} from 'react-redux'
import {isMobile} from 'react-device-detect'
import {createdMimeTypeChecker} from '../../../../ui/helpers/mimeType-checker'

export const NewFileModal = ({current}) => {
  const {file, backUrl, medcardId} = current.data
  const [uploadedFile, setUploadedFile] = useState(file)
  const dispatch = useDispatch()

  const renameHandler = (title) => {
    setUploadedFile({...uploadedFile, title})
    FilesRepository.update(uploadedFile.id, {...uploadedFile, title})
      .then((file) => {
        setUploadedFile(file)
      })
      .catch(() => {})
  }

  const deleteHandler = () => {
    FilesRepository.remove(file.id)
      .then(() => Router.pushRoute(backUrl))
      .catch(() => {})
  }

  const openModal = (type, medcardId, backUrl) => {
    dispatch.modal.addAndShowModal({type, editForm: {files: [uploadedFile]}, medcardId, backUrl})
  }

  return (
    <ModalTemplate mobilePadding={'16px 0 16px'} onDelete={deleteHandler}>
      <Container>
        <TitleText padding={'0 0 16px'}><T ucFirst>profile.medcard.new-file.title</T></TitleText>
        <Attachment width={'80px'} height={'80px'} minHeight={'80px'} src={createdMimeTypeChecker(uploadedFile.mimeType) || uploadedFile.thumbnail}
          name={uploadedFile.title.length > 30 ? !isMobile ? uploadedFile.title.substring(0, 30) + '...' : uploadedFile.title.substring(0, 15) + '...' : uploadedFile.title}
          onRename={renameHandler}
          onDelete={deleteHandler}
        />
      </Container>
      <Divider margin={'24px 0'} />
      <Container>
        <Text size={'20px'} lineHeight={'30px'} padding={'0 0 16px'}><T ucFirst>profile.medcard.new-file.type</T></Text>
        <Row>
          <Col lg={{cols: 3}} sm={{cols: 6, paddingBottom: '6px'}}>
            <CardWithIcon
              icon={'opened_plus'}
              iconColor={'primary'}
              label={<T ucFirst>profile.medcard.new-file.order</T>}
              onClick={() => openModal('new-order-modal', medcardId)}
            />
          </Col>
          <Col lg={{cols: 3}} sm={{cols: 6, paddingBottom: '6px'}}>
            <CardWithIcon
              icon={'opened_plus'}
              iconColor={'primary'}
              label={<T ucFirst>profile.medcard.new-file.recommendation</T>}
              onClick={() => openModal('new-recommendation', medcardId)}
            />
          </Col>
          <Col lg={{cols: 3}} sm={{cols: 6}}>
            <CardWithIcon
              onClick={() => openModal('new-research-modal', medcardId )}
              icon={'opened_plus'}
              iconColor={'primary'}
              label={<T ucFirst>profile.medcard.new-file.research</T>}
            />
          </Col>
          <Col lg={{cols: 3}} sm={{cols: 6}}>
            <CardWithIcon
              icon={'opened_plus'}
              iconColor={'black50'}
              bgColor={'black05'}
              label={<T ucFirst>profile.medcard.new-file.other</T>}
              onClick={() => {Router.pushRoute(backUrl)}}
            />
          </Col>
        </Row>
      </Container>
    </ModalTemplate>
  )
}