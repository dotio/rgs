import React from 'react'
import {Wrapper} from '../../../../ui/wrapper'
import {Img} from '../../../../ui/img'
import {DataRow} from '../../../../ui/data-row'
import {MediumText} from '../../../../ui/medium-text'

export const DataRowWithImage = ({src, label, value, borderRadius, imageAlign = 'center', children, description}) => {
  return (
    <DataRow label={label}>
      <Wrapper align={imageAlign}>
        {description && <MediumText whiteSpace={'nowrap'} padding={'0 8px 0 0'} width={'auto'}>{description}</MediumText>}
        <Wrapper padding={imageAlign ? '3px 0 0' : '0'} width={'auto'}>
          <Img width={'24px'} height={'24px'} borderRadius={borderRadius} shrink={'0'} src={src}/>
        </Wrapper>
        <MediumText padding={'0 0 0 8px'}>{value}</MediumText>
      </Wrapper>
      {children}
    </DataRow>
  )
}