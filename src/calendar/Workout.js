import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
// import Card from 'react-bootstrap/Card'
// import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'

// import Layout from '../Layout'

class Workout extends Component {
  constructor (props) {
    console.log(props)
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
  //   axios({
  //     url: `${apiUrl}/workouts/${this.props.match.params.id}`,
  //     headers: {
  //       'Authorization': `Token token=${this.props.user.token}`
  //     }
  //       .then(response => {
  //         this.setState({ workout: response.data.workout })
  //       })
  //       .catch(console.error)
  //   })
  // }

  destroy = async () => {
    console.log('trying to delete')
    // axios.delete(url, { data: { foo: "bar" } });
    await axios({
      method: 'DELETE',
      url: `${apiUrl}/workouts/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
    // await axios.delete(`${apiUrl}/workouts/${this.props.match.params.id}`)
    // this.setState({ deleted: true })
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

  // handleDelete = (id) => {
  //   axios({
  //     url: `${apiUrl}/workouts/${id}`,
  //     method: 'DELETE',
  //     headers: {
  //       'Authorization': `Token token=${this.props.user.token}`
  //     }
  //   })
  //     .then(response => {
  //       this.setState({ workouts: response.data.workouts })
  //     })
  //     .catch(console.error)
  // }

  Capitalize (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
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
        <div><strong>{this.Capitalize(workout.title)}</strong></div>
        <div>
          <div>
            <p>Date: {workout.date ? workout.date : ' - '}</p>
            <p>Description: {workout.description ? workout.description : ' - '}</p>
            <p>Dtart date: {workout.startDate ? workout.startDate : ' - '}</p>
            <p>End date: {workout.endDate ? workout.endDate : ' - '}</p>
            <p>Distance: {workout.distance ? workout.distance : ' - '}</p>
            <p>Time: {workout.time ? workout.time : ' - '}</p>
          </div>
          <div>
            <Button onClick={this.destroy} variant="danger">Delete Workout</Button>
          </div>
          <div>
            <Link to={'/workouts/' + workout.id + '/edit'}>
              <Button variant="secondary">Edit</Button>
            </Link>
          </div>
          <Link to='/workouts'>
            <Button variant="secondary">Back to all workouts</Button>
          </Link>
        </div>
      </div>
    )
  }
}
// <Button variant="danger" onClick={() => this.handleDelete(workout.id)}>Delete Workout</Button>
export default Workout
