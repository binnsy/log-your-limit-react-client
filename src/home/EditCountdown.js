import React, { Component } from 'react'
import EditCountdownForm from './EditCountdownForm'
import axios from 'axios'
import apiUrl from '../apiConfig'
import { Redirect } from 'react-router-dom'

class EditCountdown extends Component {
  constructor (props) {
    super(props)

    this.state = {
      countdown: {
        id: '',
        title: '',
        date: ''
      },
      updated: false
    }
  }

  async componentDidMount () {
    const editNull = (response) => {
      for (const key in response.data.countdown) {
        if (response.data.countdown[key] === null) {
          response.data.countdown[key] = ''
        }
      }
    }
    // const response = await
    // axios(`${apiUrl}/workouts/${this.props.match.params.id}`)
    await axios({
      method: 'GET',
      url: `${apiUrl}/countdowns/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then((response) => {
        editNull(response)
        return response
      })
      .then(response =>
        this.setState({
          countdown: response.data.countdown
        })
      )
    // if (response.error) {
    //   console.erroe(response.error)
    // } else {

  // }
  // .then(res => {
  //   this.setState({ movie: res.data.movie })
  // })
  // .catch(console.error)
  }
  //
  // resetForm = () => this.setState({
  //   id: '',
  //   title: '',
  //   description: '',
  //   date: '',
  //   start: '',
  //   end: '',
  //   distance: '',
  //   time: ''
  // })

  handleChange = (event) => {
    // access and update state
    // console.log('change', event)
    const updatedField = {
      [event.target.name]: event.target.value
    }
    const editCountdown =
    Object.assign(this.state.countdown, updatedField)
    this.setState({ countdown: editCountdown })
  }

    handleSubmit = async event => {
      event.preventDefault()
      await axios({
        url: `${apiUrl}/countdowns/${this.props.match.params.id}`,
        method: 'PATCH',
        headers: {
          'Authorization': `Token token=${this.props.user.token}`
        },
        data: {
          countdown: this.state.countdown
        }
      })
        .then(response =>
          this.setState({
            countdown: response.data.countdown,
            updated: true
          }))
      // .catch(console.error)
        .then(() => this.props.alert('Your countdown has been updated!', 'success'))
        .catch(() => {
          this.props.alert('Whoops! Failed to update your countdown. Please try again.', 'danger')
          this.setState({
            updated: false
          })
        })
    }

    render () {
      const { updated, countdown } = this.state
      console.log(countdown)
      if (updated) {
        return <Redirect
          to={`/countdowns/${this.props.match.params.id}`} />
      }

      return (
        <div>
          <EditCountdownForm
            countdown={countdown}
            resetForm={this.resetForm}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            cancelPath={`/countdowns/${this.props.match.params.id}`}
          />
        </div>
      )
    }
}

export default EditCountdown
