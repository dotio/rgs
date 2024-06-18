import styled from 'styled-components'
import {Text} from '../../ui/text'
import React from 'react'
import {Rating} from '../../ui/rating'
import {ListItem} from '../../ui/list-item'
import {Icon} from '../../ui/icon'
import {media} from '../../helpers/media'
import PropTypes from 'prop-types'
import {Circle} from '../../ui/circle'
import {useRouter} from 'next/dist/client/router'
import Qs from 'qs'
import {omit} from 'ramda'

const DoctorInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  ${media.mobile`
    flex-direction: column;
    align-items: flex-start;
  `}
`
const DoctorInfo = styled.div`
  padding-right: 36px;
  
  ${media.mobile`
    padding-bottom: 4px;
    padding-right: 0;
  `}
`
const AchievementContainer = styled.div`
  padding-top: 12px;
  display: flex;
  svg {
    flex-shrink: 0;
    flex-grow: 0;
  }
  ${media.mobile`
    display: block;
    padding-top: 4px;
    & svg {
      width: 16px;
      height: 16px;
      margin-right: 2px;
    }
  `}
`

const AchievementText = styled(Text)`
  padding-left: 6px;
  ${media.mobile`
    padding-left: 0;
    display: inline;
  `} 
`

const StyledCircle = styled(Circle)`
  position: absolute;
  right: 0;
  top: -4px;

  ${media.mobile`
    right: -8px;
  `}
`

const Achievement = ({icon, texts}) => {
  return (
    <AchievementContainer>
      <Icon type={icon} color={'black40'}/>
      <AchievementText width={'auto'} size={'16px'} lineHeight={'24px'}>
        {texts.map(one =>
          <Text
            as={'span'}
            key={one.text}
            color={one.highlight ? 'green' : 'black50'}
          >{one.text} </Text>
        )}
      </AchievementText>
    </AchievementContainer>
  )
}

export const DoctorCard = ({id, name, surname, middlename, isFavorite, photo, gender, specializations, achievement, rating, clusterMobStyle, isCluster=false}) => {
  const imgIcon = isFavorite ? (
    <StyledCircle color={'starred'} size={24}>
      <Icon type={'star'} color={'white'} width={16} height={16}/>
    </StyledCircle>
  ) : null

  const router = useRouter()
  const stringParams = Qs.stringify(omit(['doctorId', 'searchDF'], router.query))
  const href = `/doctor/${id}${stringParams ? `?${stringParams}` : ''}`

  return (
    <ListItem
      href={href}
      src={photo ? photo : `/static/doctor/${gender}_doctor.svg`}
      withBorder
      withoutLastBorder
      imgIcon={imgIcon}
      imgBorderRadius={'50%'}
      clusterMobStyle={isCluster && clusterMobStyle}
    >
      <DoctorInfoWrapper>
        <DoctorInfo>
          <Text>{surname} {name} {middlename}</Text>
          {specializations && <Text color={'black50'}>{specializations.map((value, index) => index !== 0 ? value && value.title.toLowerCase() : value && value.title.charAt(0).toUpperCase() + value.title.slice(1)).join(', ')}</Text>}
          {achievement && <Achievement icon={achievement.icon} texts={achievement.texts} />}
        </DoctorInfo>
        {rating && <Rating number={parseFloat(rating)} color={'primary'}/>}
      </DoctorInfoWrapper>
    </ListItem>
  )
}

DoctorCard.propTypes = {
  name: PropTypes.string,
  surname: PropTypes.string,
  middlename: PropTypes.string,
  img: PropTypes.string,
  specializations: PropTypes.array,
  achievement: PropTypes.shape({
    icon: PropTypes.string,
    texts: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string,
        highlight: PropTypes.bool,
      })
    ),
  }),
  rating: PropTypes.any,
}