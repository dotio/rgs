import React from 'react'
import {MedcardInfo} from './info'
import {Well} from '../../../ui/well'
import {Gap} from '../../../ui/gap'
import {OrdersShort} from './orders/short'
import RecommendationsShort from './recommendations/short'
import {ResearchesShort} from './researches/short'
import {Divider} from '../../../ui/divider'
import {FileList} from './files/file-list'

export const MedcardComponent = ({medcardId}) => {
  return <Gap gap={'6px'}>
    <MedcardInfo medcardId={medcardId}/>
    <Well>
      <OrdersShort medcardId={medcardId} />
      <Divider margin={'24px 0'}/>
      <RecommendationsShort medcardId={medcardId} />
      <Divider margin={'24px 0'}/>
      <ResearchesShort medcardId={medcardId} />
      <Divider margin={'24px 0'} />
      <FileList medcardId={medcardId} />
    </Well>
  </Gap>
}