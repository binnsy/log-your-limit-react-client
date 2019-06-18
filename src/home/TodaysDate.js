import React, { Component } from 'react'
// import Col from 'react-bootstrap/Col'
import Quote from './MotivationalQuotes'

class TodaysDate extends Component {
  constructor (props) {
    super(props)

    // const today = new Date()
    // console.log(today)

    // let date = new Date().getDate()
    // console.log(date)
    // const month = new Date().getMonth() + 1
    // const year = new Date().getFullYear()
    // const hours = new Date().getHours()
    // console.log(hours)
    // const min = new Date().getMinutes()
    // const sec = new Date().getSeconds()
    // date = (month + '-' + date + '-' + year)
    // console.log(date)
    // const now = (hours + ':' + min + ':' + sec)
    // console.log(now)

    this.state = {
      time: new Date()
      // date: date
    }
  }
  componentDidMount () {
    this.timeCount = setInterval(() => this.tick(), 1000)
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
    // console.log(time)
    // console.log(this.state.time.toLocaleTimeString())
    // 6:29:53 PM
    //   function myFunction() {
    // let d = new Date()
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

    // if (time >= 5 && time <= 11) { welcome = 'Good Morning!' }
    // if (time >= 12 && time <= 16) { welcome = 'Good Afternoon!' }
    // if (time >= 17 && time <= 19) { welcome = 'Good Evening!' }
    // if (time >= 20 && time <= 24) { welcome = 'Goodnight!' }
    // if (time > 20 && time < 24) { welcome = 'Goodnight!' }
    // if (time < 19 || time > 17) { welcome = 'Good Evening' }
    // if (time >= 0 && time <= 4) { welcome = 'Go to bed!' }

    const welcomeMessage = `${welcome}`

    // if (hours >= 4 && hours <= 11 && timeOfDay === 'AM') {
    //   // console.log('good morning')
    //   greeting = 'Good morning!'
    // } else if (hours <= 4 && timeOfDay === 'PM') {
    //   // console.log('good afternoon')
    //   greeting = 'Good afternoon!'
    // } else if (hours === 12 && timeOfDay === 'PM') {
    //   // console.log('good afternoon')
    //   greeting = 'Good afternoon!'
    // }
    // if (hours <= 8 && hours >= 5 && timeOfDay === 'PM') {
    //   // console.log('good evening')
    //   greeting = 'Good evening'
    // }
    // if (hours >= 9 && hours <= 11 && timeOfDay === 'PM') {
    //   // console.log('good night')
    //   greeting = 'Good night'
    // }
    // if (hours === 12 && timeOfDay === 'AM') {
    //   // console.log('Go to bed')
    //   greeting = 'Go to bed'
    // } else if (hours >= 1 && hours <= 3 && timeOfDay === 'AM') {
    //   // console.log('go to bed')
    //   greeting = 'Go to bed'
    // }
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
      </div>
    )
  }
}
//   componentDidMount () {
//     // const curTime = () => this.setState
//     setInterval(() => {
//       this.setState({
//         time: new Date(),
//         date: date
//       }, 1000)
//     })
//   }
//
//   render () {
//     return (
//       <Col className="text-center hi">
//         <div className="home">
//           <div className="today">
//             <p>Today is</p>
//             <div>{this.state.timetoLocaleTimeString()}</div>
//           </div>
//         </div>
//       </Col>
//     )
//   }
// }

export default TodaysDate
