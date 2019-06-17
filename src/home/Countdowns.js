import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Clock from './Clock2'
// import SampleClass from './ReactClock'
// import moment-countdown from 'moment-countdown'
// import Cal from './ReactBigCal'
// import { IconName } from '@fortawesome/fontawesome-svg-core'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import BigCalendar from 'react-big-calendar'
import moment from 'moment'
// import '../calendar/Calendar.scss'
import './Home.scss'

import 'react-big-calendar/lib/css/react-big-calendar.css'
// import Layout from '../Layout'
// import LogWorkout from './calendar/WorkoutCreate'
// import Workout from './calendar/Workout'
// import LogWorkoutEdit from './calendar/WorkoutEdit'
// import Countdown from './home/Countdown'
// <Route exact path='/countdown' component={Countdown}/>
// <Route exact path="/workouts" component={LogWorkouts}/>
// <Route exact path="/create-workout" component={LogWorkout}/>
// <Route exact path="/workouts/:id" component={Workout}/>
// <Route exact path="/workouts/:id/edit" component={LogWorkoutEdit}/>

moment.locale('en')

class Countdowns extends Component {
  // props not being used
  constructor (props) {
    super(props)

    this.state = {
      countdowns: []
    }
  }

  async componentDidMount () {
    // console.log(this.props.user)
    axios({
      method: 'GET',
      url: `${apiUrl}/countdowns`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })

      .then(response => {
        const countdowns = response.data.countdowns
        // console.log(countdowns)
        // console.log(countdowns[0].date)
        // console.log(moment(countdowns[0].date).countdown().toString())
        // => '30 years, 10 months, 14 days, 1 hour, 8 minutes, and 14 seconds'
        for (let i = 0; i < countdowns.length; i++) {
          countdowns[i].date = moment(countdowns[i].date).format('LL')
          // console.log(countdowns)
          // console.log(countdowns[i].date)
          // console.log()
        }

        this.setState({ countdowns: countdowns })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render () {
    const { countdowns } = this.state
    const { user } = this.props
    // console.log(countdowns)
    moment.locale('en')
    // console.log({ countdowns })
    // movie.year ? movie.year : 'Unknown'
    return (
      <Fragment>
        <div className='add-countdown'>
          <h2 className="add-countdown" size="4x">Countdowns</h2>
        </div>
        <div className='add-countdown'>
          <Button variant="success" href="#create-countdown">Add A Countdown</Button>
        </div>
        <ListGroup>
          <div className='list-countdowns'>
            { user && countdowns.map(countdown => (
              <div className='one-countdown' key={countdown.id}>
                <span className="h5 d-block">{countdown.title}</span>
                <span className="h5 d-block">{countdown.date}</span>
                <Clock
                  deadLine={countdown.date}
                />
                <Link to={'/countdowns/' + countdown.id}>
                  <Button variant="secondary">See countdown</Button>
                </Link>
              </div>
            )) }
          </div>
        </ListGroup>
      </Fragment>
    )
  }
}

export default withRouter(Countdowns)
