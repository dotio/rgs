import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {getColor} from './helpers/getColor'
import {Link} from '../routes'
import {Text} from './text'
import {Wrapper} from './wrapper'
import {useRouter} from 'next/dist/client/router'
import {media} from '../helpers/media'

const TabsWrapper = styled(Wrapper)`
  ${media.mobile`
    overflow: auto;
  `}
`

const LinkA = styled.a`
  cursor: pointer;
  width: 100%;
`

const Tab = styled.div`
   display: flex;
   flex-direction: row;
   width: auto;
   cursor: pointer;
   padding-bottom: 9px;
   position: relative;
   
   &:after {
      content: '';
      display: block;
      border-bottom: 2px solid ${p => getColor(p.border, p.theme)};
      transition: 0.2s linear;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
   }
   
   & > * + * {
      margin-left: 8px;
  };
`

export const Tabs = ({list}) => {
  const router = useRouter()

  return (
    <Wrapper justify={'space-between'}>
      <TabsWrapper justify={'space-between'}>
        <Wrapper gap={'20px'} width={'auto'}>
          {list.map(({title, route, routeFile}, index) => {
            const isCurrentRoute = router.route === routeFile
            return (
              <Link key={'menuItem-' + index} route={route} passHref>
                <LinkA selected={isCurrentRoute}>
                  <Tab border={isCurrentRoute ? 'primary' : 'transparent'}>
                    <Text size={'16px'} lineHeight={'24px'} color={isCurrentRoute ? 'primary' : 'black50'}>
                      {title}
                    </Text>
                  </Tab>
                </LinkA>
              </Link>)
          })}
        </Wrapper>
      </TabsWrapper>
    </Wrapper>
  )
}

Tabs.propTypes = {
  list: PropTypes.array,
}

Tabs.defaultProps = {
  list: []
}