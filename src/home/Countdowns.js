import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Clock from './Clock2'
import moment from 'moment'
import './Home.scss'

import 'react-big-calendar/lib/css/react-big-calendar.css'

moment.locale('en')

class Countdowns extends Component {
  constructor (props) {
    super(props)

    this.state = {
      countdowns: []
    }
  }

  componentDidMount () {
    this.getCountdowns()
  }

destroy = (id) => {
  axios({
    method: 'DELETE',
    url: `${apiUrl}/countdowns/${id}`,
    headers: {
      'Authorization': `Token token=${this.props.user.token}`
    }
  })
    .then(() => this.props.alert('Your countdown has been deleted!', 'success'))
    .then(this.getCountdowns)
    .catch(() => {
      this.props.alert('Whoops! Failed to delete your countdown. Please try again.', 'danger')
    })
}
  getCountdowns = () => {
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
    return (
      <Fragment>
        <div className='add-countdown'>
          <h2 className="add-countdown" size="4x">Countdown to Race Day</h2>
        </div>
        <div className='add-countdown'>
          <Button variant="info" href="#create-countdown">Add A Countdown</Button>
        </div>
        <ListGroup>
          <div className='list-countdowns'>
            { user && countdowns.map(countdown => (
              <div className='one-countdown' key={countdown.id}>
                <span className="h3 d-block">{countdown.title}</span>
                <span className="h5 d-block">{countdown.date}</span>
                <Clock
                  deadLine={countdown.date}
                />
                <Button href={'#countdowns/' + countdown.id + '/edit'} variant="secondary">Edit</Button>
                <Button onClick={() => this.destroy(countdown.id)} variant="danger">Delete Countdown</Button>
              </div>
            )) }
          </div>
        </ListGroup>
      </Fragment>
    )
  }
}

export default withRouter(Countdowns)
