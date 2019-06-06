import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
// import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
// import Cal from './ReactBigCal'
// import { IconName } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import BigCalendar from 'react-big-calendar'
// import moment from 'moment'
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

  // Run (str) {
  //   if (str === 'run') {
  //     return str + <i className="fas fa-running"></i>
  //   }
  // }

  render () {
    const { workouts } = this.state
    const { user } = this.props
    console.log({ workouts })
    return (
      <Fragment>
        <div className="add-workout d-flex justify-content-between align-items-center py-3">
          <h3 className="m-0">Workouts Logged</h3>
        </div>
        <div>
          <Button className='add-workout' variant="success" href="#create-workout">Add A Workout</Button>
        </div>
        <div className='list-workouts'>
          { user && workouts.map(workout => (
            <div key={workout.id}>
              <span className="h5 d-block">{this.Capitalize(workout.title)}</span>
              <span className="d-block">{workout.date}</span>
              <Link to={'/workouts/' + workout.id}>
                <Button>See workout</Button>
              </Link>
            </div>
          )) }
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
