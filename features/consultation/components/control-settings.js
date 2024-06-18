import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import {Text} from '../../../ui/text'
import {Icon} from '../../../ui/icon'
import {Button} from '../../../ui/button'
import {Wrapper} from '../../../ui/wrapper'
import {media} from '../../../helpers/media'
import {T} from '../../../utils/translation'

const ControlSettingsWrapper = styled(Wrapper)`
  ${media.mobile`
    position: relative;
    padding: 0;
    align-items: flex-start;    
  `} 
  
  svg {
    width: 16px;
    height: 16px;
  }
  ${media.mobile`
    svg {
      width: 24px;
      height: 24px;
    } 
  `}
`
const SettingsButton = styled(Button)`
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.05);
  ${media.mobile`
    margin-bottom: 0;
    box-shadow: none;
    border: none;
    padding: 0;
    &:hover {
      background: none;
      border: none;
    }
  `}
`
const StyledIcon = styled(Icon)`
  margin-right: 7px;
  ${media.mobile`
    margin-right: 16px;
  `}
`

export const ControlSettings = () => {
  const dispatch = useDispatch()
  const isSearchBlock = useSelector(state => state.consultation.searchBlock)
  const isMobile = useSelector(state => state.consultation.mobile)

  const onSearchClick = () => {
    if (!isMobile) {
      dispatch.consultation.setSearchBlock(true)
      dispatch.consultation.showSettingsBlock(false)
    }

    if (isMobile && !isSearchBlock) {
      dispatch.modal.deleteModal()
      dispatch.consultation.setSearchBlock(true)
    }

    if (isMobile && isSearchBlock) {
      dispatch.consultation.setSearchBlock(false)
      dispatch.modal.addAndShowModal({type: 'control-settings'})
    }
  }

  return (
    <ControlSettingsWrapper flow={'column'} width={'auto'} align={'flex-end'} gap={'6px'} mobileGap={'20px'}>
      <SettingsButton onClick={onSearchClick}>
        <Wrapper align={'center'}>
          <StyledIcon type={'search_16'} color={'black40'}/>
          <Text width={'auto'}><T ucFirst>consultation.control-settings.search</T></Text>
        </Wrapper>
      </SettingsButton>
      <SettingsButton onClick={() => {
        dispatch.modal.deleteModal()
        dispatch.modal.addAndShowModal({type: 'check-connection'})
        dispatch.consultation.showSettingsBlock(false)
      }}>
        <Wrapper align={'center'}>
          <StyledIcon type={'settings'} color={'black40'}/>
          <Text width={'auto'}><T ucFirst>consultation.control-settings.check</T></Text>
        </Wrapper>
      </SettingsButton>
    </ControlSettingsWrapper>
  )
}