import React from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import {Text} from '../../ui/text'
import {Avatar} from '../../ui/avatar'
import {Container} from '../../ui/grid/container'
import {Wrapper} from '../../ui/wrapper'
import {Tabs} from '../../ui/tabs'
import {media} from '../../helpers/media'
import {T} from '../../utils/translation'
import {Link, Router} from '../../routes'
import {getColor} from '../../ui/helpers/getColor'
import {CircleButton} from '../../ui/circle-button'

const PROFILE_ROUTE = {
  title: <T ucFirst>profile.product.menu.profile</T>,
  route: '/profile',
  routeFile: '/profile/main'
}
const MEDCARD_ROUTE = {
  title: <T ucFirst>profile.product.menu.medcard</T>,
  route: '/profile/medcard',
  routeFile: '/profile/medcard'
}
const PRODUCTS_ROUTE = {
  title: <T ucFirst>profile.product.menu.products</T>,
  route: '/profile/products',
  routeFile: '/profile/products'
}
const FAMILY_ROUTE = {
  title: <T ucFirst>profile.product.menu.family</T>,
  route: '/profile/family',
  routeFile: '/profile/family'
}
const SETTINGS_ROUTE = {
  title: <T ucFirst>profile.product.menu.settings</T>,
  route: '/profile/settings',
  routeFile: '/profile/settings'
}
const getFamilyMedcardRoute = (medcardId) => ({
  title: <T ucFirst>profile.product.menu.medcard</T>,
  route: `/profile/family/${medcardId}/medcard`,
  routeFile: '/profile/family/medcard'
})
const getFamilySettingsRoute = (medcardId) => ({
  title: <T ucFirst>profile.product.menu.settings</T>,
  route: `/profile/family/${medcardId}/settings`,
  routeFile: '/profile/family/settings'
})

const getTabsByMedcard = (medcard) => {
  if (medcard.main) {
    return [
      PROFILE_ROUTE,
      MEDCARD_ROUTE,
      PRODUCTS_ROUTE,
      FAMILY_ROUTE,
      SETTINGS_ROUTE,
    ]
  } else if (medcard.hasAccess) {
    return [
      getFamilyMedcardRoute(medcard.id),
      getFamilySettingsRoute(medcard.id),
    ]
  } else {
    return [
      SETTINGS_ROUTE,
    ]
  }
}

const TitleText = styled(Text)`
  font-size: 28px;
  line-height: 36px;
  ${media.mobile`
    font-size: 24px;
    line-height: 36px;
  `} 
`

const LinkA = styled.a`
  color: ${p => getColor('green', p.theme)};
`

const StyledCircleButton = styled(CircleButton)`
  z-index: 0;
`

const RelativeWrapper = styled(Wrapper)`
  position: relative;
`

const StyledAvatar = styled(Avatar)`
  display: inline-flex;
  margin-right: 35px;
`

export const ProfileTemplate = ({medcardId, parentTitle, parentLink, backUrl, children}) => {
  const medcardsList = useSelector(state => state.medcards.list)
  const mainMedcardId = useSelector(state => state.user.mainMedcardId)
  const searchedMedcard = medcardsList.find(medcard => medcard.id === parseInt(medcardId))

  const currentMedcard = searchedMedcard ? searchedMedcard :  medcardsList.find(medcard => medcard.id === parseInt(mainMedcardId))

  const formattedName = currentMedcard ? `${currentMedcard.name} ${currentMedcard.surname}` : ''

  return (
    <RelativeWrapper flow={'column'}>
      <Container>
        <Wrapper padding={'22px 0 0'} mobilePadding={'16px 0 0'} gap={'18px'} flow={'column'}>
          <Wrapper gap={'8px'} align-items={'center'}>
            <TitleText width={'auto'}>
              {(parentTitle && parentLink)
                ? <><Link route={parentLink} passHref><LinkA>{parentTitle}</LinkA></Link> / {formattedName}</>
                : formattedName
              }
              &nbsp;
              <StyledAvatar src={currentMedcard.photo} size={'36px'} bgColor={'secondary'} color={'white'} text={`${currentMedcard.name[0]}`}/>
            </TitleText>
          </Wrapper>
          <Tabs list={getTabsByMedcard(currentMedcard)}/>
          {backUrl && <StyledCircleButton top={'0'} onClick={() => Router.pushRoute(backUrl)} icon={'long_arrow_left'}/>}
        </Wrapper>
      </Container>
      <Wrapper flow={'column'} gap={'6px'}>
        {children}
      </Wrapper>
    </RelativeWrapper>
  )
}