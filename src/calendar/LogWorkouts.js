import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../apiConfig'
import Layout from '../Layout'

class LogWorkouts extends Component {
  // props not being used
  constructor (props) {
    super(props)

    this.state = {
      workouts: []
    }
  }

  async componentDidMount () {
    const response = await axios(`${apiUrl}/workouts`)
    this.setState({ workouts: response.data.workouts })
    // .then(res => {
    //   this.setState({ movies: res.data.movies })
    // })
    //
    // .catch(console.error)
  }
  render () {
    const workouts = this.state.workouts.map(workout => (
      <li key={workout.id}>
        <Link to={'/workouts/' + workout.id}>{workout.title ? workout.title : 'Unknown Title'}</Link>
      </li>
    ))

    return (
      <Layout>
        <p>All the workouts</p>
        <ul>
          {workouts}
        </ul>
      </Layout>
    )
  }
}

export default LogWorkouts
