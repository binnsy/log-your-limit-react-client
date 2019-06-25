import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'

import Button from 'react-bootstrap/Button'
import moment from 'moment'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faBiking,
  faRunning,
  faSwimmer,
  faDumbbell,
  faHeartbeat,
  faSkiing,
  faHiking
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(
  fab,
  faBiking,
  faRunning,
  faSwimmer,
  faDumbbell,
  faHeartbeat,
  faSkiing,
  faHiking
)

class Workout extends Component {
  constructor (props) {
    // console.log(props)
    super(props)

    this.state = {
      workout: '',
      deleted: false
    }
  }

  async componentDidMount () {
    const response = await
    axios({
      url: `${apiUrl}/workouts/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
    this.setState({ workout: response.data.workout })
  }

  destroy = async () => {
    await axios({
      method: 'DELETE',
      url: `${apiUrl}/workouts/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })

      .then(response =>
        this.setState({ deleted: true
        }))
      .then(() => this.props.alert('Your workout has been deleted!', 'success'))
      .catch(() => {
        this.props.alert('Whoops! Failed to delete your workout. Please try again.', 'danger')
        this.setState({
          deleted: false
        })
      })
  }

  // })
  // .catch(console.error)
  //   // .then(res => {
  //   //   this.setState({ movie })
  //     .catch(console.error)
  // }

  StartDateFormat (workout) {
    return moment(workout.start).format('LL')
  }
  EndDateFormat (workout) {
    return moment(workout.end).format('LL')
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
    } else if (str !== 'Bike') {
      return <FontAwesomeIcon icon={faHeartbeat} size="2x" />
    }
  }

  render () {
    const { workout, deleted } = this.state

    if (!workout) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      )
    }

    if (deleted) {
      return <Redirect to= {
        { pathname: '/workouts', state: { msg: 'Workout successfully deleted!' } }
      } />
    }

    return (
      <div className="text-center workout">
        <span className="h5 d-block"><strong>{this.Capitalize(workout.title)}</strong></span>
        <span className="h5 d-block"><strong>{this.FontAwesome(workout.title)}</strong></span>
        <div>
          <div>
            <p>Date: {this.StartDateFormat(workout.start)}</p>
            <p>Description: {workout.description ? workout.description : ' - '}</p>
            <p>Start date: {this.StartDateFormat(workout.start)}</p>
            <p>End date: {this.EndDateFormat(workout.end)}</p>
            <p>Distance: {workout.distance ? workout.distance : ' - '}</p>
            <p>Time: {workout.time ? workout.time : ' - '}</p>
          </div>
          <Link to='/workouts'>
            <Button variant="secondary">Back to all workouts</Button>
          </Link>
          <div>
            <Link to={'/workouts/' + workout.id + '/edit'}>
              <Button variant="secondary">Edit</Button>
            </Link>
          </div>
          <div>
            <Button onClick={this.destroy} variant="danger">Delete Workout</Button>
          </div>
        </div>
      </div>
    )
  }
}
export default Workout
