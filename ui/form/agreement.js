import React from 'react'
import {Text} from '../text'
import {Icon} from '../icon'
import styled from 'styled-components'
import {getColor} from '../helpers/getColor'
import {media} from '../../helpers/media'
import {Link} from '../../routes'


const ContentContainer = styled.div`
  display: flex;
  width: 354px;
  padding: 12px;
  border-radius: 20px;
  background: ${p => getColor('white', p.theme)};
  cursor: pointer;
  
  ${media.mobile`
    width: 343px;  
  `}
`

const PrimaryLink = styled.a`
  color: ${(p) => getColor('primary', p.theme)};
  text-decoration: none;
  cursor: pointer;
`

const CircleCheckbox = styled.div`
  margin: 3px 12px 0 0;
  height: 20px;
  width: 20px;
  padding: 3px;
  border: 1px solid ${p => getColor('primary', p.theme)};
  background: ${p => getColor(p.checked ? 'primary': 'white', p.theme)};
  box-sizing: border-box;
  border-radius: 50%;
  display: inline-block;
  flex-shrink: 0;
  flex-grow: 0;
  cursor: pointer;
`

export const AgreementBlock = ({checked, onChange, isRegistration}) => {

  return (
    <ContentContainer onClick={onChange}>
      <CircleCheckbox checked={checked}>
        {checked && <Icon width={12} height={9} type={'circle_check'}/>}
      </CircleCheckbox>
      <Text>
        {isRegistration ? 'Я согласен с' : 'Активируя Продукт, cтрахователь соглашается с'}
        <Link route={'/about/documents/terms-of-use'} passHref>
          <PrimaryLink target={'_blank'}>&nbsp;пользовательским соглашением</PrimaryLink>
        </Link>, с офертой и <Link route={'/about/documents/personal-data'} passHref>
          <PrimaryLink target={'_blank'}>&nbsp;политикой конфиденциальности</PrimaryLink>
        </Link>.
      </Text>
    </ContentContainer>
  )
}