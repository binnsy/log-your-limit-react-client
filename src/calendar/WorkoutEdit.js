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
    const editNull = (response) => {
      for (const key in response.data.workout) {
        if (response.data.workout[key] === null) {
          response.data.workout[key] = ''
        }
      }
    }
    // const response = await
    // axios(`${apiUrl}/workouts/${this.props.match.params.id}`)
    await axios({
      method: 'GET',
      url: `${apiUrl}/workouts/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then((response) => {
        editNull(response)
        return response
      })
      .then(response =>
        this.setState({
          workout: response.data.workout
        })
      )
    // if (response.error) {
    //   console.erroe(response.error)
    // } else {

  // }
  // .then(res => {
  //   this.setState({ movie: res.data.movie })
  // })
  // .catch(console.error)
  }

  resetForm = () => this.setState({
    id: '',
    title: '',
    description: '',
    date: '',
    startDate: '',
    endDate: '',
    distance: '',
    time: ''
  })

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
        .then(response =>
          this.setState({
            workout: response.data.workout,
            updated: true
          }))
      // .catch(console.error)
        .then(() => this.props.alert('Your workout has been updated!', 'success'))
        .catch(() => {
          this.props.alert('Whoops! Failed to update your workout. Please try again.', 'danger')
          this.setState({
            updated: false
          })
        })
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
            resetForm={this.resetForm}
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
