import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
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
    return axios({
      method: 'GET',
      url: `${apiUrl}/workouts`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
    // this.setState({ workouts: response.data.workouts })

      .then(response => {
        this.setState({ workouts: response.data.workouts })
      })
      .catch(console.error)
  }

  render () {
    const workouts = this.state.workouts.map(workout => (
      <li key={workout.id}>
        <Link to={'/workouts/' + workout.id}>{workout.title ? workout.title : 'Unknown Title'}</Link>
      </li>
    ))

    return (
      <div>
        <p>All the workouts</p>
        <ul>
          {workouts}
        </ul>
      </div>
    )
  }
}

export default LogWorkouts
