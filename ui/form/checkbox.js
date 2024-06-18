import React from 'react'
import styled, {css} from 'styled-components'
import PropTypes from 'prop-types'
import {getColor} from '../helpers/getColor'
import {Text} from '../text'
import {Icon} from '../icon'
import {Wrapper} from '../wrapper'

const Check = styled.div`
  height: 20px;
  width: 20px;
  border: 1px solid ${p => getColor(p.checked ? 'primary' : 'black50', p.theme)};
  background: ${p => getColor(p.checked ? 'primary' : 'white', p.theme)};
  box-sizing: border-box;
  border-radius: 4px;
  display: inline-block;
  flex-shrink: 0;
  flex-grow: 0;
  padding: 1px;
  margin-top: ${p => p.noMargin ? '0' : '2px'};
  
  ${p => p.disabled && css`
    border: 1px solid ${getColor('black20', p.theme)};
    background: ${getColor('black10', p.theme)};
  `}
`

const CheckboxContainer = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
  width: 100%;
`

const CheckboxWrapper = styled.div`
  display: flex;
  cursor: pointer;
  width: 100%;
  align-items: ${p => p.alignItems ? p.alignItems : 'center'};
  ${p => p.paddingTop && `
    padding-top: ${p.paddingTop};
  `}
`

const Title = styled(Text)`
  padding: 0 0 0 10px;
  ${p => p.disabled && css`
    color: ${getColor('black20', p.theme)};
  `}
`

const SubTitle = styled(Text)`
  padding: 0 0 0 10px;
  line-height: 24px;
  vertical-align: middle;
  font-size: 16px;
  color: ${p => getColor('black50', p.theme)}
`

export const Checkbox = ({
  title,
  subTitle,
  alignItems,
  paddingTop,
  tooltip,
  checked,
  renderItem,
  onClick,
  disabled,
  noMargin,
}) => {
  return (
    <CheckboxContainer>
      <CheckboxWrapper
        onClick={!disabled ? onClick : null}
        alignItems={alignItems}
        paddingTop={paddingTop}
      >
        <Check checked={checked} disabled={disabled} noMargin={noMargin}>
          {checked && <Icon width={16} height={16} type={'check'}/>}
        </Check>
        {renderItem ? renderItem()
          : <Wrapper flow={'column'}>
            <Title width={'auto'} breakWord disabled={disabled}>{title}</Title>
            {subTitle && <SubTitle>{subTitle}</SubTitle>}
          </Wrapper>
        }
      </CheckboxWrapper>
      {tooltip && <Text padding={'0 0 0 30px'} color={'black50'}>{tooltip}</Text>}
    </CheckboxContainer>
  )
}

Checkbox.propTypes = {
  title: PropTypes.string,
  alignItems: PropTypes.string,
  paddingTop: PropTypes.string,
  subTitle: PropTypes.string,
  tooltip: PropTypes.string,
  checked: PropTypes.bool,
}
