import React from 'react'
import PropTypes from 'prop-types'

const MIN_PERCENTAGE = 0
const MAX_PERCENTAGE = 100
const MAX_X = 100
const MAX_Y = 100
const FULL_RADIUS = 50
const CENTER_X = 50
const CENTER_Y = 50

export class CircularProgressbar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      percentage: props.initialAnimation ? 0 : props.percentage,
    }
  }

  componentDidMount() {
    if (this.props.initialAnimation) {
      this.initialTimeout = setTimeout(() => {
        this.requestAnimationFrame = window.requestAnimationFrame(() => {
          this.setState({
            percentage: this.props.percentage,
          })
        })
      }, 0)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      percentage: nextProps.percentage,
    })
  }

  componentWillUnmount() {
    clearTimeout(this.initialTimeout)
    window.cancelAnimationFrame(this.requestAnimationFrame)
  }

  getBackgroundPadding() {
    if (this.props.background) {
      // default padding to be the same as strokeWidth
      // compare to null because 0 is falsy
      if (this.props.backgroundPadding == null) {
        return this.props.strokeWidth
      }
      return this.props.backgroundPadding
    }
    // don't add padding if not displaying background
    return 0
  }

  getPathDescription() {
    const radius = this.getPathRadius()
    const rotation = this.props.counterClockwise ? 1 : 0

    // Move to center of canvas
    // Relative move to top canvas
    // Relative arc to bottom of canvas
    // Relative arc to top of canvas
    return `
      M ${CENTER_X},${CENTER_Y}
      m 0,-${radius}
      a ${radius},${radius} ${rotation} 1 1 0,${2 * radius}
      a ${radius},${radius} ${rotation} 1 1 0,-${2 * radius}
    `
  }

  getPathStyles() {
    const diameter = Math.PI * 2 * this.getPathRadius()
    const truncatedPercentage = Math.min(Math.max(this.state.percentage, MIN_PERCENTAGE), MAX_PERCENTAGE)
    const dashoffset = ((100 - truncatedPercentage) / 100) * diameter

    return {
      strokeDasharray: `${diameter}px ${diameter}px`,
      strokeDashoffset: `${this.props.counterClockwise ? -dashoffset : dashoffset}px`,
    }
  }

  getPathRadius() {
    // the radius of the path is defined to be in the middle, so in ordering for the path to
    // fit perfectly inside the 100x100 viewBox, need to subtract half the strokeWidth
    return FULL_RADIUS - (this.props.strokeWidth / 2) - this.getBackgroundPadding()
  }

  render() {
    const {
      className,
      classes,
      styles,
      strokeWidth
    } = this.props
    const pathDescription = this.getPathDescription()

    return (
      <svg
        className={`${classes.root} ${className}`}
        style={styles.root}
        viewBox={`0 0 ${MAX_X} ${MAX_Y}`}
        onClick={this.props.handleClick}
      >
        {
          this.props.background ? (
            <circle
              className={classes.background}
              style={styles.background}
              cx={CENTER_X}
              cy={CENTER_Y}
              r={FULL_RADIUS}
            />
          ) : null
        }

        <path
          className={classes.trail}
          style={styles.trail}
          d={pathDescription}
          strokeWidth={strokeWidth}
          fillOpacity={0}
        />

        <path
          className={classes.path}
          d={pathDescription}
          strokeWidth={6}
          fillOpacity={0}
          style={Object.assign({}, styles.path, this.getPathStyles())}
        />

        <g xmlns="http://www.w3.org/2000/svg" stroke="null" id="svg_4" fill="#FFFFFF">
          <path stroke="null" strokeWidth="6" id="Path-15" d="m35.732224,39.743355l25.000001,25.833335c0.976325,1.008843 2.559225,1.008843 3.53555,0c0.9763,-1.008869 0.9763,-2.644533 0,-3.653402l-25.000001,-25.833335c-0.976325,-1.008843 -2.559225,-1.008843 -3.53555,0c-0.9763,1.008869 -0.9763,2.644533 0,3.653402z"/>
          <path stroke="null" strokeWidth="6" id="Path-16" d="m60.732225,36.089953l-25.000001,25.833335c-0.9763,1.008869 -0.9763,2.644533 0,3.653402c0.976325,1.008843 2.559225,1.008843 3.53555,0l25.000001,-25.833335c0.9763,-1.008869 0.9763,-2.644533 0,-3.653402c-0.976325,-1.008843 -2.559225,-1.008843 -3.53555,0z"/>
        </g>
      </svg>
    )
  }
}

CircularProgressbar.propTypes = {
  percentage: PropTypes.number.isRequired,
  className: PropTypes.string,
  text: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string),
  styles: PropTypes.objectOf(PropTypes.object),
  strokeWidth: PropTypes.number,
  background: PropTypes.bool,
  backgroundPadding: PropTypes.number,
  initialAnimation: PropTypes.bool,
  counterClockwise: PropTypes.bool,
}

CircularProgressbar.defaultProps = {
  strokeWidth: 8,
  className: '',
  text: null,
  classes: {
    root: 'CircularProgressbar',
    trail: 'CircularProgressbar-trail',
    path: 'CircularProgressbar-path',
    text: 'CircularProgressbar-text',
    background: 'CircularProgressbar-background',
  },
  styles: {
    root: {},
    trail: {},
    path: {},
    text: {},
    background: {},
  },
  background: false,
  backgroundPadding: null,
  initialAnimation: false,
  counterClockwise: false,
}

