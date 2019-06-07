import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
// import Cal from './ReactBigCal'
// import { IconName } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import BigCalendar from 'react-big-calendar'
// import moment from 'moment'
import './Calendar.scss'
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

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faBiking,
  faRunning,
  faSwimmer
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(
  fab,
  faBiking,
  faRunning,
  faSwimmer
)

class LogWorkouts extends Component {
  // props not being used
  constructor (props) {
    super(props)

    this.state = {
      workouts: []
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
        this.setState({ workouts: response.data.workouts })
        console.log(response)
      })
      .catch(console.error)
  }

  Capitalize (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  FontAwesome (str) {
    console.log(str)
    str = str.charAt(0).toUpperCase() + str.slice(1)
    console.log(str)
    // for (const key in response.data.workout) {
    if (str === 'Run') {
      return <FontAwesomeIcon icon={faRunning} size="2x" />
      // return <i className="far fa-clock">Run</i>
    } else if (str === 'Swim') {
      return <FontAwesomeIcon icon={faSwimmer} size="2x" />
    } else if (str === 'Bike') {
      return <FontAwesomeIcon icon={faBiking} size="2x" />
    } else {
    }
  }

  //   if (str === 'Run') {
  //     console.log(str)
  //     return <i className="far fa-clock">Run</i>
  //     // <FontAwesomeIcon icon={faRunning} size="4x" />
  //   }
  // }
  // const editNull = (response) => {
  //   for (const key in response.data.workout) {
  //     if (response.data.workout[key] === null) {
  //       response.data.workout[key] = ''
  //     }
  //   }
  // }

  render () {
    const { workouts } = this.state
    const { user } = this.props
    console.log({ workouts })
    return (
      <Fragment>
        <div className='add-workout'>
          <h2 className="add-workout" size="4x">Workouts Logged</h2>
          <li className="pv3 ph2 ma0 link grow add-workout">
            <FontAwesomeIcon icon={faSwimmer} size="4x" />
            <FontAwesomeIcon icon={faBiking} size="4x" />
            <FontAwesomeIcon icon={faRunning} size="4x" />
          </li>
          <div>
            <Button className='add-workout' variant="success" href="#create-workout">Add A Workout</Button>
          </div>
        </div>
        <ListGroup>
          <div className='list-workouts'>
            { user && workouts.map(workout => (
              <div className='one-workout' key={workout.id}>
                <span className="h5 d-block">{this.Capitalize(workout.title)}</span>
                <span className="h5 d-block">{this.FontAwesome(workout.title)}</span>
                <span className="d-block">{workout.date}</span>
                <Link to={'/workouts/' + workout.id}>
                  <Button variant="secondary">See workout</Button>
                </Link>
              </div>
            )) }
          </div>
        </ListGroup>
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
