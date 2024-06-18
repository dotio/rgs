import React, {useState, useRef, useEffect, forwardRef, createRef} from 'react'
import styled, {css} from 'styled-components'
import {Icon} from '../../ui/icon'
import {getColor} from '../../ui/helpers/getColor'
import {Img} from '../../ui/img'
import {useDispatch, useSelector} from 'react-redux'
import {Text} from '../../ui/text'
import {CircleButton} from '../../ui/circle-button'
import {Wrapper} from '../../ui/wrapper'
import {media} from '../../helpers/media'
// import {ControlsButtonBlock} from './components/controls-button-block'
// import { FilesRepository } from '../medcards/repository/file'
// import {requestApi} from '../../lib/api'

const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 84px 72px 84px;
  
  ${media.mobile `
    padding: 24px 0 72px 0;
  `}
`

const Backdrop = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
`

const ArrowContainer = styled.div`
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 150px;
  position: absolute;
  cursor: pointer;
  bottom: 0;

  ${p => p.isRight ? css`
     right: 0;
     justify-content: flex-end;
     padding-right: 24px;
    ` : css`
      left: 0;
      justify-content: flex-start;
      padding-left: 24px;
  `}
    
  &:hover {  
    svg {
      fill: ${p => getColor('white', p.theme)};
    }
  }  
    
`

const ModalBody = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  position: relative;
  width: auto;
  max-height: calc(100vh - 92px);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
`

const ModalImage = styled(Img)`
  height: auto;
  width: 100%;
  max-height: 100%;
  border-radius: 4px;
  max-width: 100%;
  object-fit: contain;
`

const BottomBlock = styled(Wrapper)`
  position: fixed;
  bottom: 24px;
  left: 24px;

  ${media.mobile`
    left: 16px;
    bottom: 16px;
  `}
`

const PreviewImageBlock = styled(Wrapper)`
  position: absolute;
  z-index: 3;
  top: 6px;
  overflow-x: auto;
  right: 10px;
  padding: 0 6px;
  flex-shrink: 0;
  min-width: ${p => p.minWidth};
  width: 100%;
  max-width: 316px;

  ${media.mobile`
    top: 16px;
    right: 16px;
  `}
`

const PreviewImage = styled(forwardRef((props, ref) => <Img ref={ref} {...props}/>))`
  height: 64px;
  border-radius: 4px;
  margin: 0 3px;
  cursor: pointer;
  flex-shrink: 0;
  
  ${p => p.isCurrent && css `
    border: 3px solid ${p => getColor('white', p.theme)};
    margin: 0;
  `}

  ${media.mobile`
    height: 32px;
  `}
`

const LeftCircleButton = styled(CircleButton)`
  left: 16px;
