import React from 'react'
import {useDispatch} from 'react-redux'
import {Container} from '../../../ui/grid/container'
import {Icon} from '../../../ui/icon'
import styled from 'styled-components'
import {getColor} from '../../../ui/helpers/getColor'
import {Gap} from '../../../ui/gap'
import {Link} from '../../../routes'
import {TitleText} from '../../../ui/title-text'
import {Well} from '../../../ui/well'
import {Wrapper} from '../../../ui/wrapper'
import {T} from '../../../utils/translation'

const FooterLink = styled(Wrapper)`
  cursor: pointer;
`

const IconWrapper = styled(Wrapper)`
  border-radius: 50%;
  background: ${p => getColor(p.color, p.theme)};
  height: 36px;
  flex-shrink: 0;
`

const items = [
  {
    title: <T ucFirst>profile.main.links.addresses</T>,
    path: '/profile/settings#settings-addresses',
    icon: 'house'
  },
  {
    title: <T ucFirst>profile.main.links.bills</T>,
    path: '/profile/settings#settings-finance',
    icon: 'credit_card'
  },
  // {
  //   title: <T ucFirst>profile.main.links.settings</T>,
  //   path: '/profile/settings#settings-subscriptions',
  //   icon: 'settings'
  // },
]

export const FooterLinks = () => {
  const dispatch = useDispatch()

  return <Well color={'transparent'}>
    <Container>
      <Gap gap={'32px'}>
        {items.map(({title, path, icon}, index) => (
          <Link href={path} key={'link-' + index}>
            <FooterLink align={'center'}>
              <IconWrapper color={'primary'} align={'center'} justify={'center'} width={'36px'}>
                <Icon shrink={'0'} type={icon} color={'white'} />
              </IconWrapper>
              <TitleText padding={'0 0 0 13px'}>{title}</TitleText>
            </FooterLink>
          </Link>
        ))}
        <FooterLink align={'center'} onClick={() => dispatch.modal.addAndShowModal({type: 'logout'})}>
          <IconWrapper color={'black40'} align={'center'} justify={'center'} width={'36px'}>
            <Icon  width={24} height={24} shrink={'0'} type={'logout'} color={'white'} />
          </IconWrapper>
          <TitleText padding={'0 0 0 13px'}>Выйти</TitleText>
        </FooterLink>
      </Gap>
    </Container>
  </Well>
}


