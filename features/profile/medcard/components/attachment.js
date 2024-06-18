import React, {useEffect, useRef} from 'react'
import {useState} from 'react'
import styled from 'styled-components'
import {Wrapper} from '../../../../ui/wrapper'
import {Text} from '../../../../ui/text'
import {Icon} from '../../../../ui/icon'
import {Input} from '../../../../ui/form/input'
import {useSelector} from 'react-redux'
import {getTranslator} from '../../../../utils/translation'

const ClickableText = styled(Text)`
  cursor: pointer;
`

const ClickableIcon = styled(Icon)`
  cursor: pointer;
`

export const Attachment = ({src, width, height, minHeight, name, onRename, onDelete}) => {
  const [editMode, setEditMode] = useState(false)
  const [inputValue, setInputValue] = useState(name)
  const translator = useSelector(state => getTranslator(state.localization))
  const renameInput = useRef(null)

  const toggleEditMode = async () => {
    if (editMode) {
      setEditMode(false)
      onRename(inputValue)
    } else {
      await setEditMode(true)
      renameInput.current.focus()
    }
  }

  const ImageUrl = styled.div`
  background-image: ${p => `url(${p.src})`};
  width: ${p => p.width};
  height: ${p => p.height};
  position: relative;
  flex-shrink: 0;
  min-height: ${p => p.minHeight};
  flex-grow: 0;
  background-size: ${p => p.isAutoWidth ? 'cover' : '100% auto'};
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 4px;
`

  const [isAutoWidth, setIsAutoWidth] = useState(false)

  useEffect(() => {
    let img = new Image()
    img.onload = function () {
      setIsAutoWidth(img.width >= img.height)
    }
    img.src = src
  }, [])

  return (
    <Wrapper align={'center'} justify={'flex-start'}>
      <Wrapper align={'center'} justify={'flex-start'}>
        <ImageUrl src={src} height={height} width={width} minHeight={minHeight} isAutoWidth={isAutoWidth}/>
        <Wrapper align={'flex-start'} flexWrap gap={'8px'} padding={'0 0 0 16px'}>
          {editMode
            ? <Input hideBorder borderColor={null} size={'16px'} value={inputValue} onChange={(e) => setInputValue(e.target.value)} ref={renameInput}/>
            : <Text width={'auto'}>{name}</Text>
          }
          {onRename && <ClickableText width={'auto'} color={'primary'} onClick={toggleEditMode}>
            {editMode ? translator('files.attach.save', true) : translator('files.attach.rename', true)}
          </ClickableText>}
        </Wrapper>
      </Wrapper>
      {!editMode && <ClickableIcon type={'delete_trash'} color={'black40'} width={24} height={24} onClick={onDelete} />}
    </Wrapper>
  )
}

Attachment.defaultProps = {
  width: '64px',
  height: '64px',
  minHeight: '64px',
}