import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
// import { logWorkout } from '../api'
// import messages from '../messages'
import Layout from '../Layout'
import LogWorkoutForm from './LogWorkoutForm'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Redirect } from 'react-router-dom'

class LogWorkout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      workout: {
        id: '',
        title: '',
        description: '',
        date: '',
        startDate: '',
        endDate: '',
        distance: '',
        time: ''
      },
      createdWorkoutId: null
    }
  }

  handleSubmit = async (event) => {
    console.log('submitted', event)
    event.preventDefault()
    const response = await axios.post(`${apiUrl}/workouts`, {
      workout: this.state.workout
    })
    this.setState({ createdWorkoutId: response.data.workout.id })
  }

  handleChange = (event) => {
    // access and update state
    console.log('change', event)
    const updatedField = {
      [event.target.name]: event.target.value
    }

    const editedWorkout =
    Object.assign(this.state.workout, updatedField)
    this.setState({ workout: editedWorkout })
  }

  render () {
    const { createdWorkoutId, workout } = this.state

    if (createdWorkoutId) {
      return <Redirect
        to={`/workouts/${createdWorkoutId}`} />
    }

    return (
      <Layout>
        <LogWorkoutForm
          workout={workout}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          cancelPath='/'
        />
      </Layout>
    )
  }
}

export default LogWorkout
