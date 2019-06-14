import React, { Component } from 'react'
import Countdown from './Countdown'
import { Form, Button, Col } from 'react-bootstrap'
// import Quote from './MotivationalQuotes'
// import DemoApp from '../calendar/FullCal'
// import Cal from '../calendar/ReactBigCal'
import './Home.scss'

class MyCountdown extends Component {
  constructor (props) {
    super(props)

    const today = new Date()
    console.log(today)

    let date = new Date().getDate()
    console.log(date)
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear()
    const hours = new Date().getHours()
    console.log(hours)
    const min = new Date().getMinutes()
    const sec = new Date().getSeconds()
    date = (month + '-' + date + '-' + year)
    console.log(date)
    const now = (hours + ':' + min + ':' + sec)
    console.log(now)

    this.state = {
      date: date,
      now: now,
      title: 'Countdown to Ironman Mt. Tremblant',
      deadline: 'August 18, 2019',
      newDeadline: '',
      newTitle: ''
    }
  }

  componentDidMount () {
    setInterval(() => {
      this.setState({
        curTime: new Date().toLocaleString()
      })
    }, 1000)
  }

  changeDeadline () {
    this.setState({ deadline: this.state.newDeadline, title: this.state.newTitle })
  }

  // changeTitle () {
  //   this.setState({ title: this.state.newTitle })
  // }

  render () {
    return (
      <Col className="text-center hi">
        <div className="home">
          <div className="title">
            {this.state.title}
          </div>
          <div className="myCountdown">
            {this.state.deadline}
          </div>
          <Countdown
            title={this.state.title}
            deadline={this.state.deadline}
          />
          <Form>
            <input
              required
              className='Title-input'
              placeholder='Independence Day'
              onChange={event => this.setState({ newTitle: event.target.value })}
            />
            <br></br>
            <input
              required
              className='Deadline-input'
              placeholder='July 4, 2019'
              onChange={event => this.setState({ newDeadline: event.target.value })}
            />
            <Button type="submit" onClick={() => this.changeDeadline()}>
            Submit
            </Button>
          </Form>
        </div>
      </Col>
    )
  }
}

export default MyCountdown
