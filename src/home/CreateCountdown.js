import React, { Component } from 'react'
// import Countdown from './Countdown'
import { Form, Button } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
// import Quote from './MotivationalQuotes'
// import DemoApp from '../calendar/FullCal'
// import Cal from '../calendar/ReactBigCal'
import axios from 'axios'
import apiUrl from '../apiConfig'
import './Home.scss'

class CreateCountdown extends Component {
  constructor (props) {
    super(props)

    const today = new Date()
    console.log(today)

    let date = new Date().getDate()
    console.log(date)
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()
    const hours = new Date().getHours() + 4
    console.log(hours)
    const min = new Date().getMinutes()
    const sec = new Date().getSeconds()
    date = (month + '-' + date + '-' + year)
    console.log(date)
    const now = (hours + ':' + min + ':' + sec)
    console.log(now)

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

  // componentDidMount () {
  //   setInterval(() => {
  //     this.setState({
  //       curTime: new Date().toLocaleString()
  //     })
  //   }, 1000)
  // }
  //
  // changeDeadline () {
  //   this.setState({ deadline: this.state.newDeadline, title: this.state.newTitle })
  // }

  // changeTitle () {
  //   this.setState({ title: this.state.newTitle })
  // }

  // <Col className="text-center hi">
  //   <div className="home">
  //     <div className="title">
  //       {this.state.title}
  //     </div>
  //     <div className="myCountdown">
  //       {this.state.deadline}
  //     </div>
  //     <Countdown
  //       title={this.state.title}
  //       deadline={this.state.deadline}
  //     />
  //     <Form>
  //       <input
  //         required
  //         className='Title-input'
  //         placeholder='Independence Day'
  //         onChange={event => this.setState({ newTitle: event.target.value })}
  //       />
  //       <br></br>
  //       <input
  //         required
  //         className='Deadline-input'
  //         placeholder='July 4, 2019'
  //         onChange={event => this.setState({ newDeadline: event.target.value })}
  //       />
  //       <Button type="submit" onClick={() => this.changeDeadline()}>
  //       Submit
  //       </Button>
  //     </Form>
  //   </div>
  // </Col>
  //     )
  //   }
  // }

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
