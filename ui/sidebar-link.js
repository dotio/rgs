import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Link} from '../routes'
import {withRouter} from 'next/router'
import {isMobile} from 'react-device-detect'

const MenuLinkA = styled.a`
  cursor: pointer;
  width: 100%;
`

const PureSidebarLink = ({href, children, router, childRoutes, currentPath}) => {
  let firstPath = currentPath || router.asPath
  if (firstPath.replace(/\?.+/, '') !== '/') {
    firstPath = '/' + firstPath.split('/')[1].split('?')[0]
  }

  const isChild = childRoutes && childRoutes.includes(firstPath)

  //firstPath === href.slice(0, href.length - 1 ) - ситуация, когда firstPath и href в разном числе (например: doctors и doctor)
  const selected = selected
    || firstPath === href.split('?')[0]
    || (firstPath === '/doctor' || firstPath === '/clinic') && firstPath + 's' === href.split('?')[0]
    || href === '/menu' && firstPath === '/about'
    || isMobile && href === '/search' && (firstPath === '/doctors' || firstPath === '/doctor' || firstPath === '/clinics'|| firstPath === '/clinic')
    || firstPath === href.slice(0, href.length - 1 ) || isChild
  const blocked = selected && firstPath === href.split('?')[0]

  if (href && !blocked) {
    return (
      <Link route={href} passHref><MenuLinkA selected={selected}>{children(selected, blocked)}</MenuLinkA></Link>
    )
  }
  return children(selected, blocked)
}

PureSidebarLink.propTypes = {
  href: PropTypes.string,
  params: PropTypes.object,
  type: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  onClick: PropTypes.func,
  router: PropTypes.object,
  text: PropTypes.string,
}

export const SidebarLink = withRouter(PureSidebarLink)
