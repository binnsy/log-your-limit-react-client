import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../apiConfig'

import Layout from '../Layout'

class Workout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      workout: null,
      deleted: false
    }
  }

  async componentDidMount () {
    const response = await
    // axios(`${apiUrl}/workouts/${this.props.match.params.id}`)
    axios({
      method: 'GET',
      url: `${apiUrl}/workouts/${this.props.match.params.id}`,
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
    console.log(response)
    this.setState({ workout: response.data.workout })
    // .then(res => {
    //   this.setState({ movie: res.data.movie })
    // })
    // .catch(console.error)
  }

  destroy = async () => {
    console.log('trying to delete')
    // axios.delete(url, { data: { foo: "bar" } });
    await axios.delete(`${apiUrl}/workouts/${this.props.match.params.id}`)
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

  render () {
    const { workout, deleted } = this.state

    if (!workout) {
      return (
        <Layout>
          <p>Loading...</p>
        </Layout>
      )
    }

    if (deleted) {
      return <Redirect to= {
        { pathname: '/', state: { msg: 'Workout successfully deleted!' } }
      } />
    }

    return (
      <Layout>
        <p>{workout.title}</p>
        <p>id: {workout.id ? workout.id : 'Unknown'}</p>
        <p>date: {workout.date ? workout.date : 'Unknown'}</p>
        <p>description: {workout.descrition ? workout.descrition : 'Unknown'}</p>
        <p>start date: {workout.startDate ? workout.startDate : 'Unknown'}</p>
        <p>end date: {workout.endDate ? workout.endDate : 'Unknown'}</p>
        <p>distance: {workout.distance ? workout.distance : 'Unknown'}</p>
        <p>time: {workout.time ? workout.time : 'Unknown'}</p>

        <button onClick={this.destroy}>Delete Workout</button>

        <Link to={'/workouts/' + workout.id + '/edit'}>
          <button>Edit</button>
        </Link>
        <Link to='/workouts'>Back to all workouts</Link>
      </Layout>
    )
  }
}

export default Workout
