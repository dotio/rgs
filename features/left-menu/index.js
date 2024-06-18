import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import {SidebarLink} from '../../ui/sidebar-link'
import {MenuLink} from './components/menu-link'
import {Logo} from '../../ui/logo'
import {Wrapper} from '../../ui/wrapper'
import {MenuMedcard} from '../medcards/components/menu-medcard'
import {getColor} from '../../ui/helpers/getColor'
import {CopyrightBlock} from './components/copyright-block'
import {menuRoutes} from '../../helpers/routes'

const LeftMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100%;
  background-color: ${p => getColor('white', p.theme)};
  border-radius: 20px;
  height: auto;
  flex-shrink: 0;
`

const MenuWrapper = styled(Wrapper)`
  min-height: calc(100vh - 12px);
`

export const LeftMenu = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(state => state.login.loggedIn)
  const [routes, bottomRoutes] = menuRoutes(true, isAuth)
  const city = useSelector(state => state.user.city)

  const renderMenuLink = (route) => {
    return (
      <SidebarLink key={route.link} href={(route.link === '/doctors' || route.link === '/clinics') && city && city.id ? `${route.link}?cityId${route.link === '/doctors' ? 'DF' : 'CF'}=${city.id}` : route.link}>
        {((selected, blocked = false) => (
          <MenuLink
            icon={route.icon}
            selected={selected}
            blocked={blocked}
            onClick={route.modal ? () => dispatch.modal.addAndShowModal({type: route.modal}) : null }
          >
            {route.modal? city.name : route.name}
          </MenuLink>
        ))}
      </SidebarLink>
    )
  }

  return (
    <LeftMenuContainer>
      <MenuWrapper flow={'column'} padding={'16px 16px 0'} justify={'space-between'} gap={'18px'}>
        <Wrapper flow={'column'} align={'flex-start'} justify={'flex-start'}>
          <SidebarLink href={'/'}>
            {(selected) => (
              <Logo small={false} black={!selected}/>
            )}
          </SidebarLink>
          <Wrapper padding={'40px 0 0'}>
            <MenuMedcard/>
          </Wrapper>
          <Wrapper flow={'column'} justify={'space-between'} gap={'18px'}>
            {routes.map(renderMenuLink)}
          </Wrapper>
        </Wrapper>
        <Wrapper flow={'column'} gap={'18px'}>
          {bottomRoutes.map(renderMenuLink)}
          <CopyrightBlock />
        </Wrapper>
      </MenuWrapper>
    </LeftMenuContainer>
  )
}