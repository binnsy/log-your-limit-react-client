import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Clock from './Clock'
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

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faBiking,
  faRunning,
  faSwimmer,
  faHeartbeat,
  faSkiing,
  faHiking,
  faDumbbell,
  faWalking
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(
  fab,
  faBiking,
  faRunning,
  faSwimmer,
  faHeartbeat,
  faSkiing,
  faHiking,
  faDumbbell,
  faWalking
)
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

    // this.setState({ workouts: response.data.workouts })

      .then(response => {
        const countdowns = response.data.countdowns
        console.log(countdowns)
        console.log(countdowns[0].date)
        for (let i = 0; i < countdowns.length; i++) {
          countdowns[i].date = moment(countdowns[i].date).format('L')
          console.log(this.state.countdowns)
          console.log(countdowns[i].date)
        }

        this.setState({ countdowns: countdowns })
      })
      // .catch(console.error)
      .catch(function (error) {
        console.log(error)
      })
  }

  Capitalize (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  FontAwesome (str) {
    // console.log(str)
    str = str.charAt(0).toUpperCase() + str.slice(1)
    // console.log(str)
    // for (const key in response.data.workout) {
    if (str === 'Run') {
      return <FontAwesomeIcon icon={faRunning} size="2x" />
      // return <i className="far fa-clock">Run</i>
    } else if (str === 'Swim') {
      return <FontAwesomeIcon icon={faSwimmer} size="2x" />
    } else if (str === 'Bike') {
      return <FontAwesomeIcon icon={faBiking} size="2x" />
    } else if (str === 'Lift') {
      return <FontAwesomeIcon icon={faDumbbell} size="2x" />
    } else if (str === 'Ski') {
      return <FontAwesomeIcon icon={faSkiing} size="2x" />
    } else if (str === 'Hike') {
      return <FontAwesomeIcon icon={faHiking} size="2x" />
    } else if (str === 'Walk') {
      return <FontAwesomeIcon icon={faWalking} size="2x" />
    } else if (str !== 'Bike') {
      return <FontAwesomeIcon icon={faHeartbeat} size="2x" />
    }
  }
  //   if (str === 'Run') {
  //     console.log(str)
  //     return <i className="far fa-clock">Run</i>
  //     // <FontAwesomeIcon icon={faRunning} size="4x" />
  //   }
  // }
  // const editNull = (response) => {
  //   for (const key in response.data.workout) {
  //     if (response.data.workout[key] === null) {
  //       response.data.workout[key] = ''
  //     }
  //   }
  // }

  render () {
    const { countdowns } = this.state
    const { user } = this.props
    console.log(countdowns)
    moment.locale('en')
    // console.lgo(countdowns[0].date)
    // console.log(countdowns.date - Date.now())
    console.log({ countdowns })
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
                <Clock date={countdown.date}
                  timeTillDate={countdown.date}
                  timeFormat="MM DD YYYY, h:mm a"
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
// <div>
//   <p>All the workouts</p>
//   <ul>
//     {workouts}
//   </ul>
// </div>

// const workouts = this.state.workouts.map(workout => (
//   <li key={workout.id}>
//     <Link to={'/workouts/' + workout.id}>{workout.title ? workout.title : 'Unknown Title'}</Link>
//   </li>
// ))
export default Countdowns
