import React, { Component } from 'react'

class Clock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  componentDidMount () {
    this.getTimeUntil(this.props.deadLine)
    this.timerID = setInterval(() => this.getTimeUntil(this.props.deadLine), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timerID)
  }

  leading0 (num) {
    return (num >= 0 && num < 10) ? '0' + num : num
  }

  getTimeUntil (deadLine) {
    const time = Date.parse(deadLine) - Date.parse(new Date())
    const seconds = Math.floor((time / 1000) % 60)
    const minutes = Math.floor((time / 1000 / 60) % 60)
    const hours = Math.floor((time / 1000 / 60 / 60) % 24)
    const days = Math.floor(time / 1000 / 60 / 60 / 24)

    this.setState({ days, hours, minutes, seconds })
  }

  render () {
    const days = this.state.Days
    const hours = this.state.hours
    const minutes = this.state.minutes
    const seconds = this.state.Seconds

    let message = ''

    if (days && hours && minutes && seconds === 0) {
      clearInterval(this.state.deadline)
      message = 'Zero Days!'
    }
    const endCountdownmessage = `${message}`

    return (
      <div>
        <div className="Clock-days">{ this.leading0(this.state.days) } Days</div>
        <div className="Clock-hours">{ this.leading0(this.state.hours) } hours</div>
        <div className="Clock-minutes">{ this.leading0(this.state.minutes) } minutes</div>
        <div className="Clock-seconds">{ this.leading0(this.state.seconds) } seconds</div>
        <h3 className="message">{ endCountdownmessage }</h3>
      </div>
    )
  }
}

export default Clock
