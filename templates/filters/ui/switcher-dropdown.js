import React from 'react'
import {Text} from '../../../ui/text'
import {Wrapper} from '../../../ui/wrapper'
import {Switch} from '../../../ui/switch'

export const SwitcherDropDown = ({opened, title, text, innerTitle, active, onClick}) => {
  if(!opened) {
    return null
  }

  return <>
    <Text size={'20px'} lineHeight={'30px'} smSize={'28px'} smLineHeight={'24px'}>{title}</Text>
    <Wrapper flow={'column'} justify={'center'} align={'stretch'} padding={'16px 0 0'} mobilePadding={'24px 0 0'}>
      <Wrapper>
        <div>
          <Text>{innerTitle}</Text>
          <Text color={'black50'}>{text}</Text>
        </div>
        <Switch onClick={onClick} active={active}/>
      </Wrapper>
    </Wrapper>
  </>
}