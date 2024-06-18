import React from 'react'
import styled from 'styled-components'
import {Icon} from '../../../ui/icon'
import {Text} from '../../../ui/text'
import {Circle} from '../../../ui/circle'
import {Wrapper} from '../../../ui/wrapper'

const StyledWrapper = styled(Wrapper)`
  height: ${p => p.height};
`

const IconBox = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`

const NotificationCircle = styled(Circle)`
  position: absolute;
  bottom: 20px;
  left: 20px;
`

export const IconTitle = ({icon, title, selected, height, withNotification}) => {
  return (
    <StyledWrapper flow={'column'} align={'center'} justify={'center'} height={height} gap={'2px'} padding={'6px 0 7px'}>
      <IconBox>
        <Icon color={selected? 'primary' : 'black40'} type={icon} width={24} height={24}/>
        {withNotification && <NotificationCircle color={'dangerousRed'} size={8}/>}
      </IconBox>
      <Text size={'10px'} lineHeight={'13px'} color={selected ? 'primary' : 'black50'} align={'center'}>{title}</Text>
    </StyledWrapper>
  )
}