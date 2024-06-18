import React, { useState, useRef } from 'react'
import styled, { css } from 'styled-components'
import { Text } from './text'
import { Wrapper } from './wrapper'
import { media } from '../helpers/media'
import { Icon } from './icon'
import { Divider } from './divider'

const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  height: 0;
  transition: height 0.3s;  
  ${(p) => p.open && css`
    height: ${p.contentHeight}px;
  `}
`
const WrapperBlock = styled(Wrapper)`
  cursor: pointer;
`
const TitleText = styled(Text)`
  font-size: 20px;
  line-height: 30px;

  ${media.mobile`
    font-size: 16px;
    line-height: 24px;
  `}
`
const CountBlock = styled(Wrapper)`
  width: 30px;
  height: 30px;
  font-size: 20px;
  color: white; 
  flex-shrink: 0;
  background: linear-gradient(147.74deg, #40B2C9 13.44%, #55DF94 85.6%);
  border-radius: 100%; 
  
   ${media.mobile`
    font-size: 16px;
    min-width: 24px;
    min-height: 24px;
  `}
`

export const Accordion = ({ title, selected, dividerMargin = '0', children, smDividerMargin }) => {
  const [open, toggleOpen] = useState(false)
  const [accordionContentHeight, setAccordionContentHeight] = useState(0)
  const accordionContent = useRef(null)
  const handleClickAccordion = () => {
    toggleOpen(!open)
    setAccordionContentHeight(accordionContent.current.offsetHeight)
  }

  return (
    <Wrapper flow={'column'}>
      <WrapperBlock onClick={handleClickAccordion} open={open} align={'center'} padding={'10px 0'}>
        <WrapperBlock align={'center'}>
          <TitleText color={'black50'} width={'auto'} padding={'0 8px 0 0'}>
            {title}
          </TitleText>
          {selected && selected.length > 0 && <CountBlock align={'center'} justify={'center'}>{selected.length}</CountBlock>}
        </WrapperBlock>
        <Icon
          width={24}
          height={24}
          shrink={'0'}
          type={open ? 'circle_minus' : 'circle_plus'}
          color={open ? 'black' : 'black40'}
        />
      </WrapperBlock>
      <AccordionContainer open={open} contentHeight={accordionContentHeight}>
        <div ref={accordionContent}>
          {children}
        </div>
      </AccordionContainer>
      <Divider margin={dividerMargin} smMargin={smDividerMargin} color={open ? 'transparent' : 'black10'} />
    </Wrapper>
  )
}
