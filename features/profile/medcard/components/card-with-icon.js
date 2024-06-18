import React from 'react'
import styled, {css} from 'styled-components'
import {Wrapper} from '../../../../ui/wrapper'
import {getColor} from '../../../../ui/helpers/getColor'
import {Icon} from '../../../../ui/icon'
import {Text} from '../../../../ui/text'

const CardWrapper = styled(Wrapper)`
  min-height: 120px;
  height: 100%;
  border-radius: 16px;
  background-color: ${(p) => getColor(p.bgColor, p.theme)};
  transition: 0.3s;
  &:hover {
    cursor: pointer;
    background-color: ${(p) => getColor(p.hoverColor, p.theme)};
  }
  ${(p) => p.border && css`
    border: 1px solid ${getColor(p.border, p.theme)};
  `}
`

const IconWrapper = styled.div`
  padding: 2px 0 0 2px;
`

export const CardWithIcon = ({
  icon,
  iconColor,
  label,
  rightLabel,
  bgColor,
  onClick,
  labelComponent,
  border,
  hoverColor,
}) => {
  return (
    <CardWrapper
      flow={'column'}
      justify={'space-between'}
      padding={'16px'}
      onClick={onClick}
      bgColor={bgColor}
      border={border}
      hoverColor={hoverColor}
    >
      <Wrapper justify={'space-between'}>
        {icon.length > 0 && <IconWrapper>
          <Icon
            height={24}
            width={24}
            type={icon}
            color={iconColor}
          />
        </IconWrapper>}
        {rightLabel && <Text
          color={'primary'}
          width={'auto'}
          bold
        >
          {rightLabel}
        </Text>}
      </Wrapper>
      {labelComponent
        ? labelComponent
        : <Text>{label}</Text>}
    </CardWrapper>
  )
}

CardWithIcon.defaultProps = {
  icon: 'info',
  iconColor: 'green',
  onClick: () => {},
  label: '',
  rightLabel: '',
  bgColor: 'black05',
  width: 'auto',
  hoverColor: 'none',
}