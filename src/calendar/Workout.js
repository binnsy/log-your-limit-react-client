import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'

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
    this.setState({ deleted: true })
    // .then(res => {
    //   this.setState({ deleted: true })
    // })
    // .catch(console.error)
    //   // .then(res => {
    //   //   this.setState({ movie })
    //     .catch(console.error)
    // }
  }
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
      <div>
        <p>{workout.title}</p>
        <p>id: {workout.id ? workout.id : 'Unknown'}</p>
        <p>date: {workout.date ? workout.date : 'Unknown'}</p>
        <p>description: {workout.description ? workout.description : 'Unknown'}</p>
        <p>start date: {workout.startDate ? workout.startDate : 'Unknown'}</p>
        <p>end date: {workout.endDate ? workout.endDate : 'Unknown'}</p>
        <p>distance: {workout.distance ? workout.distance : 'Unknown'}</p>
        <p>time: {workout.time ? workout.time : 'Unknown'}</p>

        <button onClick={this.destroy}>Delete Workout</button>
        <Link to={'/workouts/' + workout.id + '/edit'}>
          <button>Edit</button>
        </Link>
        <Link to='/workouts'>Back to all workouts</Link>
      </div>
    )
  }
}
// <Button variant="danger" onClick={() => this.handleDelete(workout.id)}>Delete Workout</Button>
export default Workout
