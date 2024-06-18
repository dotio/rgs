import React, {useState} from 'react'
import styled, {css} from 'styled-components'
import PropTypes from 'prop-types'
import {Icon} from '../../../ui/icon'
import {getColor} from '../../../ui/helpers/getColor'
import {Button} from '../../../ui/button'
import {media} from '../../../helpers/media'
import {T} from '../../../utils/translation'
import {Text} from '../../../ui/text'
import {FileControlsModal} from '../../chat/components/file-controls-modal'
import {Wrapper} from '../../../ui/wrapper'
import {isMobile} from 'react-device-detect'

const ControlsBlock = styled.div`
  position: absolute;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  cursor: pointer;
  bottom: 76px;
  left: 24px;
  opacity: 0;
  max-height: 0;
  transition: visibility 0s linear 0.5s, opacity 0.1s linear, max-height 0.1s linear;
  visibility: hidden;

  ${(p) => p.shown && css`
    visibility: visible;
    opacity: 1;
    max-height: 500px;
  `}
`


const ControlButton = styled(Button)`
  background-color: ${p => getColor('white', p.theme)};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.05);
  margin-top: 16px;
  width: auto;
`

const ClipContainer = styled.div`
  display: flex;
  width: auto;
  padding: 6px;
  background-color: ${p => getColor('primary', p.theme)};
  height: auto;
  border-radius: 50%;
  color: transparent;
`


const SendChatBlock = styled(Wrapper)`
  position: absolute;
  z-index: 4;
  border-radius: 20px;
  bottom: 6px;
  right: 6px;
  height: 56px;
  cursor: pointer;
  width: 316px;
`

const ControlsButton = styled(ControlButton)`
  position: absolute;
  z-index: 3;
  bottom: 24px;
  left: 24px;

  ${media.mobile`
    bottom: 16px;
    left: 16px;
  `}
`

const IconBox = styled.div`
  margin-right: 6px;
  display: inline-block;
`

export const ControlsButtonBlock = ({isMedcard, onDelete, onDownload, onSendChat}) => {
  const [showControls, setShowControls] = useState(false)

  const onControlButtonClick = () => {
    setShowControls(!showControls)
  }

  return (
    <>
      {isMobile && showControls && (
        <FileControlsModal
          extended={isMedcard}
          onClose={onControlButtonClick}
          onDelete={onDelete}
          onDownload={onDownload}
        />
      )}
      {!isMobile && (
        <ControlsBlock shown={showControls && !isMobile}>
          <ControlButton onClick={onDelete}>
            <IconBox><Icon type={'delete_16'} width={16} height={16} color={'black40'}/></IconBox><T ucFirst>chat.file.delete</T>
          </ControlButton>
          <ControlButton onClick={onDownload}>
            <IconBox><Icon type={'download'} width={16} height={16}/></IconBox>
            <T ucFirst>chat.file.download</T>
          </ControlButton>
          {/*<ControlButton onClick={() => {}}>*/}
          {/*<IconBox><Icon type={'share_arrow'} width={16} height={16}/></IconBox><T ucFirst>chat.file.share</T>*/}
          {/*</ControlButton>*/}
          {/*{isMedcard && (*/}
          {/*<ControlButton onClick={() => {}}>*/}
          {/*<IconBox><Icon type={'pencil_12'} width={12} height={12} color={'black40'}/></IconBox><T ucFirst>chat.file.rename</T>*/}
          {/*</ControlButton>*/}
          {/*)}*/}
        </ControlsBlock>
      )}
      {!isMobile && (
        <SendChatBlock onClick={onSendChat} padding={'8px 12px'} width={'auto'} align={'center'} gap={'45px'}>
          <ClipContainer>
            <Icon
              height={24}
              width={24}
              type={'clip'}
              color={'white'}
              shrink={'0'}
            />
          </ClipContainer>
          <Text color={'white'}>Отправить в чат</Text>
        </SendChatBlock>
      )}
      <ControlsButton onClick={onControlButtonClick}>
        <Icon type={'more'} width={16} height={16} color={'black'}/>
      </ControlsButton>
    </>
  )
}

ControlsButtonBlock.propTypes = {
  isMedcard: PropTypes.bool
}
