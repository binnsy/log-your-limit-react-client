// import React from 'react'
// import BigCalendar from 'react-big-calendar'
// import moment from 'moment'
//
// // Setup the localizer by providing the moment (or globalize) Object
// // to the correct localizer.
// const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
//
// const MyCalendar = props => (
//   <div>
//     <BigCalendar
//       localizer={localizer}
//       events={myEventsList}
//       startAccessor="start"
//       endAccessor="end"
//     />
//   </div>
// )
import React, { Component } from 'react'
import events from './Events'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
moment.locale('en')

const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class Calendar extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      user: null,
      view: 'day',
      date: new Date()
      // width: 500
    }
  }

  componentDidMount () {
    window.addEventListener('resize', () => {
      /* this.setState({
        width: window.innerWidth,
        height: window.innerHeight
      }); */
    })
  }

  render () {
    return (
      <div style={{ height: 700 }}>
        <button onClick={() => this.setState({ view: 'day' })}>Day</button>
        <button onClick={() => this.setState({ view: 'month' })}>Month</button>
        <BigCalendar
          style={{ height: 500, width: this.state.width }}
          toolbar={false}
          events={events}
          step={60}
          localizer={localizer}
          views={allViews}
          view={this.state.view}
          onView={() => {}}
          date={this.state.date}
          onNavigate={date => this.setState({ date })}
        />
      </div>
    )
  }
}

export default Calendar
