import React, { Component } from 'react'

import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import Button from 'react-bootstrap/Button'
import moment from 'moment'

class Countdown extends Component {
  constructor (props) {
  // console.log(props)
    super(props)

    this.state = {
      countdown: '',
      deleted: false
    }
  }

  async componentDidMount () {
    const response = await
    axios({
      url: `${apiUrl}/countdowns/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
    this.setState({ countdown: response.data.countdown })
  }

destroy = async () => {
  await axios({
    method: 'DELETE',
    url: `${apiUrl}/countdowns/${this.props.match.params.id}`,
    headers: {
      'Authorization': `Token token=${this.props.user.token}`
    }
  })
    .then(response =>
      this.setState({ deleted: true
      }))
    .then(() => this.props.alert('Your countdown has been deleted!', 'success'))
    .catch(() => {
      this.props.alert('Whoops! Failed to delete your countdown. Please try again.', 'danger')
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

Capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

StartDateFormat (countdown) {
  return moment(countdown.start).format('LL')
}

render () {
  const { countdown, deleted } = this.state
  // console.log(countdown)

  if (!countdown) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    )
  }

  if (deleted) {
    return <Redirect to= {
      { pathname: '/countdowns', state: { msg: 'countdown successfully deleted!' } }
    } />
  }

  return (
    <div className="text-center countdown">
      <span className="h5 d-block"><strong>{this.Capitalize(countdown.title)}</strong></span>
      <div>
        <div>
          <p>Date: {this.StartDateFormat(countdown.date)}</p>
        </div>
        <Link to='/countdowns'>
          <Button variant="secondary">Back to all countdowns</Button>
        </Link>
        <div>
          <Link to={'/countdowns/' + countdown.id + '/edit'}>
            <Button variant="secondary">Edit</Button>
          </Link>
        </div>
        <div>
          <Button onClick={this.destroy} variant="danger">Delete Countdown</Button>
        </div>
      </div>
    </div>
  )
}
}

export default Countdown
