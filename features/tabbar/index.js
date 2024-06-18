import React, {useState, useEffect} from 'react'
import {IconTitle} from './components/icon-title'
import {AvatarTitle} from './components/avatar-title'
import {SidebarLink} from '../../ui/sidebar-link'
import {useRouter} from 'next/dist/client/router'
import styled from 'styled-components'
import {getColor} from '../../ui/helpers/getColor'
import {tabsRoutes} from '../../helpers/routes'
import {useSelector} from 'react-redux'
import {getTranslator} from '../../utils/translation'
import {Wrapper} from '../../ui/wrapper'
import {isAndroid} from 'react-device-detect'

const TabBarTemplate = styled(Wrapper)`
  background-color: ${p => getColor(p.bgColor, p.theme)};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  
  ${p => p.showPadding && `
    padding: 0 0 23px;
  `}
`

export const TabBar = () => {
  const router = useRouter()
  let prevHeight = null
  const [showPadding, setShowPadding] = useState(false)
  const [leftMenuRoutes, rightMenuRoutes] = tabsRoutes()
  const isLoggedIn = useSelector(state => state.login.loggedIn)
  const medcard = useSelector(state => state.medcards.list.find(({id}) => id === state.user.mainMedcardId))
  const translator = useSelector(state => getTranslator(state.localization))

  const isGrayRoute = !!rightMenuRoutes.find(({link}) => link === router.route)

  const onResize = () => {
    if(isAndroid) {
      return
    }
    if(prevHeight) {
      setShowPadding(window.innerHeight > prevHeight)
      const vpH = window.innerHeight
      document.documentElement.style.height = vpH.toString() + 'px'
      document.body.style.height = vpH.toString() + 'px'
    }

    prevHeight = window.innerHeight
  }

  useEffect(() => {
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <TabBarTemplate bgColor={isGrayRoute ? 'black05' : 'white'} showPadding={showPadding}>
      {leftMenuRoutes.map(({icon, link, name}) => (
        <SidebarLink
          key={link}
          href={link}
        >
          {(selected) => (
            <IconTitle
              icon={icon}
              title={name}
              height={'52px'}
              selected={selected}
            />
          )}
        </SidebarLink>
      ))}
      <SidebarLink href={'/profile'}>
        {(selected) => (isLoggedIn ?
          <AvatarTitle
            selected={selected}
            name={medcard && medcard.name}
            title={translator('menu.tabs.medcard', true)}
            src={medcard && medcard.photo}
          /> :
          <IconTitle
            icon={'smile'}
            title={translator('menu.tabs.signin', true)}
            selected={selected}
            height={'52px'}
            withNotification
          />
        )}
      </SidebarLink>
      {rightMenuRoutes.map(({icon, link, name}) => (
        <SidebarLink key={link} href={link}>
          {(selected) => (
            <IconTitle icon={icon} title={name} selected={selected} height={'52px'} />
          )}
        </SidebarLink>
      ))}
    </TabBarTemplate>
  )
}