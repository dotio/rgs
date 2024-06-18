import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import {getColor} from '../../../ui/helpers/getColor'
import {media} from '../../../helpers/media'
import {useFilterOpenClose} from '../../../ui/filter/hooks'
import {useParentOffsetRef} from '../../../helpers/hooks'
import {Text} from '../../../ui/text'
import {RadioButton} from '../../../ui/form/radio-button'
import {Wrapper} from '../../../ui/wrapper'
import {Icon} from '../../../ui/icon'
import {FilterButton} from '../../../ui/filter/filter-button'

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
  z-index: 10;
  padding: 16px 24px;
  width: 316px;
  border-radius: 20px;
  top: 100%;
  margin-top: 12px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
  background: ${p => getColor('white', p.theme)};
  ${p => getPositionCss(p.position)}
  
  ${media.mobile`
    position: fixed;
    top: auto;
    bottom: 0;
    left: 0;
    margin-left: 0;
    width: 100%;
    border-radius: 20px 20px 0 0;
  `}
`

export const RadioListFilter = ({withIcon, title, modal}) => {
  const [ref, offset] = useParentOffsetRef('calc-filter-resize')
  const [opened, setOpened, setMouseInside] = useFilterOpenClose()

  const position = offset ? (offset.left === 0 ? 'left' : (offset.right < 100 ? 'right' : 'center')) : 'center'

  const listItems = modal.elements ? modal.elements.map((element) =>
    <RadioButton
      id={element.id}
      text={element.title}
      checked={element.id === modal.selectedSortBy}
      onClick={() => {
        modal.onChange(element.id, element.order)
      }}
    />
  ): []

  return (
    <FilterContainer
      ref={ref}
      onMouseEnter={() => setMouseInside(true)}
      onMouseLeave={() => setMouseInside(false)}>
      <FilterButton onClick={() => setOpened(!opened)} >
        <Wrapper justify={withIcon ? 'space-between' : 'flex-start'} align={'center'}>
          {title}
          {withIcon && <Icon type={'arrow_down'} width={16} height={16} color={'black40'} />}
        </Wrapper>
      </FilterButton>
      {opened && <FilterDropDown position={position}>
        <Text
          size={'20px'}
          lineHeight={'30px'}
          color={'black50'}
          padding={'0 0 8px 0'}>
          {modal.title ? modal.title : title}
        </Text>
        {listItems}
      </FilterDropDown>}
    </FilterContainer>
  )

}

RadioListFilter.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  modal: PropTypes.object,

}