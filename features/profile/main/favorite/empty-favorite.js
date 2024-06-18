import React from 'react'
import styled from 'styled-components'
import {Well} from '../../../../ui/well'
import {Wrapper} from '../../../../ui/wrapper'
import {Img} from '../../../../ui/img'
import {TitleText} from '../../../../ui/title-text'
import {Container} from '../../../../ui/grid/container'
import {media} from '../../../../helpers/media'
import {color} from '../../../../ui/theme'
import {Icon} from '../../../../ui/icon'

const StarBox = styled(Wrapper)`
  background: ${color.starred};
  border-radius: 50%;
  width: 114px;
  height: 114px;
  flex-shrink: 0;
  border: 2px solid #fff;
  z-index: 2;
  
  ${media.mobile`
    width: 84px;
    height: 84px;
  `}
`

const DoctorBox = styled(Wrapper)`
  margin-left: -23px;
  width: 114px;
  border-radius: 50%;
  height: 114px;
  flex-shrink: 0;
  z-index: 1;
 
  ${media.mobile`
    width: 84px;
    height: 84px;
    margin-left: -15px;
  `}
  
  ${Img} {
    border-radius: 50%;
    width: 114px;
    height: 114px;
    border: 2px solid #fff;
    
    ${media.mobile`
      width: 84px;
      height: 84px;
    `}
  }
`

const ClinicBox = styled(Wrapper)`
  margin-left: -22px;
  width: 110px;
  height: 110px;
  flex-shrink: 0;
  z-index: 0;
  
  ${media.mobile`
    width: 80px;
    height: 80px;
    margin-left: -12px;
  `}
  
  ${Img} {
    width: 110px;
    height: 110px;
    
    ${media.mobile`
      width: 80px;
      height: 80px;
    `}
  }
`

export const EmptyFavorite = () => {
  return <Well>
    <Container>
      <TitleText>Здесь пока пусто</TitleText>
      <TitleText color={'black50'}>Добавляйте своих врачей и клиники в избранное, для быстрого поиска и записи к ним</TitleText>
      <Wrapper padding={'62px 0 0'} mobilePadding={'146px 0 0'} align={'center'}>
        <StarBox align={'center'} justify={'center'}>
          <Icon height={48} width={48} type={'star'} color={'white'} shrink={'0'} />
        </StarBox>
        <DoctorBox align={'center'} justify={'center'}>
          <Img shrink={'0'} src={'/static/doctor/male_doctor.svg'} alt={''} />
        </DoctorBox>
        <ClinicBox align={'center'} justify={'center'}>
          <Img shrink={'0'} src={'/static/mocks/clinic-empty.svg'} alt={''} />
        </ClinicBox>
      </Wrapper>
    </Container>
  </Well>
}
