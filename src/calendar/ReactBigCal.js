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
      workouts: []
    }
  }

  convertDate = (date) => {
    return moment.utc(date).toDate()
  }

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
        // console.log(response.data)
        const appointments = response.data
        // console.log(appointments)

        for (let i = 0; i < appointments.length; i++) {
          // console.log(appointments[i])

          appointments[i].title = this.convertDate(appointments[i].evts)
          appointments[i].date = this.convertDate(appointments[i].start)
          appointments[i].date = this.convertDate(appointments[i].end)
          // evts, start, end, accessors
          // appointments[i].end = this.convertDate(appointments[i].end)
        }

        this.setState({
          workouts: appointments
        })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    const { workouts } = this.state
    // console.log(workouts)
    const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Test Calendar</h1>
        </header>
        <div style={{ height: 700 }}>
          <BigCalendar
            events={workouts}
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
