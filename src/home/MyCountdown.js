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
      deadline: 'August 18, 2019',
      newDeadline: ''
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
    this.setState({ deadline: this.state.newDeadline })
  }

  render () {
    return (
      <Col className="text-center hi">
        <div className="home">
          <div className="today">
            <p>Today is</p>
            <div>{this.state.curTime}</div>
          </div>
          <br>
          </br>
          <div className="myCountdown">
      Countdown to Ironman Mt. Tremblant
            <br>
            </br>
            {this.state.deadline}
          </div>
          <Countdown
            deadline={this.state.deadline}
          />
          <Form>
            <input
              className='Deadline-input'
              placeholder='new date'
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
