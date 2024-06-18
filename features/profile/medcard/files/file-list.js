import React, {useRef, useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import {Img} from '../../../../ui/img'
import {Row} from '../../../../ui/grid/row'
import {Col} from '../../../../ui/grid/col'
import {Router} from '../../../../routes'
import {SectionTitle} from '../../components/section-title'
import {AddContentBlock} from '../components/add-content-block'
import {Container} from '../../../../ui/grid/container'
import {getTranslator} from '../../../../utils/translation'
import {Wrapper} from '../../../../ui/wrapper'
import {FilesRepository} from '../../../medcards/repository/file'
import {isMobile} from 'react-device-detect'
import {uploadedFileExtensionChecker} from '../../../../ui/helpers/uploadedFileExtension-checker'
import {FileCoverComponent, mimeTypeChecker} from '../../../../ui/helpers/mimeType-checker'

const ImgWrapper = styled(Wrapper)`
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
`

const FileInput = styled.input.attrs({
  type: 'file',
  accept: ['image/*', '.pdf', '.xls', '.xlsx', '.xlsm', '.doc', '.docx', '.txt']})`
  display: none;
  pointer-events: none;
`

export const FileList = ({medcardId}) => {
  const dispatch = useDispatch()
  const {items, total} = useSelector((state) => state.profileMedcard.files)
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
    <Container>
      <SectionTitle
        padding={'0 0 16px'}
        title={translator('profile.medcard.file-list.other', true)}
        count={total}
        link={total > 0 ? `/profile/${medcardId}/medcard/files` : ''}
      />
      {items.length >= 1 && (
        <Row>
          {items.slice(0,3).map(item => {
            const {id, thumbnail, mimeType, url} = item
            const imageItems = items.filter(item => item.mimeType.includes('image'))
            const currentIndex = imageItems.indexOf(item)

            return <Col key={id} lg={{cols: 3}} sm={{cols: 4}}>
              {mimeType.includes('image') ? <ImgWrapper
                onClick={() => dispatch.modal.addAndShowModal({
                  type: 'gallery-modal',
                  data: {
                    images: imageItems.map(item => ({...item, path: item.url})),
                    titles: items.map(file => file.title),
                    currentIndex: currentIndex,
                    isShowPreview: true
                  }
                })}
              >
                <Img src={thumbnail} />
              </ImgWrapper>
                : <ImgWrapper>
                  <FileCoverComponent
                    width={'132px'}
                    height={'176px'}
                    url={url}
                    title={mimeTypeChecker(mimeType)}
                    size={'24px'}
                    lineHeight={'30px'}
                    download
                  />
                </ImgWrapper>
              }
            </Col>
          })}
        </Row>
      )}
      {items.length === 0 && (
        <>
          <AddContentBlock
            onAddContent={isMobile ? handleAddFile : () => Router.pushRoute(`/profile/${medcardId}/medcard/upload`)}
          >
            {translator('profile.medcard.file-list.add', true)}
          </AddContentBlock>
          <FileInput ref={fileInputRef} onChange={onFileChange} />
        </>
      )}
    </Container>
  )
}