import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'

import axios from 'axios'
import apiUrl from '../apiConfig'
import './Home.scss'

class CreateCountdown extends Component {
  constructor (props) {
    super(props)

    this.state = {
      countdown: {
        title: '',
        date: ''
      },
      createdCountdown: false
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/countdowns`,
      method: 'post',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        countdown: {
          title: this.state.title,
          date: this.state.date
        },
        createdCountdown: true
      }
    })
      .then(response => this.setState({
        countdown: response.data.countdown,
        createdCountdown: true
      }))
      .then(() => this.props.alert(`${this.state.title} has was created successfully!`, 'success'))
      .then(() => this.props.history.push('/countdowns'))
      .catch(() => {
        this.props.alert('Whoops! Please try again.', 'danger')
        this.setState({
          countdown: {
            title: '',
            date: ''
          },
          createdCountdown: false
        })
      })
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  render () {
    const { title, date } = this.state

    return (
      <Form className="form form-color" onSubmit={this.handleSubmit} >
        <h2>My Countdown</h2>
        <Form.Group controlId="countdownTitle">
          <Form.Label>Countdown Title</Form.Label>
          <Form.Control
            required
            type="string"
            value={title || ''}
            name="title"
            onChange={this.handleChange}
            placeholder="Enter the countdown title"
          />
        </Form.Group>
        <Form.Group controlId="countdownDate">
          <Form.Label>Countdown Date</Form.Label>
          <Form.Control
            required
            type="date"
            value={date || ''}
            name="date"
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

        <Link to='/countdowns'>
          <Button variant="secondary">Back to all Countdowns</Button>
        </Link>
      </Form>
    )
  }
}

export default withRouter(CreateCountdown)