`
// TODO HIDE for linter
export const GalleryModal = ({current}) => {
  const {images, isShowPreview} = current.data
  //const [modalImages, setModalImages] = useState(images)
  const [modalImages, ] = useState(images)
  const [
    elRefs,
    setElRefs
  ] = React.useState(modalImages.map(() => createRef()))
  const [previewImageWidth, setPreviewImageWidth] = useState(0)
  const imageBlockRef = useRef(null)
  const isMobile = useSelector(state => state.consultation.mobile)
  const dispatch = useDispatch()
  const modalContainer = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(current.data.currentIndex)
  const currentImage = modalImages[currentIndex].path
  const canLeft = currentIndex > 0
  const canRight = currentIndex < modalImages.length - 1

  useEffect(() => {
    modalContainer.current.focus()
  })

  useEffect(() => {
    if(isShowPreview) {
      elRefs[currentIndex].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start'
      })
    }
  }, [currentIndex])

  useEffect(() => {
    setElRefs(elRefs => (
      Array(modalImages.length).fill().map((_, i) => elRefs[i] || createRef())
    ))
  }, [modalImages.length])

  useEffect(() => {
    if(isShowPreview) {
      setPreviewImageWidth(elRefs.slice(0, Math.min(elRefs.length, 4)).reduce((sum, item) => {
        return sum += item.current.getBoundingClientRect().width + 6
      }, 64))
    }
  }, [elRefs])

  const onKeyDown = (e) => {
    if(e.key === 'ArrowRight' && canRight) {
      setCurrentIndex(currentIndex + 1)
    } else if (e.key === 'ArrowLeft' && canLeft) {
      setCurrentIndex(currentIndex - 1)
    } else if (e.key === 'Escape') {
      dispatch.modal.deleteModal()
    }
  }

  // const onDeleteImage = async () => {
  //   const currentId = modalImages[currentIndex].id
  //   try {
  //     await FilesRepository.remove(currentId)
  //     if(currentIndex === modalImages.length - 1) {
  //       setCurrentIndex(modalImages.length - 2)
  //     }
  //     setModalImages(modalImages.filter(({id}) => id !== currentId))
  //   } catch (e) {
  //
  //   }
  // }

  // const onDownload = async () => {
  //   try {
  //     const data = await requestApi('get', `/file/${modalImages[currentIndex].id}`, null, null, null, null, {
  //       responseType: 'blob'
  //     })
  //
  //     const reader = new FileReader()
  //     reader.readAsDataURL(data)
  //     reader.onload = () => {
  //       const link = document.createElement('a')
  //       link.href = reader.result
  //       link.download = modalImages[currentIndex].title
  //       document.body.appendChild(link)
  //       link.click()
  //       document.body.removeChild(link)
  //     }
  //   } catch (e) {
  //
  //   }
  // }

  // const onSendChat = async () => {
  //   const data = await requestApi('get', `/file/${modalImages[currentIndex].id}`, null, null, null, null, {
  //     responseType: 'blob'
  //   })
  //
  //   const mimeType = modalImages[currentIndex].mimeType
  //   const title = modalImages[currentIndex].title
  //   const fileType = `.${mimeType.split('/')[1]}`
  //
  //   const file = new File([data], title.includes(fileType) ? title : title + fileType,{ type: mimeType })
  //
  //   dispatch.chat.sendFile(file)
  // }

  return (
    <ModalContainer onKeyDown={onKeyDown} ref={modalContainer} tabIndex={100}>
      {isMobile && <LeftCircleButton icon={'cross'} onClick={() => dispatch.modal.deleteModal()}/>}
      {isShowPreview && (
        <PreviewImageBlock width={`${previewImageWidth}px`} ref={imageBlockRef} minWidth={modalImages.length > 3 && '316px'} justify={modalImages.length <= 3 && 'flex-end'}>
          {modalImages.map((image, index) => <PreviewImage ref={elRefs[index]} key={index} src={image.path} isCurrent={index === currentIndex} onClick={() => setCurrentIndex(index)}/>)}
        </PreviewImageBlock>
      )}
      {/*{isShowPreview && (*/}
      {/*<ControlsButtonBlock*/}
      {/*onDelete={onDeleteImage}*/}
      {/*isMedcard*/}
      {/*onDownload={onDownload}*/}
      {/*onSendChat={onSendChat}*/}
      {/*/>*/}
      {/*)}*/}
      {(!isShowPreview || (isShowPreview && !isMobile)) && canLeft && (
        <ArrowContainer onClick={() => setCurrentIndex(currentIndex - 1)}>
          <Icon
            cursor={'pointer'}
            type={'arrow_left'}
            color={'black40'}
          />
        </ArrowContainer>
      )}
      {(!isShowPreview || (isShowPreview && !isMobile)) && canRight && (
        <ArrowContainer onClick={() => setCurrentIndex(currentIndex + 1)} isRight>
          <Icon
            cursor={'pointer'}
            type={'arrow_right'}
            color={'black40'}
          />
        </ArrowContainer>
      )}
      <Backdrop onClick={dispatch.modal.deleteModal}/>
      <ModalBody>
        <ModalImage src={currentImage} onClick={dispatch.modal.deleteModal}/>
        <BottomBlock onClick={dispatch.modal.deleteModal}>
          <Text
            color={'white'}
            size={'16px'}
            lineHeight={'24px'}
            align={'center'}
            padding={'24px 57px 0 0'}
          >
            {isShowPreview ? modalImages[currentIndex].title : `${currentIndex + 1} из ${modalImages.length}`}
          </Text>
        </BottomBlock>
      </ModalBody>
    </ModalContainer>
  )
}