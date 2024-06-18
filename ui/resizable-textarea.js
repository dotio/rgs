import React, {forwardRef, PureComponent} from 'react'
import {omit} from 'ramda'
import PropTypes from 'prop-types'
import {Textarea} from './textarea'

class ResizableTextareaPure extends PureComponent {
  componentDidMount() {
    this.resizeTextArea()
  }

  componentDidUpdate() {
    this.resizeTextArea()
  }

  resizeTextArea = () => {
    const prevHeight = this.textarea.style.height
    const {maxResizeHeight} = this.props
    this.textarea.style.height = 0
    const scrollHeight = this.textarea.scrollHeight

    this.textarea.style.height = Math.min(scrollHeight, maxResizeHeight) + 'px'
    this.textarea.scrollTop = scrollHeight
    if (prevHeight !== this.textarea.style.height) {
      this.props.onResize && this.props.onResize()
    }
  }

  handleChange = () => {
    const { onChange } = this.props
    onChange && onChange(event)
  }

  setRef = (node) => {
    const {forwardRef} = this.props
    this.textarea = node
    forwardRef && forwardRef(node)
  }

  render() {
    const textAreaProps = omit(['onResize','maxResizeHeight', 'forwardRef'], this.props)
    return (
      <Textarea
        {...textAreaProps}
        ref={this.setRef}
        value={this.props.value}
        onChange={this.handleChange}
      />
    )
  }
}

ResizableTextareaPure.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  size: PropTypes.string,
  family: PropTypes.string,
  color: PropTypes.string,
  padding: PropTypes.string,
  borderRadius: PropTypes.string,
  borderColor: PropTypes.string,
  borderSize: PropTypes.string,
  resize: PropTypes.string,
  maxHeight: PropTypes.string,
  placeholderColor: PropTypes.string,
  background: PropTypes.string,
  minRows: PropTypes.number,
  rows: PropTypes.number,
  maxRows: PropTypes.number,
  placeholder: PropTypes.string,
  caretColor: PropTypes.string,
  lineHeight: PropTypes.string,
  onResize: PropTypes.func,
  maxResizeHeight: PropTypes.number,
}

ResizableTextareaPure.defaultProps = {
  width: '100%',
  height: 'auto',
  color: '#000',
  size: '13px',
  borderColor: 'transparent',
  borderSize: '1px',
  borderRadius: '0',
  resize: 'none',
  placeholderColor: 'polarr4',
  value: '',
  rows: 1,
  minRows: 1,
  maxRows: 5,
  lineHeight: '22px',
  caretColor: 'black',
  maxResizeHeight: 120
}

export const ResizableTextarea = forwardRef((props, ref) => <ResizableTextareaPure {...props} forwardRef={ref}/>)
