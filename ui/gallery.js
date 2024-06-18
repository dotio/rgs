import React,{useRef, useEffect, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Wrapper} from './wrapper'
import {Img} from './img'
import styled from 'styled-components'
import {Text} from './text'
import {Icon} from './icon'

const GalleryWrapper = styled(Wrapper)`
  overflow: hidden;
  user-select: none;
`

const ImagesWrapper = styled(Wrapper)`
  display: flex;
  overflow-x: scroll;
  margin-bottom: -17px;
  padding-bottom: 17px;
  scroll-behavior: smooth;
`

const GalleryImage = styled(Img)`
  cursor: pointer;
`

export const Gallery = ({images = [], title = ''}) => {
  const dispatch = useDispatch()
  const imageNodes = []
  const imagesContainer = useRef(null)
  const [lastPickerIndex, setLastPickerIndex] = useState(0)
  let imagesWidth = []
  const canLeft = lastPickerIndex > 0
  const canRight = lastPickerIndex < images.length - 1

  useEffect(() => {
    imagesWidth = imageNodes.map(image => {
      return image.getBoundingClientRect().width
    })
  })

  const scrollController = (next) => {
    if (next) {
      const scroll = imagesWidth[lastPickerIndex] || 0
      imagesContainer.current.scrollLeft += scroll + 20

      return setLastPickerIndex(Math.min(lastPickerIndex + 1, images.length - 1))
    } else {
      const scroll = imagesWidth[lastPickerIndex - 1]
      imagesContainer.current.scrollLeft -= scroll - 20

      return setLastPickerIndex(Math.max(lastPickerIndex - 1, 0))
    }
  }

  return (
    <Wrapper gap={'16px'} flow={'column'}>
      <Wrapper align={'center'} justify={'space-between'}>
        <Text width={'auto'} size={'28px'} lineHeight={'32px'}>{title}</Text>
        <Wrapper width={'auto'}>
          <Icon
            onClick={() => scrollController(false)}
            cursor={'pointer'}
            type={'arrow_left'}
            color={canLeft ? 'black40' : 'black10'}
          />
          <Icon
            onClick={() => scrollController(true)}
            cursor={'pointer'}
            type={'arrow_right'}
            color={canRight ? 'black40' : 'black10'}
          />
        </Wrapper>
      </Wrapper>
      <GalleryWrapper>
        <ImagesWrapper ref={imagesContainer} gap={'20px'} width={'auto'}>
          {images && images.map((image, index) => (
            <GalleryImage
              onClick={() => dispatch.modal.addAndShowModal({type: 'gallery-modal', data: {images: images, currentIndex: index}})}
              key={index}
              ref={node => imageNodes[index] = node}
              borderRadius={'20px'}
              height={'200px'}
              src={image.path}
            />
          ))}
        </ImagesWrapper>
      </GalleryWrapper>
    </Wrapper>
  )
}