import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from './Events'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
// import LogRun from './LogRun'

const propTypes = {}

class Selectable extends React.Component {
  constructor (...args) {
    super(...args)

    this.state = {
      events,
      hideActors: false
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

  toggleLogRun = () => this.setState(prevState => {
    return { hideLogRun: !prevState.hideLogRun }
  })

  eventStyleGetter (event, start, end, isSelected) {
    console.log(event)
    const backgroundColor = '#' + event.hexColor
    const style = {
      backgroundColor: backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block'
    }
    return {
      style: style
    }
  }

  render () {
    // const { localizer } = this.props
    const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

    return (
      <div>
        <div active="plan" title="Planning">
          <div className="content-app fixed-header">
            <div className="app-body">
              <div className="box">
                <BigCalendar
                  style={{ height: 500, width: this.state.width }}
                  selectable
                  localizer={localizer}
                  events={this.state.events}
                  defaultView={BigCalendar.Views.MONTH}
                  scrollToTime={new Date(1970, 1, 1, 6)}
                  defaultDate={new Date()}
                  onSelectEvent={event => alert(event.title, event.start, event.end)}
                  onSelectSlot={this.handleSelect}
                  eventPropGetter={(this.eventStyleGetter)}
                />
              </div>
            </div>
          </div>
        </div>
        <button onClick={this.toggleLogRun}>
          {this.state.hideLogRun ? 'Show Log Run' : 'Hide Log Run'}
        </button>
      </div>
    )
  }
}

Selectable.propTypes = propTypes

export default Selectable
