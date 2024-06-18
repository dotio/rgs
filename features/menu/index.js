import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import {Wrapper} from '../../ui/wrapper'
import {Well} from '../../ui/well'
import {SidebarLink} from '../../ui/sidebar-link'
import {getColor} from '../../ui/helpers/getColor'
import {Icon} from '../../ui/icon'
import {Text} from '../../ui/text'
import {menuRoutes} from '../../helpers/routes'
import {Logo} from '../../ui/logo'
import {CopyrightBlock} from '../left-menu/components/copyright-block'

const MenuWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  padding-bottom: 60px;
`

const IconWrapper = styled.div`
  border-radius: 50%;
  background: ${p => getColor(p.bgColor, p.theme)};
  display: flex;
  align-items: center;
  flex-shrink: 0;
  justify-content: center;
  margin-right: 16px;
  width: 36px;
  height: 36px;
`

const MenuLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`

const MenuWell = styled(Well)`
  display: flex;
  height: 100%;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
`

const BigWrapper = styled(Wrapper)`
  flex-shrink: 1;
  height: 100%;
`

export const MenuComponent = () => {
  const [routes, bottomRoutes] = menuRoutes(false)
  const dispatch = useDispatch()
  const city = useSelector(state => state.user.city.name)

  const renderLink = (route, index, routes) => (
    <SidebarLink key={route.link} href={route.link}>
      {() => (
        <MenuLinkContainer onClick={route.modal ? () => dispatch.modal.addAndShowModal({type: route.modal}) : null }>
          <IconWrapper bgColor={index < routes.length - 1 ? 'primary' : 'black40'}>
            <Icon
              shrink={'0'}
              type={route.icon}
              width={24}
              height={24}
              color={'white'}
            />
          </IconWrapper>
          <Text
            size={'20px'}
            lineHeight={'30px'}
            color={'black'}
          >
            {!route.modal ? route.name : city}
          </Text>
        </MenuLinkContainer>
      )}
    </SidebarLink>
  )

  return (
    <MenuWrapper>
      <Wrapper flow={'column'}>
        <MenuWell mobilePadding={'0'} padding={'0'}>
          <BigWrapper flow={'column'} mobilePadding={'16px'} padding={'24px'}>
            <Logo small={false} />
            <BigWrapper flow={'column'} gap={'24px'} justify={'flex-end'}>
              {[...routes, ...bottomRoutes].map(renderLink)}
            </BigWrapper>
          </BigWrapper>
          <Wrapper padding={'0 20px'} align={'center'} justify={'space-between'}>
            <CopyrightBlock />
          </Wrapper>
        </MenuWell>
      </Wrapper>
    </MenuWrapper>
  )
}