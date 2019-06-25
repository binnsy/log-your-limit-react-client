import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import './Calendar.scss'
import apiUrl from '../apiConfig'

moment.locale('en')

const propTypes = {}

class Cal extends Component {
  constructor (props) {
    super(props)
    // Declare state variables here
    this.state = {
      events: []
    }
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
        const events = response.data.workouts
        // console.log(events)

        for (let i = 0; i < events.length; i++) {
          events[i].start = moment.utc(events[i].start).add(1, 'day').toDate()
          events[i].end = moment.utc(events[i].end).add(1, 'day').toDate()
          // console.log(this.state.events)
          // console.log(events[i].start)
        }
        this.setState({ events: events })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    const { alert } = this.props
    moment.locale('en')
    const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
    // console.log(localizer)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title-my-cal">My Training Calendar</h1>
          <Link to={'training-plan'}>
            <Button className="ironman-plan" variant="secondary">Ironman Training Plan</Button>
          </Link>
        </header>
        <div className="cal" style={{ height: 700 }}>
          <BigCalendar
            events={this.state.events}
            culture='en'
            localizer={localizer}
            step={30}
            defaultView={BigCalendar.Views.MONTH}
            views={['month', 'week', 'day']}
            defaultDate={new Date()}
            onSelectEvent={event => alert(`Title:  ${event.title}   ||   Distance:  ${event.distance}   ||   Time:  ${event.time}`, 'info')}
          />
        </div>
      </div>
    )
  }
}

Cal.propTypes = propTypes

export default Cal
