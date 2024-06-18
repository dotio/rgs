import React from 'react'
import styled from 'styled-components'
import {getColor} from './getColor'

const FileLink = styled.a`
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: ${p => p.size};
  line-height: ${p => p.lineHeight};
  text-transform: uppercase;
  color: ${p => getColor('black50', p.theme)};
  background-color: ${p => p.smallCard ? getColor('black10', p.theme) : getColor('black05', p.theme)};
  height: ${p => p.height};
  width: ${p => p.width};
`

export const FileCoverComponent = ({title, size, lineHeight, width, height, download, url, smallCard}) => (
  <FileLink href={url} download={download} size={size} height={height} lineHieght={lineHeight} width={width} smallCard={smallCard}>
    {title}
  </FileLink>
)

export const fileExtensionChecker = (extension) => {
  if(extension && extension.includes('.xls') || extension.includes('.xlsm') || extension.includes('.xlsx')){
    return '/static/icons/xls.svg'
  }
  if(extension && extension.includes('.pdf')){
    return '/static/icons/pdf.svg'
  }
  if(extension && extension.includes('.doc')){
    return '/static/icons/doc.svg'
  }
  if(extension && extension.includes('.txt')){
    return '/static/icons/txt.svg'
  }

  return false
}


export const mimeTypeChecker = (mimeType) => {
  if(mimeType && mimeType.includes('excel')){
    return 'xls'
  }
  if(mimeType && mimeType.includes('pdf')){
    return 'pdf'
  }
  if(mimeType && mimeType.includes('word')){
    return 'doc'
  }
  if(mimeType && mimeType.includes('plain')){
    return 'txt'
  }

  return false
}

export const createdMimeTypeChecker = (mimeType) => {
  if(mimeType && mimeType.includes('excel')){
    return '/static/icons/xls.svg'
  }
  if(mimeType && mimeType.includes('pdf')){
    return '/static/icons/pdf.svg'
  }
  if(mimeType && mimeType.includes('word')){
    return '/static/icons/doc.svg'
  }
  if(mimeType && mimeType.includes('plain')){
    return '/static/icons/txt.svg'
  }

  return false
}