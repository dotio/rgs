import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import {useDropzone} from 'react-dropzone'
import {Wrapper} from './wrapper'
import {Text} from './text'
import { getColor } from './helpers/getColor'
import { media } from '../helpers/media'
import {Avatar} from './avatar'

const StyledText = styled(Text)`
  ${p => p.changeExistedPhoto && css`
    font-size: 20px;
    line-height: 30px;
  `}
`

const DescriptionText = styled(Text)`
  ${p => p.changeExistedPhoto && css`
    font-size: 20px;
    line-height: 30px;

    ${media.mobile`
      font-size: 16px;
      line-height: 24px;
    `}
  `}
`

const ChangeText = styled(Text)`
  ${p => p.changeExistedPhoto && css`
    color: ${p => getColor('black50', p.theme)};

    ${media.mobile`
      padding-left: 20px;
      color: #28C387;
    `}
  `}
`

const ClickableWrapper = styled(Wrapper)`
  cursor: pointer;
  
  &:focus {
    outline: none;
  }
`

const ACCEPTED_FORMATS = ['.jpg', '.jpeg', '.png']
const MAX_SIZE = 2 * 1024 * 1024

export const ImageUpload = ({image = '', text, changeExistedPhoto, onAddFile, aboutBlock}) => {
  const onChange = (files) => {
    if (onAddFile && files[0]) {
      onAddFile(files[0])
    }
  }

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({accept: ACCEPTED_FORMATS, maxSize: MAX_SIZE, onDropAccepted: onChange})

  return (
    <Wrapper flow={'column'} justify={'center'}>
      <StyledText changeExistedPhoto={changeExistedPhoto}>Фотография</StyledText>
      <DescriptionText color={'black50'} changeExistedPhoto={changeExistedPhoto}>
        {changeExistedPhoto ? 'Консультантам и врачам будет приятно видеть, с кем они ведут диалог в чате.' : 'Если есть'}
      </DescriptionText>
      <Wrapper align={'center'} margin={'8px 0 0'} width={'auto'}>
        <ClickableWrapper align={'center'} width={'auto'} {...getRootProps()}>
          <Avatar aboutBlock={aboutBlock} fromList src={image ? image : '/static/avatars/dashed.svg'} height={'80px'} minHeight={'80px'} width={'80px'}/>
          <ChangeText
            changeExistedPhoto={changeExistedPhoto}
            padding={'0 0 0 16px'}
            size={'16px'}
            lineHeight={'24px'}
            align={'left'}
            color={'primary'}
            pointer
            width={'auto'}
          >
            {text}
          </ChangeText>
          <input {...getInputProps()} />
        </ClickableWrapper>
      </Wrapper>
    </Wrapper>
  )
}

ImageUpload.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string,
  changeExistedPhoto: PropTypes.bool,
  onAddFile: PropTypes.func,
}