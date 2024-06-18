import PropTypes from 'prop-types'
import {useDropzone} from 'react-dropzone'
import styled, {css} from 'styled-components'
import {Text} from './text'
import {Wrapper} from './wrapper'
import {getColor} from './helpers/getColor'
import {media} from '../helpers/media'

const Container = styled(Wrapper)`
  border-width: 2px;
  border-color: ${p => getColor('primary', p.theme)};
  border-style: dashed;
  background-color: ${p => getColor('black05', p.theme)};
  border-radius: 20px;
  height: 100%;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
  outline: none;

  ${p => p.isDragActive && css`
    background-color: ${p => getColor('black10', p.theme)};
  `}
`

const StyledText = styled(Text)`
  max-width: 354px;
  padding: 54px 0;

  ${media.mobile`
    font-size: 20px;
    line-height: 30px;
    padding: 54px 39px;
  `}
`

export const FileUploader = ({text, dragActiveText, maxSize, accept, onChange}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({accept, maxSize, onDropAccepted: onChange})
  return (
    <Container align={'center'} justify={'center'} {...getRootProps({isDragActive})}>
      <input {...getInputProps()} />
      <StyledText size={'28px'} lineHeight={'32px'} color={'primary'} align={'center'}>
        {isDragActive && dragActiveText ? dragActiveText : text}
      </StyledText>
    </Container>
  )
}

FileUploader.proptypes = {
  text: PropTypes.string,
  dragActiveText: PropTypes.string,
  accept: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onChange: PropTypes.func,
  maxSize: PropTypes.number,
}