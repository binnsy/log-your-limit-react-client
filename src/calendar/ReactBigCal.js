import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
// import { Link } from 'react-router-dom'
// import Button from 'react-bootstrap/Button'

// import momentTZ from 'moment-timezone'
import './Calendar.scss'
import apiUrl from '../apiConfig'
// import CalendarEvent from './CalendarEvent'
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

  // handleSelect = event => this.setState({
  //   events: event
  // })
  // handleSelect = {event.title, event.start, event.end, event,description)}

// onSelectEvent = {event => alert(event.title, event.start, event.end)}
// handleSelect = ({ start, end }) => {
//   const title = window.prompt('New Event name')
//   if (title) {
//     this.setState({
//       events: [
//       ]
//     })
//   }
// }
// calendarEventCell = ({ event }) => {
//   return (
//     <div className="calendar-event">
//       <p>{event.title}</p>
//       <span className="event-time">{event.description}</span>
//     </div>
//   )
// }
// <div>
//   <p>Date: {workout.date ? workout.date : ' - '}</p>
//   <p>Description: {workout.description ? workout.description : ' - '}</p>
//   <p>Dtart date: {workout.start ? workout.start : ' - '}</p>
//   <p>End date: {workout.end ? workout.end : ' - '}</p>
//   <p>Distance: {workout.distance ? workout.distance : ' - '}</p>
//   <p>Time: {workout.time ? workout.time : ' - '}</p>
// </div>
handleEventClick = () => {
  console.log('clicked!')
  const { events } = this.state
  console.log(event.title)
  console.log(event)
  console.log(this.state.events)
  // console.log(this.state.events[i].id)
  console.log(events)
  // if events.date ===
  for (let i = 0; i < this.state.length; i++) {
    console.log(event[i].id)
  // const { events } = this.props
  }

  console.log('event clicked!', this.state.events)
}

render () {
  const { events } = this.state
  console.log(this.state.events)
  console.log(events)
  const { alert } = this.props
  moment.locale('en')
  const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
  console.log(localizer)
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title-my-cal">My Training Calendar</h1>
        <Link to={'training-plan'}>
          <Button className="ironman-plan" variant="secondary">Ironman Training Plan</Button>
        </Link>
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
          // components={{
          //   event: CalendarEvent
          // }}
          // onSelectEvent={(event) => this.handleSelect(event)}
          // onSelectEvent={event => onEventClick(event, props)}
          // eventPropGetter={(this.eventStyleGetter)}
          // eventPropGetter={event}
          // onSelectSlot={this.handleSelect}
          // onSelectEvent={event => alert(
          //   <p>{ event.title }</p>,
          //   <p>{event.description}</p>
          //   , 'success')}
          // onSelectEvent={this.handleEventClick}
          // onSelectEvent={event => alert(event.distance, 'info')}
          onSelectEvent={event => alert(`Title:  ${event.title}   ||   Distance:  ${event.distance}   ||   Time:  ${event.time}`, 'info')}
        />
      </div>
    </div>
  )
}
}

Cal.propTypes = propTypes

export default Cal
