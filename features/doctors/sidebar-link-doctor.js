import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Link} from '../../routes'
import {withRouter} from 'next/router'

const MenuLinkA = styled.a`
  cursor: pointer;
  margin-right: 20px;
`

const PureSidebarLink = ({href, children, router, childRoutes, currentPath}) => {
  let firstPath = currentPath || router.asPath
  if (firstPath.replace(/\?.+/, '') !== '/') {
    firstPath = '/' + firstPath.split('/')[1].split('?')[0]
  }

  const isChild = childRoutes && childRoutes.includes(firstPath)
  const selected = selected || firstPath === href || isChild

  return (
    <Link route={href} passHref>
      <MenuLinkA selected={selected}>
        {children(selected)}
      </MenuLinkA>
    </Link>
  )
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