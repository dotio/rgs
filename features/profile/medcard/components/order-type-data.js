import React, {useMemo} from 'react'
import styled from 'styled-components'
import {media} from '../../../../helpers/media'
import {Wrapper} from '../../../../ui/wrapper'
import {getRandomIntInclusive} from '../../../../ui/helpers/getRandomIntInclusive'

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${p => p.borderRadius};
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: 14px;
  background-image: url(${p => p.bgImage});
  background-size: 80px auto;
  background-position: top center;
  background-repeat: no-repeat;
  
  ${media.mobile`
    width: 60px;
    height: 60px;
    background-size: 60px auto;
  `}
  
`

export const OrderTypeData = ({type, img, children, uniqueId}) => {
  const memoizedRandom = useMemo(() => getRandomIntInclusive(1, 5), [uniqueId])
  const defaultIcon = () => {
    switch(type) {
      case 'doctor':
        return '/static/avatars/doctor_empty_big.svg'
      case 'clinic':
        return `/static/mocks/clinic${memoizedRandom}.svg`
      default:
        return '/static/avatars/online.png'
    }
  }

  return (
    <Wrapper>
      <Avatar bgImage={img ? img : defaultIcon()} borderRadius={type === 'doctor' ? '50%' : img ? '16px' : '0'} />
      <Wrapper flow={'column'}>
        {children}
      </Wrapper>
    </Wrapper>
  )

}