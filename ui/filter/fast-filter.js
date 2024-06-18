import PropTypes from 'prop-types'
import React, {useState} from 'react'
import styled, {css} from 'styled-components'

import {getColor} from '../helpers/getColor'
import {Text} from '../text'
import {FilterButton} from './filter-button'
import {Wrapper} from '../wrapper'
import {Button} from '../button'
import {useParentOffsetRef, useSub} from '../../helpers/hooks'
import {media} from '../../helpers/media'
import {useFilterOpenClose} from './hooks'

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
  `}
`

export const FastFilter = ({title, placeholder, initialValue, onChange, multi, requiredBottomControlPanel = true, render}) => {
  const [ref, offset] = useParentOffsetRef('calc-filter-resize')//TODO mb move to redux
  const [opened, setOpened, setMouseInside] = useFilterOpenClose()

  const position = offset ? (offset.left === 0 ? 'left' : (offset.right < 100 ? 'right' : 'center')) : 'center'

  useSub(`open-${title.toLowerCase()}`, () => {
    setOpened(true)
  })

  const [value, setValue] = useState(initialValue)

  const reset = () => {
    setValue([])
    onChange([])
    setOpened(false)
  }
  const apply = () => {
    onChange(value)
    setOpened(false)
  }

  const selected = initialValue.length > 0 || value.length > 0

  return (
    <FilterContainer ref={ref} onMouseEnter={() => setMouseInside(true)} onMouseLeave={() => setMouseInside(false)}>
      <FilterButton onClick={() => setOpened(!opened)} selected={initialValue.length > 0}>{placeholder}</FilterButton>
      {opened && <FilterDropDown position={position}>
        <Text size={'20px'} lineHeight={'30px'} color={'black50'}>{title}</Text>
        <Wrapper flow={'column'} justify={'center'} align={'stretch'} padding={'16px 0 0 0'}>
          {render(value, (value) => {
            setValue(value)
            if (!multi) {
              onChange(value)
              setOpened(false)
            }
          })}
        </Wrapper>
        {selected && requiredBottomControlPanel &&
          <Wrapper justify={(selected && multi) ? 'space-between' : 'flex-end'} align={'center'} padding={'24px 0 0 0'}>
            {selected && <FilterButton onClick={reset}>Очистить</FilterButton>}
            {multi && <Button onClick={apply} color={'black05'}>Применить</Button>}
          </Wrapper>
        }
      </FilterDropDown>}
    </FilterContainer>
  )
}

FastFilter.propTypes = {
  title: PropTypes.string,
  placeholder: PropTypes.any,
  initialValue: PropTypes.string,
  onChange: PropTypes.func,
  render: PropTypes.func,
  multi: PropTypes.bool,
  requiredBottomControlPanel: PropTypes.bool,
}

FastFilter.defaultProps = {
  initialValue: [],
  selectedText: null,
  multi: true,
}