import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from './Events'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import './Calendar.scss'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const propTypes = {}

class Selectable extends React.Component {
  constructor (...args) {
    super(...args)

    this.state = {
      events
    }
  }

  handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name')
    if (title) {
      this.setState({
        events: [
          ...this.state.events,
          {
            start,
            end,
            title
          }
        ]
      })
    }
  }

  eventStyleGetter (event, start, end, isSelected) {
    // console.log(event)
    const style = {
      backgroundColor: '#05C4B0',
      // borderRadius: '0px',
      opacity: 0.8
      // color: 'black',
      // border: '1px'
      // display: 'block'
    }
    return {
      style: style
    }
  }

  render () {
    // const { localizer } = this.props
    const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
    const { alert } = this.props

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title-plan">Ironman Training Plan</h1>
          <h6 className="App-title-plan">This calendar is not editable. This is a 24 week 2019 Mt. Tremblant Ironman training plan.</h6>
          <Link to={'calendar'}>
            <Button className="btn my-training" variant="secondary">Back to My Training Calendar</Button>
          </Link>
        </header>
        <div className="cal" style={{ height: 700 }}>
          <BigCalendar
            style={{ width: this.state.width }}
            // selectable
            culture='en'
            localizer={localizer}
            events={this.state.events}
            defaultView={BigCalendar.Views.MONTH}
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date()}
            eventPropGetter={(this.eventStyleGetter)}
            onSelectEvent={event => alert(`Title:  ${event.title}   ||   Distance:  ${event.distance}   ||   Time:  ${event.time}`, 'info')}

          />
        </div>
      </div>
    )
  }
}
// onSelectSlot={this.handleSelect}

Selectable.propTypes = propTypes

export default Selectable
