import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
// import Layout from '../Layout'
// import LogWorkout from './calendar/WorkoutCreate'
// import Workout from './calendar/Workout'
// import LogWorkoutEdit from './calendar/WorkoutEdit'
// import Countdown from './home/Countdown'
// <Route exact path='/countdown' component={Countdown}/>
// <Route exact path="/workouts" component={LogWorkouts}/>
// <Route exact path="/create-workout" component={LogWorkout}/>
// <Route exact path="/workouts/:id" component={Workout}/>
// <Route exact path="/workouts/:id/edit" component={LogWorkoutEdit}/>
class LogWorkouts extends Component {
  // props not being used
  constructor (props) {
    super(props)

    this.state = {
      workouts: []
    }
  }

  handleSelect = ({ startDate, endDate }) => {
    const title = window.prompt('New Event name')
    if (title) {
      this.setState({
        events: [
          ...this.state.events,
          {
            startDate,
            endDate,
            title
          }
        ]
      })
    }
  }

  eventStyleGetter (workout, startDate, endDate, isSelected) {
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

  async componentDidMount () {
    console.log(this.props.user)
    axios({
      method: 'GET',
      url: `${apiUrl}/workouts`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })

    // this.setState({ workouts: response.data.workouts })

      .then(response => {
        const workouts = response.data

        for (let i = 0; i < workouts.length; i++) {
          workouts[i].startDate = this.convertDate(workouts[i].startDate)
          workouts[i].endDate = this.convertDate(workouts[i].endDate)
        }
        this.setState({ workouts: response.data.workouts })
        console.log(response)
      })
      .catch(console.error)
  }

  render () {
    const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

    const { workouts } = this.state
    const { user } = this.props
    console.log({ workouts })
    return (
      <Fragment>
        <div className="d-flex justify-content-between align-items-center py-3">
          <h3 className="m-0">Workouts currently in the Library</h3>
          {user && <Button variant="success" href="#create-workout">Add A Workout</Button>}
        </div>
        <ListGroup>
          { user && workouts.map(workout => (
            <ListGroup.Item key={workout.id} action>
              <span className="h5 d-block">{workout.title}</span>
              <span className="d-block">{workout.distance} {workout.time}</span>
              <Link to={'/workouts/' + workout.id}>
                <Button>See workout</Button>
              </Link>
            </ListGroup.Item>
          )) }
        </ListGroup>

        <div style={{ height: 700 }}>
          <BigCalendar
            events={this.state.workouts}
            localizer={localizer}
            step={30}
            defaultView='week'
            views={['month', 'week', 'day']}
            defaultDate={new Date()}
            onSelectEvent={workout => alert(workout.title, workout.startDate, workout.endDate)}
            onSelectSlot={this.handleSelect}
            eventPropGetter={(this.eventStyleGetter)}
          />
        </div>
      </Fragment>
    )
  }
}
// <div>
//   <p>All the workouts</p>
//   <ul>
//     {workouts}
//   </ul>
// </div>

// const workouts = this.state.workouts.map(workout => (
//   <li key={workout.id}>
//     <Link to={'/workouts/' + workout.id}>{workout.title ? workout.title : 'Unknown Title'}</Link>
//   </li>
// ))
export default LogWorkouts
