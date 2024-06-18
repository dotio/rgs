import React from 'react'
import styled from 'styled-components'
import {Well} from '../../../ui/well'
import {Container} from '../../../ui/grid/container'
import {media} from '../../../helpers/media'
import {NotificationCardBill} from '../components/notification-cards/notification-card-bill'
import {NotificationCardRateDoctor} from '../components/notification-cards/notification-card-rate-doctor'
import {NotificationCardArticle} from '../components/notification-cards/notification-card-article'
import {SectionTitle} from '../components/section-title'
import {useSelector} from 'react-redux'
import {getTranslator} from '../../../utils/translation'
import {Wrapper} from '../../../ui/wrapper'

// TODO to API mocks
const items = [
  {
    type: 'bill',
    title: 'Оплатите счет на прием к врачу',
    expirationDate: 'Осталось 14 минут',
    outdated: false
  },
  {
    type: 'article',
    title: 'Лучшие клиники - 2020',
    bgImage: '/static/banners/clinic_notify.png'
  },
  {
    type: 'rateDoctor',
    title: 'Оцените прием врача',
    photo: '/static/mocks/doctor.png'
  },
  {
    type: 'bill',
    title: 'Оплатите счет на прием к врачу',
    expirationDate: 'Счет просрочен',
    outdated: true
  }
]

const NotificationContentWrapper = styled(Wrapper)`
  ${media.mobile`
    overflow: auto;
    flex-wrap: nowrap;
  `}
`

const CardWrapper = styled(Wrapper)`
  height: 200px;
  width: 171px;
  ${media.mobile`
    min-width: 122px;
    width: 122px;
    height: 158px;
  `}
`

export const NotificationsBlock = () => {
  const translator = useSelector(state => getTranslator(state.localization))
  const onBillClick = () => {}
  const onArticleClick = () => {}
  const onRateDoctorClick = () => {}

  const renderNotificationCard = (item, index) => {
    switch (item.type) {
      case 'bill':
        return <NotificationCardBill key={index} {...item} onClick={onBillClick}/>
      case 'article':
        return <NotificationCardArticle key={index} {...item} onClick={onArticleClick}/>
      case 'rateDoctor':
        return <NotificationCardRateDoctor key={index} {...item} onClick={onRateDoctorClick}/>
    }
  }

  return (
    <Well color={'transparent'}>
      <Container>
        <SectionTitle
          title={translator('profile.main.notification.title', true)}
          // link={'/profile/notifications'}
        />
        <NotificationContentWrapper gap={'12px'}>
          {items.map((item, index) => {
            return <CardWrapper key={'item-' + index}>
              {renderNotificationCard(item, index)}
            </CardWrapper>
          })}
        </NotificationContentWrapper>
      </Container>
    </Well>
  )
}
