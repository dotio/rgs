import React, {useEffect, useState} from 'react'
import styled, {css} from 'styled-components'
import {getColor} from '../../../ui/helpers/getColor'
import {FilterButton} from '../../../ui/filter/filter-button'
import {Wrapper} from '../../../ui/wrapper'
import {useParentOffsetRef} from '../../../helpers/hooks'
import {useFilterOpenClose} from '../../../ui/filter/hooks'
import {media, sizes} from '../../../helpers/media'
import {getPlaceholder} from '../../../ui/filter/helpers'
import {Circle} from '../../../ui/circle'
import {useDispatch} from 'react-redux'
import {MultiDropDown} from './multi-list-dropdown'
import PropTypes from 'prop-types'

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
  display:inline-block;
  position: relative;
`
const FilterDropDown = styled.div`
  position: absolute;
  overflow: hidden;
  z-index: 10;
  padding: 16px 24px;
  width: 316px;
  border-radius: 20px;
  top: 100%;
  margin-top: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  background: ${p => getColor('white', p.theme)};
  ${p => getPositionCss(p.position)}
  
  ${media.mobile`
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    margin-left: 0;
    width: 100%;
    backdrop-filter: blur(100px);
  `}
`

export const MultiListFilter = ({
  searchPlaceholder,
  options,
  title,
  initialValue,
  onChange,
  withSearch,
  withMetroColor,
  renderItem,
  orderTypePadding,
  orderTypeWithoutMinHeight
}) => {
  const dispatch = useDispatch()
  const [ref, offset] = useParentOffsetRef('calc-filter-resize')
  const [opened, setOpened, setMouseInside] = useFilterOpenClose()
  const [isMobile, setIsMobile] = useState(false)
  const isSelected = options.filter(option => initialValue.includes(option.value)).length > 0
  const metro = options && options.find(({value}) => value === initialValue)
  const metroColor = metro && metro.color
  const position = offset ? (offset.left === 0 ? 'left' : (offset.right < 100 ? 'right' : 'center')) : 'center'

  const resetValue = () => {
    dispatch.modal.deleteAllModals()
    onChange([])
    setOpened(false)
  }

  const applyValue = (value) => {
    dispatch.modal.deleteAllModals()
    onChange(value.length > 1 ? value.join('/') : value.join(''))
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
  })

  const openDropdown = async (openedValue) => {
    await setOpened(openedValue)
    isMobile && await dispatch.modal.addAndShowModal({type: 'multi-list-mobile', data: {
      opened: openedValue,
      title,
      searchPlaceholder,
      options,
      renderItem,
      value: initialValue.length > 1 ? initialValue.split('/') : initialValue,
      resetValue,
      applyValue,
      withSearch,
      orderTypePadding,
      orderTypeWithoutMinHeight
    }})
  }

  return (
    <FilterContainer ref={ref} onMouseEnter={() => setMouseInside(true)} onMouseLeave={() => setMouseInside(false)}>
      <FilterButton
        onClick={() => options.length ? openDropdown(!opened) : null}
        selected={isSelected}
        disabled={options.length === 0}
      >
        <Wrapper align={'center'} gap={'6px'}>
          {metroColor && withMetroColor && <Wrapper padding={'0 8px 0 0'}><Circle size={12} hexColor={metroColor}/></Wrapper>}
          {getPlaceholder(initialValue, options, title)}
        </Wrapper>
      </FilterButton>
      {opened && !isMobile && <FilterDropDown position={position}>
        <MultiDropDown
          orderTypeWithoutMinHeight={orderTypeWithoutMinHeight}
          orderTypePadding={orderTypePadding}
          opened={opened}
          title={title}
          searchPlaceholder={searchPlaceholder}
          options={options}
          renderItem={renderItem}
          value={initialValue.length > 1 ? initialValue.split('/') : initialValue}
          withSearch={withSearch}
          resetValue={resetValue}
          applyValue={applyValue}
        />
      </FilterDropDown>}
    </FilterContainer>
  )
}
MultiListFilter.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  initialValue: PropTypes.string,
  onChange: PropTypes.func,
  renderItem: PropTypes.func,
  withSearch: PropTypes.bool,
  withMetroColor: PropTypes.bool,
}

MultiListFilter.defaultProps = {
  withSearch: true,
}