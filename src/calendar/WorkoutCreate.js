import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
// import { logWorkout } from '../api'
// import messages from '../messages'
import BigCalendar from 'react-big-calendar'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import axios from 'axios'
import apiUrl from '../apiConfig'
moment.locale('en')

class LogWorkout extends Component {
  constructor () {
    super()

    this.state = {
      workout: {
        title: '',
        description: '',
        date: '',
        start: '',
        end: '',
        distance: '',
        time: ''
      },
      createdWorkout: false
    }
  }

  handleSubmit = (event) => {
    // console.log('submitted', event)
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
          description: this.state.description,
          date: this.state.date,
          start: this.state.start,
          end: this.state.end,
          distance: this.state.distance,
          time: this.state.time
        },
        createdWorkout: true
      }
    })
      .then(response => this.setState({
        workout: response.data.workout,
        createdWorkout: true
      }))
      .then(() => this.props.alert(`${this.state.title} has been added to your workouts!`, 'success'))
      .then(() => this.props.history.push('/workouts'))
      .catch(() => {
        this.props.alert('Whoops! Failed to add your workout. Please try again.', 'danger')
        this.setState({
          workout: {
            title: '',
            description: '',
            date: '',
            start: '',
            end: '',
            distance: '',
            time: ''
          },
          createdWorkout: false
        })
      })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  resetForm = () => this.setState({
    title: '',
    description: '',
    date: '',
    start: '',
    end: '',
    distance: '',
    time: ''
  })

  render () {
    const { title, description, distance, time, start, end } = this.state

    moment.locale('en')
    const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

    return (
      <Form className="form create form-color" onSubmit={this.handleSubmit} >
        <h2>Create Workout</h2>
        <Form.Group controlId="workoutTitle">
          <Form.Label>Workout Title</Form.Label>
          <Form.Control
            required
            type="string"
            value={title || ''}
            name="title"
            onChange={this.handleChange}
            placeholder="Enter the workout title"
          />
        </Form.Group>
        <Form.Group controlId="workoutDescription">
          <Form.Label>Workout Description</Form.Label>
          <Form.Control
            type="string"
            value={description || ''}
            name="description"
            placeholder="Description"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="workoutDistance">
          <Form.Label>Workout Distance</Form.Label>
          <Form.Control
            type="string"
            value={distance || ''}
            name="distance"
            placeholder="Enter distance in miles"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="workoutTime">
          <Form.Label>Workout time</Form.Label>
          <Form.Control
            type="string"
            value={time || ''}
            name="time"
            placeholder="Enter workout time"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="workoutstart">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            required
            type="date"
            localizer={localizer}
            value={start || ''}
            name="start"
            placeholder="YYYY-MM-DD"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="workoutend">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            required
            type="date"
            localizer={localizer}
            value={end || ''}
            name="end"
            placeholder="YYYY-MM-DD"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button
          variant="success"
          type="submit"
          className="m-1"
        >
          Submit
        </Button>

        <Link to='/workouts'>
          <Button variant="secondary">Back to all workouts</Button>
        </Link>
      </Form>
    )
  }
}

export default withRouter(LogWorkout)
