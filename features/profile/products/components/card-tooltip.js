import React, {useState} from 'react'
import styled from 'styled-components'
import {Icon} from '../../../../ui/icon'
import {Popover} from '../../../../ui/popover'
import {Text} from '../../../../ui/text'
import {Wrapper} from '../../../../ui/wrapper'

const TooltipWrapper = styled(Wrapper)`
  cursor: pointer;
`

export const CardTooltip = ({description}) => {
  const [isOpen, setOpen] = useState(false)


  return (
    <TooltipWrapper width={'auto'} onMouseEnter={() => !isOpen && setOpen(true)} onMouseLeave={()  =>isOpen && setOpen(false)}>
      {isOpen && <Popover maxHeight={'250px'} overflow={'auto'} type={'top'} isOpen={isOpen} width={'320px'} left={'0'} top={'25px'}>
        <Wrapper padding={'12px'}>
          <Text color={'white'} dangerouslySetInnerHTML = {{__html: description}} />
        </Wrapper>
      </Popover>}
      <Icon type={'info'} width={20} height={20} color={isOpen ? 'black' : 'black40'} cursor={'pointer'}/>
    </TooltipWrapper>
  )
}