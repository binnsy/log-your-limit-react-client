import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
// import Calendar from './calendar/Calendar'
import Selectable from './calendar/Selectable'
import LogWorkout from './calendar/LogWorkout'
import Workout from './calendar/Workout'
import LogWorkouts from './calendar/LogWorkouts'
import LogWorkoutEdit from './calendar/LogWorkoutEdit'

// const MyCalendar = props => (
//   <div>
//     <BigCalendar
//       localizer={localizer}
//       events={myEventsList}
//       startAccessor="start"
//       endAccessor="end"
//     />
//   </div>
// )
// import Alert from 'react-bootstrap/Alert'
const Alert = 'alert'

class App extends Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <Alert key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <Route exact path="/calendar" component={LogWorkouts}/>
        <Route exact path="/create-workout" component={LogWorkout}/>
        <Route exact path="/workouts/:id" component={Workout}/>
        <Route exact path="/workouts/:id/edit" component={LogWorkoutEdit}/>

        <main className="container">
          <Route path='/calendar' render={() => (
            <Selectable setUser={this.setUser} />
          )} />
          <Route path='/log-workout' render={() => (
            <LogWorkout setUser={this.setUser} />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
        </main>
      </React.Fragment>
    )
  }
}

export default App
