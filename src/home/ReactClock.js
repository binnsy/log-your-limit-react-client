import React, { PureComponent } from 'react'
import ReactMomentCountDown from 'react-moment-countdown'
import moment from 'moment'
const propTypes = {}

export default class SampleClass extends PureComponent {
  constructor (props) {
    super(props)
    this.state = { endCountdown: false }
    this.sampleOnTick = this.sampleOnTick.bind(this)
    this.sampleOnCountdownEnd = this.sampleOnCountdownEnd.bind(this)
  }
  sampleOnTick (countdown) {
    this.setState({ endCountdown: countdown <= 0 })
  }
  sampleOnCountdownEnd () {
    console.log('Happy Birthday to you :)')
  }
  render () {
    const { date } = this.props
    console.log(date)
    const dateInFuture = moment('2017-12-31', 'YYYY-MM-DD')
    return (
      <ReactMomentCountDown toDate={dateInFuture}
        onTick={this.sampleOnTick}
        onCountdownEnd={this.sampleOnCountdownEnd} />
    )
  }
}
ReactMomentCountDown.propTypes = propTypes
