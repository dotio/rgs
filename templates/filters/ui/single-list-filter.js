import React, {useEffect, useState} from 'react'
import styled, {css} from 'styled-components'
import {getColor} from '../../../ui/helpers/getColor'
import {FilterButton} from '../../../ui/filter/filter-button'
import {Wrapper} from '../../../ui/wrapper'
import {useParentOffsetRef, useSub} from '../../../helpers/hooks'
import {useFilterOpenClose} from '../../../ui/filter/hooks'
import {media, sizes} from '../../../helpers/media'
import {Icon} from '../../../ui/icon'
import {SingleDropDown} from './single-list-dropdown'
import {useDispatch} from 'react-redux'
import PropTypes from 'prop-types'
import {Text} from '../../../ui/text'

const getPositionCss = position => {
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
  width: ${p => p.mobileWidth ? p.mobileWidth : 'auto'};
`

export const FilterDropDown = styled.div`
  position: absolute;
  overflow: hidden;
  z-index: 10000;
  padding: 16px 24px;
  width: 316px;
  border-radius: 20px;
  top: 100%;
  margin: ${p => p.isRecommendationModal ? '-89px 0 0' : '8px 0 0'};
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  background: ${p => getColor('white', p.theme)};
  ${p => getPositionCss(p.position)}

  ${media.mobile`
    position: fixed;
    height: fit-content;
    transform: translateY(-100%);
    left: 0;
    margin-left: 0;
    width: 100%;
    backdrop-filter: blur(100px);
  `}
`

export const SingleListFilter = ({
  isRecommendationModal,
  title,
  searchPlaceholder,
  options,
  value,
  onChange,
  withIcon,
  withSearch,
  isSelect,
  mobileWidth,
}) => {
  const dispatch = useDispatch()
  const [ref, offset] = useParentOffsetRef('calc-filter-resize') //TODO mb move to redux
  const [opened, setOpened, setMouseInside] = useFilterOpenClose()
  const [isMobile, setIsMobile] = useState(false)

  const position = offset
    ? offset.left === 0
      ? 'left'
      : offset.right < 100
        ? 'right'
        : 'center'
    : 'center'

  const selected = options.find(option => option.value === value)

  const onChangeClick = (value) => {
    onChange(value)
    setOpened(false)
    dispatch.modal.deleteTargetModal('single-list-mobile')
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
    isMobile && await dispatch.modal.addAndShowModal({type: 'single-list-mobile', data: {
      opened: openedValue, title, searchPlaceholder, options, value, withSearch, onChangeClick, withIcon, mobileWidth, isSelect, onChange
    }})
  }

  useSub(`open-${title.toLowerCase()}`, () => {
    setOpened(true)
  })

  return (
    <FilterContainer ref={ref} onMouseEnter={() => setMouseInside(true)} onMouseLeave={() => setMouseInside(false)} mobileWidth={mobileWidth}>
      <FilterButton onClick={() => openDropdown(!opened)} selected={value} mobileWidth={mobileWidth} isSelect={isSelect}>
        <Wrapper justify={withIcon ? 'space-between' : 'flex-start'} align={'center'} width={'100%'}>
          <Text ellipsis width={'auto'} color={'inherit'}>{selected ? selected.title : title}</Text>
          {withIcon && <Icon type={'arrow_down'} width={16} height={16} color={'black40'} />}
        </Wrapper>
      </FilterButton>
      {opened && !isMobile && (
        <FilterDropDown position={position} isRecommendationModal={isRecommendationModal}>
          <SingleDropDown
            opened={opened}
            title={title}
            searchPlaceholder={searchPlaceholder}
            options={options}
            value={value}
            withSearch={withSearch}
            onClick={onChangeClick}
          />
        </FilterDropDown>
      )}
    </FilterContainer>
  )
}
SingleListFilter.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  withIcon: PropTypes.bool,
  mobileWidth: PropTypes.string,
  withSearch: PropTypes.bool,
  isSelect: PropTypes.bool,
}

SingleListFilter.defaultProps = {
  withSearch: true,
  isSelect: false,
}
