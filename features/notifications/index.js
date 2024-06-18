import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import {Text} from '../../ui/text'
import {Icon} from '../../ui/icon'
import {getColor} from '../../ui/helpers/getColor'

const NotificationsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 100500;
  left: 0;
  right: 0;
  top: 0;
  & > * + * {
      margin-top: 8px;
  };
`

const Notification = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px;
  background-color: ${p => getColor('black', p.theme)};
`

const CloseIconWrapper = styled.div`
  width: auto;
  cursor: pointer;
`

export const Notifications = () => {
  const notifications = useSelector(state => state.notifications.queue)
  const dispatch = useDispatch()

  const onClickClose = (uuid) => () => {
    dispatch.notifications.removeNotify(uuid)
  }

  return (
    <NotificationsWrapper>
      {notifications.map(notification => (
        <Notification key={notification.uuid}>
          <Text align={'center'} color={'white'} size={'20px'} lineHeight={'24px'}>
            {notification.title}
          </Text>
          <CloseIconWrapper onClick={onClickClose(notification.uuid)}>
            <Icon type={'cross'} width={24} height={24} color={'black40'}/>
          </CloseIconWrapper>
        </Notification>
      ))}
    </NotificationsWrapper>
  )
}