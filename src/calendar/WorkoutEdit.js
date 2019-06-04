import React, { Component } from 'react'
// import Layout from '../Layout'
import LogWorkoutForm from './LogWorkoutForm'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Redirect, Link } from 'react-router-dom'

class LogWorkoutEdit extends Component {
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
      updated: false
    }
  }

  async componentDidMount () {
    const response = await
    // axios(`${apiUrl}/workouts/${this.props.match.params.id}`)
    axios({
      method: 'GET',
      url: `${apiUrl}/workouts/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
    // if (response.error) {
    //   console.erroe(response.error)
    // } else {
    this.setState({ workout: response.data.workout })
    // }
    // .then(res => {
    //   this.setState({ movie: res.data.movie })
    // })
    // .catch(console.error)
  }

  handleChange = (event) => {
    // access and update state
    console.log('change', event)
    const updatedField = {
      [event.target.name]: event.target.value
    }
    const editedLogWorkout =
    Object.assign(this.state.workout, updatedField)
    this.setState({ workout: editedLogWorkout })
  }

    handleSubmit = async event => {
      event.preventDefault()
      await axios({
        url: `${apiUrl}/workouts/${this.props.match.params.id}`,
        method: 'PATCH',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        },
        data: {
          workout: this.state.workout
        }
      })
      // .then(this.setState({ updated: true }))
      // .catch(console.error)
      this.setState({ updated: true })
    }

    render () {
      const { updated, workout } = this.state

      if (updated) {
        return <Redirect
          to={`/workouts/${this.props.match.params.id}`} />
      }

      return (
        <div>
          <LogWorkoutForm
            workout={workout}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            cancelPath={`/workouts/${this.props.match.params.id}`}
          />
          <Link to='/workouts'>Back to all workouts</Link>
        </div>
      )
    }
}

export default LogWorkoutEdit
