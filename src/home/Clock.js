// import React, { Component } from 'react'
// // import moment from 'moment'
//
// class Clock extends Component {
//   constructor (props) {
//     super(props)
//     const fixDate = (new Date()).setHours(0, 0, 0) // for 12:00:00 am
//     const currDate = new Date()
//     this.state = { fixDate, diff: fixDate - currDate }
//   }
//
//   tick () {
//     this.setState((prevState, props) => ({
//       diff: prevState.fixDate - (new Date()).getTime()
//     }))
//   }
//
//   render () {
//     const { diff } = this.state
//     const hours = Math.floor(diff / (60 * 60 * 1000))
//     const mins = Math.floor((diff - (hours * 60 * 60 * 1000)) / (60 * 1000))
//     const secs = Math.floor((diff - (hours * 60 * 60 * 1000) - (mins * 60 * 1000)) / 1000)
//
//     return (
//       <div>
//         <h2>{hours}:{mins}:{secs}</h2>
//       </div>
//     )
//   }
// }
// class Clock extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       days: 0,
//       hours: 0,
//       minutes: 0,
//       seconds: 0
//     }
//   }
//   componentWillMount () {
//     this.getTimeUntil(this.props.date)
//   }
//   componentDidMount () {
//     setInterval(() => this.getTimeUntil(this.props.date), 1000)
//   }
//   leading0 (num) {
//     return num < 10 ? '0' + num : num
//   }
//   getTimeUntil (date) {
//     // let m = moment('2013-10-06Z')
//     // date = m.utc().format()
//
//     // console.log(moment().format(date))
//     // date = (date.setHours(d.getHours() - 2))
//     console.log(date)
//     console.log(Date.now())
//     const time = Date.parse(date) - Date.now()
//     if (time < 0) {
//       this.setState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
//     } else {
//       const seconds = Math.floor((time / 1000) % 60)
//       const minutes = Math.floor((time / 1000 / 60) % 60)
//       const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
//       const days = Math.floor(time / (1000 * 60 * 60 * 24))
//       this.setState({ days, hours, minutes, seconds })
//     }
//   }
//   render () {
//     return (
//       <div>
//         <div className="Clock-days">{this.leading0(this.state.days)} Days</div>
//         <div className="Clock-hours">
//           {this.leading0(this.state.hours)} Hours
//         </div>
//         <div className="Clock-minutes">
//           {this.leading0(this.state.minutes)} Minutes
//         </div>
//         <div className="Clock-seconds">
//           {this.leading0(this.state.seconds)} Seconds
//         </div>
//       </div>
//     )
//   }
// }
import React from 'react'
import moment from 'moment'

class Clock extends React.Component {
    state = {
      days: '',
      hours: '',
      minutes: '',
      seconds: ''
    };

    componentDidMount () {
      this.interval = setInterval(() => {
        const { timeTillDate, timeFormat } = this.props
        const then = moment(timeTillDate, timeFormat)
        const now = moment()
        moment.locale('en')
        console.log(now)
        console.log(then)
        const countdown = moment(then - now)
        console.log(countdown)
        const days = countdown.format('D')
        const hours = countdown.format('HH')
        // hours = moment(hours).add(2, 'hours').toDate()
        const minutes = countdown.format('mm')
        const seconds = countdown.format('ss')
        this.setState({ days, hours, minutes, seconds })
      }, 1000)
    }

    componentWillUnmount () {
      if (this.interval) {
        clearInterval(this.interval)
      }
    }

    render () {
      const { days, hours, minutes, seconds } = this.state
      return (
        <div>
          <div className="countdown-wrapper">
            <div className="countdown-item">
              {days}
              <span>days</span>
            </div>
            <div className="countdown-item">
              {hours}
              <span>hours</span>
            </div>
            <div className="countdown-item">
              {minutes}
              <span>minutes</span>
            </div>
            <div className="countdown-item">
              {seconds}
              <span>seconds</span>
            </div>
          </div>
        </div>
      )
    }
}
export default Clock
