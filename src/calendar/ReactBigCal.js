import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import axios from 'axios'

import './Calendar.scss'
import apiUrl from '../apiConfig'
moment.locale('en-GB')
BigCalendar.momentLocalizer(moment)

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
          this.setState({ events: events })
          // events[i].start = moment.utc(events[i].start).toDate()
          // events[i].end = moment.utc(events[i].end).toDate()
          console.log(this.state.events)
          console.log(events[i].start)
        }
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
    const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Test Calendar</h1>
        </header>
        <div style={{ height: 700 }}>
          <BigCalendar
            events={this.state.events}
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
