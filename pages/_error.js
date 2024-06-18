import React from 'react'
import {Text} from '../ui/text'
import {Well} from '../ui/well'

export default class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null
    return { statusCode }
  }

  render () {
    return (
      <Well padding={'60px 16px'}>
        <Text align={'center'}>В разработке</Text>
      </Well>
    )
  }
}