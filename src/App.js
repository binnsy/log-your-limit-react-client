import React, { Component } from 'react'
import './App.scss'
import './auth/Auth.scss'
import './header/Header.scss'
import './home/Home.scss'
import './calendar/Calendar.scss'
import { Route } from 'react-router-dom'
import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
// import Calendar from './calendar/Calendar'
// import Quote from
import Selectable from './calendar/Selectable'
import EditCountdown from './home/EditCountdown'
import Countdown from './home/Countdown'
import Countdowns from './home/Countdowns'
import TodaysDate from './home/TodaysDate'
import LogWorkout from './calendar/WorkoutCreate'
import Workout from './calendar/Workout'
import LogWorkouts from './calendar/Workouts'
import Cal from './calendar/ReactBigCal'
import LogWorkoutEdit from './calendar/WorkoutEdit'
import CreateCountdown from './home/CreateCountdown'
import AutoDismissAlert from './AlertTimeout'
// import Clock from './home/Clock2'

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
// const Alert = 'alert'

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
          <AutoDismissAlert
            key={index}
            alert={alert}
          />
        ))}
        <main className="container">

          <AuthenticatedRoute user={user} path='/calendar' render={() => (
            <Cal alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/training-plan' render={({ match }) => (
            <Selectable match={match} alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-countdown' render={() => (
            <CreateCountdown msg={this.msg} alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/countdowns' render={() => (
            <Countdowns alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} exact path='/countdowns/:id' render={({ match }) => (
            <Countdown match={match} alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/countdowns/:id/edit' render={({ match }) => (
            <EditCountdown match={match} alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/workouts' render={() => (
            <LogWorkouts alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/create-workout' render={() => (
            <LogWorkout msg={this.msg} alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/workouts/:id' render={({ match }) => (
            <Workout match={match} alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/workouts/:id/edit' render={({ match }) => (
            <LogWorkoutEdit match={match} alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/home' render={() => (
            <TodaysDate alert={this.alert} user={user} />
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
