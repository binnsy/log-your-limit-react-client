import React, { Component } from 'react'
// import { withRouter } from 'react-router-dom'
// import { logWorkout } from '../api'
// import messages from '../messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Layout from '../Layout'
// import LogWorkoutForm from './LogWorkoutForm'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Redirect } from 'react-router-dom'

class LogWorkout extends Component {
  constructor () {
    super()

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
      created: false
    }
  }

  handleSubmit = (event) => {
    console.log('submitted', event)
    event.preventDefault()
    axios({
      url: `${apiUrl}/workouts`,
      method: 'post',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        workout: {
          title: this.state.title,
          id: this.state.id,
          description: this.state.description,
          date: this.state.date,
          startDate: this.state.startDate,
          endDate: this.state.endDate,
          distance: this.state.distance,
          time: this.state.time
        },
        created: true
      }
    })
      .then(response => this.setState({
        created: true,
        workout: response.data.workout
      }))
      .then(() => this.props.alert(`${this.state.title} has been added to your workouts!`, 'success'))
      .then(() => this.props.history.push('/'))
      .catch(() => {
        // this.props.alert('Whoops! Failed to add your workout. Please try again.', 'danger')
        this.setState({
          id: '',
          title: '',
          description: '',
          date: '',
          startDate: '',
          endDate: '',
          distance: '',
          time: ''
        })
      })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

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

  render () {
    const { created, date, title, description, distance, time, startDate, endDate } = this.state
    // const { isSubmitted } = this.props
    // if (isSubmitted) {
    //   return <Redirect to='/workouts' />
    // }
    if (created === true) {
      return <Redirect
        to={'/workouts/'} />
    }

    return (
      <Form className="form" onSubmit={this.handleSubmit} >
        <h2>Create Workout</h2>
        <Form.Group controlId="workoutTitle">
          <Form.Label>Workout Title</Form.Label>
          <Form.Control
            required
            type="text"
            value={title}
            name="title"
            onChange={this.handleChange}
            placeholder="Enter the workout title"
          />
        </Form.Group>
        <Form.Group controlId="workoutDescription">
          <Form.Label>Workout Description</Form.Label>
          <Form.Control
            type="text"
            value={description}
            name="description"
            placeholder="Description"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="workoutDistance">
          <Form.Label>Workout Distance</Form.Label>
          <Form.Control
            type="string"
            value={distance}
            name="distance"
            placeholder="Enter distance in miles"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="workoutDate">
          <Form.Label>Workout Date</Form.Label>
          <Form.Control
            required
            type="date"
            value={date}
            name="date"
            placeholder="YYYY-MM-DD"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="workoutTime">
          <Form.Label>Workout time</Form.Label>
          <Form.Control
            type="string"
            value={time}
            name="time"
            placeholder="Enter workout time"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            name="startDate"
            placeholder="YYYY-MM-DD"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            name="endDate"
            placeholder="YYYY-MM-DD"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="m-1"
        >
          Submit
        </Button>
        <Button
          variant="danger"
          type="button"
          className="m-1"
          onClick={this.resetForm}
        >
          Reset
        </Button>
      </Form>
    )
  }
}

export default LogWorkout
