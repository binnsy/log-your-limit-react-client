import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'
import Card from 'react-bootstrap/Card'
// import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'

// import Layout from '../Layout'

class Workout extends Component {
  constructor (props) {
    console.log(props)
    super(props)

    this.state = {
      workout: null,
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
      .then(() => this.props.alert(`${this.state.title} has been deleted from your workouts!`, 'success'))
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
      <Card className="text-center workout">
        <Card.Header><strong>{this.Capitalize(workout.title)}</strong></Card.Header>
        <Card.Body>
          <Card.Text>
            <p>date: {workout.date ? workout.date : 'Unknown'}</p>
            <p>description: {workout.description ? workout.description : 'Unknown'}</p>
            <p>start date: {workout.startDate ? workout.startDate : 'Unknown'}</p>
            <p>end date: {workout.endDate ? workout.endDate : 'Unknown'}</p>
            <p>distance: {workout.distance ? workout.distance : 'Unknown'}</p>
            <p>time: {workout.time ? workout.time : 'Unknown'}</p>
          </Card.Text>
          <div>
            <Button onClick={this.destroy} variant="primary">Delete Workout</Button>
          </div>
          <div>
            <Link to={'/workouts/' + workout.id + '/edit'}>
              <Button>Edit</Button>
            </Link>
          </div>
          <Link to='/workouts'>
            <Button>Back to all workouts</Button>
          </Link>
        </Card.Body>
      </Card>
    )
  }
}
// <Button variant="danger" onClick={() => this.handleDelete(workout.id)}>Delete Workout</Button>
export default Workout
