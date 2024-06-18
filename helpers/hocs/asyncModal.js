import React, {Component} from 'react'
export const asyncModal = (WrappedComponent, request) => {
  return class extends Component {
    constructor(props) {
      super(props)
      this.state = {
        visible: false,
        data: null
      }
    }

    async componentDidMount() {
      if (request) {
        const data = await request(this.props)
        this.setState({
          visible: true,
          data: data,
        })
      } else {
        this.setState({
          visible: true
        })
      }
    }

    render() {
      if (this.state.visible) {
        return <WrappedComponent data={this.state.data} {...this.props} />
      }
      return null
    }
  }
}
