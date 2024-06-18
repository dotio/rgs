import {Container} from '../../../ui/grid/container'
import {Gap} from '../../../ui/gap'
import {DoctorCard} from '../components/doctor-card'
import React from 'react'
import moment from 'moment'
import styled from 'styled-components'
import {Well} from '../../../ui/well'
import {useSelector} from 'react-redux'


const HistoryWell = styled(Well)`
  margin-top: 8px;
  ${p => p.isFirst && `
    border-radius: 0px 0px 20px 20px;
    margin-top: 0px;
  `}
`

const historyListFormatter = (list) => {
  let dates = list.reduce((set, {date}) => {
    const currentDate = moment(date).format('YYYY-MM-DD')
    const isFind = !!set.find(date => date === currentDate)

    return isFind ? set : [...set, currentDate]
  }, [])
    .sort((a, b) => moment(a).valueOf() - moment(b).valueOf())
    .reduce((ac,a) => ({...ac,[a]: []}),{})

  list.forEach(item => {
    const formattedDate = moment(item.date).format('YYYY-MM-DD')
    dates[formattedDate] = [item, ...dates[formattedDate]]
  })

  return dates
}

export const HistoryBlock = () => {
  const list = useSelector(state => state.profileHistory.list)
  const formattedList = historyListFormatter(list)

  return (
    Object.keys(formattedList).map((key, index) => (
      <HistoryWell isFirst={index === 0} key={index}>
        <Container>
          <Gap direction={'top'} gap={'36px'}>
            {formattedList[key].map((item, index) => (
              <DoctorCard
                key={index}
                {...item}
              />
            ))}
          </Gap>
        </Container>
      </HistoryWell>
    ))
  )
}