import React, { Component } from 'react'
import Countdown from './Countdown'
import { Form, Button, Col } from 'react-bootstrap'
import Quote from './MotivationalQuotes'
import './Home.scss'

class MyCountdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: '',
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
          <div>
          Today is:  {this.state.curTime}
          </div>
          <Quote />
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
