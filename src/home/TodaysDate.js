import React, { Component } from 'react'
// import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Quote from './MotivationalQuotes'

class TodaysDate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      time: new Date()
    }
  }
  componentDidMount () {
    this.timeCount = setInterval(() => this.tick(), 10000)
  }

  componentWillUnmount () {
    clearInterval(this.timeCount)
  }

  tick () {
    this.setState({
      time: new Date()
    })
  }

  render () {
    const time = this.state.time

    const n = time.getHours()

    let welcome = 'Hello!'

    if (n >= 4 && n < 12) {
      welcome = 'Good Morning!'
    } else if (n >= 12 && n < 16) {
      welcome = 'Good Afternoon!'
    } else if (n >= 16 && n < 21) {
      welcome = 'Good Evening!'
    } else if (n >= 21 && n <= 24) {
      welcome = 'Goodnight!'
    } else if (n >= 1 && n < 4) {
      welcome = 'Go To Bed!'
    }

    const welcomeMessage = `${welcome}`

    return (
      <div className="home">
        <div className="home-message">
          <h1 className="welcome-message">{ welcomeMessage }</h1>
          <h2>The current time is: </h2>
          <h2 className="date">{this.state.time.toLocaleTimeString()}</h2>
        </div>
        <div>
          <Quote/>
        </div>
        <div className="add-workout">
          <Button className='workout-btn' variant="info" href="#create-workout">Add Todays Workout</Button>
        </div>
      </div>
    )
  }
}

export default TodaysDate
