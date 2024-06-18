import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import React, {useEffect, useState} from 'react'
import {FilterButton} from '../../../ui/filter/filter-button'
import {useParentOffsetRef} from '../../../helpers/hooks'
import {useFilterOpenClose} from '../../../ui/filter/hooks'
import {media, sizes} from '../../../helpers/media'
import {SwitcherDropDown} from './switcher-dropdown'
import {useDispatch} from 'react-redux'
import {getColor} from '../../../ui/helpers/getColor'

const getPositionCss = (position) => {
  switch (position) {
    case 'left':
      return 'left: 0;'
    case 'right':
      return 'right: 0;'
    default:
      return css`
        left: 50%;
        margin-left: -158px;
      `
  }
}

const FilterContainer = styled.div`
  display: inline-block;
  position: relative;
`

const FilterDropDown = styled.div`
  position: absolute;
  z-index: 10;
  padding: 16px 24px 24px 24px;
  width: 316px;
  border-radius: 20px;
  top: 100%;
  margin-top: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  background: ${p => getColor('white', p.theme)};
  ${p => getPositionCss(p.position)}
  
  ${media.mobile`
    position: static;
    padding: 20px 16px;
  `}
`

export const SwitchFilter = ({title, innerTitle, value, text, onChange}) => {
  const dispatch = useDispatch()
  const [ref, offset] = useParentOffsetRef('calc-filter-resize')//TODO mb move to redux
  const [opened, setOpened, setMouseInside] = useFilterOpenClose()
  const [isMobile, setIsMobile] = useState(false)

  const position = offset ? (offset.left === 0 ? 'left' : (offset.right < 200 ? 'right' : 'center')) : 'center'

  const onSwitchClicked = async () => {
    await onChange(!value || '')
    setOpened(false)
  }

  useEffect(() => {
    const resizeListener = () => {
      if (document.documentElement.clientWidth <= sizes.mobile) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

    resizeListener()

    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  const openDropdown = async (openedValue) => {
    await setOpened(openedValue)
    isMobile && await dispatch.modal.addAndShowModal({type: 'switcher-dropdown-mobile', data: {
      opened: openedValue, position, title, innerTitle, text, active: value, onSwitchClicked
    }})
  }

  return (
    <FilterContainer ref={ref} onMouseEnter={() => setMouseInside(true)} onMouseLeave={() => setMouseInside(false)}>
      <FilterButton onClick={() => openDropdown(!opened)} selected={value}>{title}</FilterButton>
      {!isMobile && opened && <FilterDropDown position={position}>
        <SwitcherDropDown
          opened={opened}
          position={position}
          title={title}
          innerTitle={innerTitle}
          text={text}
          onClick={onSwitchClicked}
          active={value}
        />
      </FilterDropDown>}
    </FilterContainer>
  )
}
SwitchFilter.propTypes = {
  title: PropTypes.string,
  innerTitle: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
}