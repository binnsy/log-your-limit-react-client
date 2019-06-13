import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import axios from 'axios'
// import momentTZ from 'moment-timezone'
import './Calendar.scss'
import apiUrl from '../apiConfig'
// momentTZ.setDefault('America/New_York')
// const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
// console.log(localizer)
// import 'moment/locale/en'
console.log(moment(Date.now()))

// BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))
moment.locale('en')

// console.log(BigCalendar.momentLocalizer(moment))
// BigCalendar.momentLocalizer(moment)

const propTypes = {}

class Cal extends Component {
  constructor (props) {
    super(props)
    // Declare state variables here
    this.state = {
      events: []
    }
  }

  // convertDate = (date) => {
  //   return moment.utc(date).toDate()
  // }

  async componentDidMount () {
    // const self = this
    axios({
      method: 'GET',
      url: `${apiUrl}/workouts`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(response => {
        const events = response.data.workouts
        console.log(events)
        console.log(events[0].start)
        // console.log(events.title)
        //
        for (let i = 0; i < events.length; i++) {
          events[i].start = moment.utc(events[i].start).add(1, 'day').toDate()
          events[i].end = moment.utc(events[i].end).add(1, 'day').toDate()
          console.log(this.state.events)
          console.log(events[i].start)
        }
        this.setState({ events: events })
        // events[i].start = moment.utc(events[i].start).toDate()
        // events[i].end = moment.utc(events[i].end).toDate()
        // console.log('hi')
        // for (let i = 0; i < events.length; i++) {
        //   console.log(events[i].start)
        //   console.log(events[i])
        // }
        //   events[i].title = this.convertDate(events[i].evts)
        //   events[i].date = this.convertDate(events[i].start)
        //   events[i].date = this.convertDate(events[i].end)
        //   // evts, start, end, accessors
        //   // events[i].end = this.convertDate(events[i].end)
        // }
        // this.setState({ events: response.data.workouts })
        // console.log(events)
        // self.setState({
        //   workouts: events
        // })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    const { events, workouts } = this.state
    console.log(this.state.events)
    console.log(events)
    console.log(workouts)
    moment.locale('en')
    const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
    console.log(localizer)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Test Calendar</h1>
        </header>
        <div style={{ height: 700 }}>
          <BigCalendar
            events={this.state.events}
            culture='en'
            localizer={localizer}
            step={30}
            defaultView={BigCalendar.Views.MONTH}
            views={['month', 'week', 'day']}
            defaultDate={new Date()}
          />
        </div>
      </div>
    )
  }
}

Cal.propTypes = propTypes

export default Cal
