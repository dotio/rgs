import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Wrapper } from '../../../../ui/wrapper'
import { getColor } from '../../../../ui/helpers/getColor'
import { Text } from '../../../../ui/text'
import { TitleText } from '../../../../ui/title-text'
import { media } from '../../../../helpers/media'
import { Avatar } from '../../../../ui/avatar'
import moment  from 'moment'
import {Link} from '../../../../routes'
import {T} from '../../../../utils/translation'
import {getRandomIntInclusive} from '../../../../ui/helpers/getRandomIntInclusive'
import {Icon} from '../../../../ui/icon'

const OrderWrapper = styled(Wrapper)`
  height: 176px;  
  width: 232px;
  border-radius: 16px;
  background-color: ${p => getColor('black05', p.theme)};
  
  ${media.mobile`
    min-width: 232px;
    width: 232px;
    height: 166px;
  `} 
  &:hover {
    cursor: pointer;
  }
`

const AvatarContainer = styled.div`
  position: relative;
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 14.4px;
  flex-shrink: 0;
  height: 14.4px;
  z-index: 2;
  background-color: ${p => getColor(p.color, p.theme)};
  border-radius: 20px;
  right: -2.76px;
  top: -2.51px;
`

export const OrderBlock = ({id, appointment, specialization, date, timeFrom, doctor, clinic, service}) => {
  const memoizedRandom = clinic ? useMemo(() =>  getRandomIntInclusive(1,5), [id]) : null

  return (
    <Link route={`/profile/medcard/order/${id}`}>
      <OrderWrapper flow={'column'} justify={'space-between'} padding={'16px'}>
        <Wrapper align={'flex-start'} justify={'space-between'}>
          <Wrapper flow={'column'} width={'150px'}>
            {appointment && <Text color={'secondary'}><T ucFirst>profile.medcard.order.reception</T></Text>}
            <Text>{specialization && (typeof specialization === 'string' ? specialization : specialization.title)}</Text>
            {timeFrom && <Text>{`в ${timeFrom}`}</Text>}
          </Wrapper>
          <Wrapper width={'auto'} flow={'column'} align={'flex-end'}>
            {date && (
              <>
                <TitleText align={'right'} color={appointment ? 'secondary' : 'black50'} width={'auto'}>{moment(date).format('DD')}</TitleText>
                <Text align={'right'} color={appointment ? 'secondary' : 'black50'}>{moment(date).format('MMM')}</Text>
              </>)}
          </Wrapper>
        </Wrapper>
        <Wrapper align={'flex-end'} gap={'6px'}>
          {doctor && (
            <AvatarContainer>
              {doctor.isFavorite && (
                <IconWrapper color={'starred'}>
                  <Icon height={9.6} width={9.6} type={'star'} color={'white'}/>
                </IconWrapper>
              )}
              <Avatar src={doctor.photo ? doctor.photo : '/static/avatars/doctor_empty_big.svg'} width={'36px'} minHeight={'36px'} height={'36px'} bgColor={'#C4C4C4'} />
            </AvatarContainer>
          )}
          {clinic && (
            <AvatarContainer>
              {clinic.isFavorite && (
                <IconWrapper color={'starred'}>
                  <Icon height={9.6} width={9.6} type={'star'} color={'white'}/>
                </IconWrapper>
              )}
              <Avatar src={clinic.logo ? clinic.logo : `/static/mocks/clinic${memoizedRandom}.svg`} width={'36px'} minHeight={'36px'} height={'36px'} borderRadius={'4px'} bgColor={'#C4C4C4'} />
            </AvatarContainer>
          )}
          {service && (
            <AvatarContainer>
              <Avatar src={'/static/avatars/online.png'} width={'36px'} minHeight={'36px'} height={'36px'} borderRadius={'4px'} bgColor={'#C4C4C4'} />
            </AvatarContainer>
          )}
        </Wrapper>
      </OrderWrapper>
    </Link>
  )
}

OrderBlock.propTypes = {
  id: PropTypes.number,
  appointment: PropTypes.bool,
  date: PropTypes.string,
  doctor: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
    specialization: PropTypes.string,
  }),
  clinic: PropTypes.shape({
    id: PropTypes.number,
    img: PropTypes.string,
  })
}