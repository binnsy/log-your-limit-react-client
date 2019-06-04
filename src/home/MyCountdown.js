import React, { Component } from 'react'
import Countdown from './Countdown'
import { Form, FormControl, Button } from 'react-bootstrap'
// import Quote from './MotivationalQuotes'

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
      <div className="home">
        <div>
        Date: {this.state.curTime}
        </div>
        <br>
        </br>
        <div className="myCountdown">
    Countdown to Ironman Mt. Tremblant{this.state.deadline}
        </div>
        <Countdown
          deadline={this.state.deadline}
        />
        <Form inline>
          <FormControl
            className='Deadline-input'
            placeholder='new date'
            onChange={event => this.setState({ newDeadline: event.target.value })}
          />
          <Button onClick={() => this.changeDeadline()}>
          Submit
          </Button>
        </Form>
      </div>
    )
  }
}

export default MyCountdown
