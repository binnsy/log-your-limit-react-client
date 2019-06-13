import React, { Component } from 'react'

class Countdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }

  componentWillMount () {
    this.getTimeUntil(this.props.deadline)
  }

  componentDidMount () {
    setInterval(() => this.getTimeUntil(this.props.deadline), 1000)
  }

  leading0 (num) {
    if (num < 10) {
      return '0' + num
    }
    return num
  }

  getTimeUntil (deadline) {
    const time = Date.parse(deadline) - Date.parse(new Date())
    const days = Math.floor(time / (1000 * 60 * 60 * 24))
    // console.log('days: ' + days)
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    // console.log('hours: ' + hours)
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
    // console.log('minutes: ' + minutes)
    const seconds = Math.floor((time % (1000 * 60)) / 1000)
    // console.log('seconds' + seconds)
    this.setState({ days, hours, minutes, seconds })
  }

  render () {
    return (
      <div>
        <div>
          <div className='countdown-days'>{this.leading0(this.state.days)} days</div>
          <div className='countdown-hours'>{this.leading0(this.state.hours)} hours</div>
          <div className='countdown-minutes'>{this.leading0(this.state.minutes)} minutes</div>
          <div className='countdown-seconds'>{this.leading0(this.state.seconds)} seconds</div>
        </div>
      </div>
    )
  }
}

export default Countdown
// import React, { Component } from 'react'
// import PropTypes from 'prop-types'
//
// class Countdown extends Component {
//   constructor (props) {
//     super(props)
//
//     this.state = {
//       days: 0,
//       hours: 0,
//       min: 0,
//       sec: 0
//     }
//   }
//
//   componentDidMount () {
//     // update every second
//     this.interval = setInterval(() => {
//       const date = this.calculateCountdown(this.props.date)
//       date ? this.setState(date) : this.stop()
//     }, 1000)
//   }
//
//   componentWillUnmount () {
//     this.stop()
//   }
//
//   calculateCountdown (end) {
//     let diff = (Date.parse(new Date(end)) - Date.parse(new Date())) / 1000
//
//     // clear countdown when date is reached
//     if (diff <= 0) return false
//
//     const timeLeft = {
//       years: 0,
//       days: 0,
//       hours: 0,
//       min: 0,
//       sec: 0,
//       millisec: 0
//     }
//
//     // calculate time difference between now and expected date
//     if (diff >= (365.25 * 86400)) { // 365.25 * 24 * 60 * 60
//       timeLeft.years = Math.floor(diff / (365.25 * 86400))
//       diff -= timeLeft.years * 365.25 * 86400
//     }
//     if (diff >= 86400) { // 24 * 60 * 60
//       timeLeft.days = Math.floor(diff / 86400)
//       diff -= timeLeft.days * 86400
//     }
//     if (diff >= 3600) { // 60 * 60
//       timeLeft.hours = Math.floor(diff / 3600)
//       diff -= timeLeft.hours * 3600
//     }
//     if (diff >= 60) {
//       timeLeft.min = Math.floor(diff / 60)
//       diff -= timeLeft.min * 60
//     }
//     timeLeft.sec = diff
//
//     return timeLeft
//   }
//
//   stop () {
//     clearInterval(this.interval)
//   }
//
//   addLeadingZeros (value) {
//     value = String(value)
//     while (value.length < 2) {
//       value = '0' + value
//     }
//     return value
//   }
//
//   render () {
//     const countDown = this.state
//
//     return (
//       <div className="Countdown">
//         <span className="Countdown-col">
//           <span className="Countdown-col-element">
//             <strong>{this.addLeadingZeros(countDown.days)}</strong>
//             <span>{countDown.days === 1 ? 'Day' : 'Days'}</span>
//           </span>
//         </span>
//
//         <span className="Countdown-col">
//           <span className="Countdown-col-element">
//             <strong>{this.addLeadingZeros(countDown.hours)}</strong>
//             <span>Hours</span>
//           </span>
//         </span>
//
//         <span className="Countdown-col">
//           <span className="Countdown-col-element">
//             <strong>{this.addLeadingZeros(countDown.min)}</strong>
//             <span>Min</span>
//           </span>
//         </span>
//
//         <span className="Countdown-col">
//           <span className="Countdown-col-element">
//             <strong>{this.addLeadingZeros(countDown.sec)}</strong>
//             <span>Sec</span>
//           </span>
//         </span>
//       </div>
//     )
//   }
// }
//
// Countdown.propTypes = {
//   date: PropTypes.string.isRequired
// }
//
// Countdown.defaultProps = {
//   date: new Date()
// }
//
// export default Countdown
// import React from 'react'
// import ReactDOM from 'react-dom'
// import Countdown from 'react-countdown-now'
//
// // Random component
// const Completionist = () => <span>You are good to go!</span>
//
// // Renderer callback with condition
// const renderer = ({ hours, minutes, seconds, completed }) => {
//   if (completed) {
//     // Render a completed state
//     return <Completionist />
//   } else {
//     // Render a countdown
//     return <span>{hours}:{minutes}:{seconds}</span>
//   }
// }
//
// ReactDOM.render(
//   <Countdown
//     date={new Date(2019, 9, 7, 8, 0, 0, 0) + Date.now()}
//     renderer={renderer}
//   />,
//   document.getElementById('root')
// )
//
// export default Completionist
