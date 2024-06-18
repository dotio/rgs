import React from 'react'
import {Text} from '../../../ui/text'
import styled from 'styled-components'
import {useSelector} from 'react-redux'
import {Icon} from '../../../ui/icon'
import {Link} from '../../../routes'
import {Wrapper} from '../../../ui/wrapper'
import {Circle} from '../../../ui/circle'
import {Avatar} from '../../../ui/avatar'
import {getTranslator} from '../../../utils/translation/index'

const ImgContainer = styled.div`
  display: flex;
  position: relative;
  height: 36px;
  width: 36px;
  flex-shrink: 0;
  flex-grow: 0;
  align-items: center;
  justify-content: center;
`
const TextContainer = styled.div`
  padding: 6px 0 0 10px;
`
const NotificationCircle = styled(Circle)`
  position: absolute;
  top: 0;
  right: 0;
`

export const MenuMedcard = () => {
  const translator = useSelector(state => getTranslator(state.localization))
  const medcard = useSelector(state => state.medcards.list.find(({id}) => id === state.user.mainMedcardId))
  const user = useSelector(state => state.user)
  const showNotification = medcard ? user.hasNotifications : true
  const notification = medcard ? user.shortNotification : (<Text color={'black50'} dangerouslySetInnerHTML={{__html: translator('medcard.menu.notification', true)}}/>)
  return (
    <Link route={medcard ? '/profile' : '/login'} passHref>
      <Wrapper as={'a'} padding={'0 0 18px'} flow={'row'} justify={'flex-start'}>
        <ImgContainer>
          {medcard ?  <Avatar src={medcard.photo} size={'36px'} text={medcard.name[0]} bgColor={'secondary'} color={'white'}/> : <Icon shrink={'0'} color={'black40'} type={'smile'} height={24} width={24}/>}
          {showNotification && <NotificationCircle color={'dangerousRed'} size={8}/>}
        </ImgContainer>
        <TextContainer>
          <Text>{medcard ? `${medcard.name} ${medcard.surname}` : translator('medcard.menu.title', true)}</Text>
          {notification && !medcard && <Text color={'black50'}>{notification}</Text>}
        </TextContainer>
      </Wrapper>
    </Link>
  )
}