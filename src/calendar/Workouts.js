import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import './Calendar.scss'
import 'react-big-calendar/lib/css/react-big-calendar.css'

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

class LogWorkouts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      workouts: []
    }
  }

  async componentDidMount () {
    // console.log(this.props.user)
    axios({
      method: 'GET',
      url: `${apiUrl}/workouts`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(response => {
        const workouts = response.data.workouts
        for (let i = 0; i < workouts.length; i++) {
          workouts[i].start = moment(workouts[i].start).format('LL')
          // console.log(workouts)
        }
        this.setState({ workouts: workouts })
      })
      // .catch(console.error)
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

  render () {
    const { workouts } = this.state
    const { user } = this.props
    // countdowns[i].date = moment(countdowns[i].date).format('LL')
    // console.log({ workouts })
    return (
      <Fragment>
        <div className='add-workout'>
          <h2 className="workout-header" size="4x">Workouts Logged</h2>
          <li className="pv3 ph2 ma0 link grow workout-fontawesome">
            <FontAwesomeIcon className='icon' icon={faSwimmer} size="4x" />
            <FontAwesomeIcon className='icon' icon={faBiking} size="4x" />
            <FontAwesomeIcon className='icon' icon={faRunning} size="4x" />
          </li>
          <div>
            <Button className='workout-btn' variant="info" href="#create-workout">Add A Workout</Button>
          </div>
        </div>
        <ListGroup>
          <div className='list-workouts'>
            { user && workouts.map(workout => (
              <div className='one-workout' key={workout.id}>
                <span className="h4 d-block">{this.Capitalize(workout.title)}</span>
                <span className="h5 d-block">{this.FontAwesome(workout.title)}</span>
                <span className="d-block">{workout.start}</span>
                <Link to={'/workouts/' + workout.id}>
                  <Button variant="secondary">See workout</Button>
                </Link>
              </div>
            )) }
          </div>
        </ListGroup>
      </Fragment>
    )
  }
}

export default LogWorkouts
