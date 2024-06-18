import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled, {css} from 'styled-components'
import {getColor} from '../helpers/getColor'
import {Icon} from '../icon'
import {useDropdownOpenClose} from './hooks'
import {media} from '../../helpers/media'
import {isMobile} from 'react-device-detect'

const MainBlock = styled.div`
  margin: ${p => p.margin ? p.margin : '0 0 20px'};
  border: 1px solid ${p => p.opened ? 'transparent' : getColor('black20', p.theme)};
  box-sizing: border-box;
  border-radius: 100px;
  width: 354px;
  ${media.mobile`
    width: 100%;
  `}
`

const DropDownBox = styled.div`
  min-height: 60px;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`

const SelectContainer = styled.div`
  position: ${p => p.opened ? 'absolute' : 'relative'};
  z-index: ${p => p.opened ? '5000' : '0'};
  width: 100%;
  border-radius:${p => p.opened ? '16px' : '100px'};
  background-color:  ${p => getColor('white', p.theme)};
  outline: 0;
  flex-shrink: 0;
  color:  ${p => getColor(p.color, p.theme)};
  box-shadow: ${p => p.opened ? '0px 4px 10px rgba(0, 0, 0, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.05)' : 'none'};
  @media (max-width: 768px) {
    z-index: 0;
  }
`

const ArrowIcon = styled(Icon)`
  position: absolute;
  top: 22px;
  right: 24px;
  z-index: 1;
  ${media.mobile`
    z-index: 0;
  `}
  
  ${p => p.opened && css`
    transform: rotate(180deg);
  `}
`

export const SelectDropdown = ({disabled, margin, renderSelected, renderItems, renderAdd, mobileModal}) => {
  const dispatch = useDispatch()
  const [opened, setOpened, setMouseInside] = useDropdownOpenClose()
  const isAddressChange = useSelector(state => state.profileSettings.isAddressChange)
  const selected = renderSelected()
  const items =  renderItems(opened)
  const added = renderAdd && renderAdd()

  useEffect(() => {
    if (isMobile && mobileModal && opened) {
      dispatch.modal.addAndShowModal({type: mobileModal, data: {items: items.concat(added)}})
    }
    if (!isMobile && mobileModal) {
      dispatch.modal.deleteTargetModal(mobileModal)
    }
  }, [isMobile, mobileModal, opened])

  useEffect(() => {
    if(isAddressChange) {
      setOpened(false)
      isMobile && mobileModal && dispatch.modal.deleteTargetModal(mobileModal)
    }
  }, [isAddressChange])

  return (
    <MainBlock margin={margin} opened={opened}>
      <DropDownBox onMouseEnter={() => setMouseInside(true)} onMouseLeave={() => setMouseInside(false)} onClick={() => !disabled && setOpened(!opened)}>
        <SelectContainer opened={opened}>
          {items.length > 0 || opened ? selected : added}
          {opened && !(mobileModal && isMobile) && <>
            {items}
            {added}
          </>}
        </SelectContainer>
        <ArrowIcon type={'arrow_down'} opened={opened} width={16} height={16} color={disabled ? 'black20' :'black'} cursor={disabled ? 'default' : 'pointer'}/>
      </DropDownBox>
    </MainBlock>
  )
}