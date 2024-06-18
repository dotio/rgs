import React, {useState, useRef} from 'react'
import styled, {css} from 'styled-components'
import {Wrapper} from './wrapper'
import {Icon} from './icon'
import {getColor} from './helpers/getColor'
import {MediumText} from './medium-text'

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
  transition: height 0.3s;
  ${(p) =>
    p.open &&
    css`
      height: ${p.contentHeight}%;
    `}
`

const DotsIcon = styled.span`
  display: flex;
  background: ${p => getColor('black10', p.theme)};
  border-radius: 16px;
  width: 32px;
  height: 20px;
  justify-content: center;
  align-items: center;
`

const DotsWrapper = styled.div`
  display: inline-block;
  margin-left: 7px;
`

const TextSpan = styled.span``

export const TextShow = ({text, length}) => {
  const [open, toggleOpen] = useState(false)
  const [textContentHeight, setTextContentHeight] = useState(0)
  const textContent = useRef(null)

  const handleClickText = () => {
    toggleOpen(!open)
    setTextContentHeight(100)
  }

  const textEllipsis = (text, length) => {
    let textArr = text.split(' ')
    let string = ''
    let completeConcat = false
    textArr.forEach((word, index) => {
      if(completeConcat) {
        return
      }
      if ((string + ' ' + word).length < length) {
        string += index === 0 ? word : ' ' + word
      } else {
        completeConcat = true
      }
    })
    return string
  }

  return (
    <Wrapper align={'flex-end'}>
      <TextContainer ref={textContent} open={open} contentHeight={textContentHeight}>
        <MediumText>
          {!open
            ? <>
              <TextSpan dangerouslySetInnerHTML={{__html:  textEllipsis(text, length)}} />
              {text.length < length ? '' :
                <DotsWrapper>
                  <DotsIcon>
                    <Icon
                      onClick={handleClickText}
                      type={'dots_16'}
                      color={'black50'}
                      width={16}
                      height={16}
                      shrink={'0'}
                      cursor={'pointer'}
                    />
                  </DotsIcon>
                </DotsWrapper>
              }
            </>
            : <TextSpan dangerouslySetInnerHTML={{__html:  text}} />
          }
        </MediumText>
      </TextContainer>
    </Wrapper>
  )
}
