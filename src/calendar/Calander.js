// import React, { Component } from 'react'
// import BigCalendar from 'react-big-calendar'
// import moment from 'moment'
// import 'react-big-calendar/lib/css/react-big-calendar.css'
// import axios from 'axios'
// import logo from './logo.svg'
// import './App.css'
//
// moment.locale('en-GB')
//
// BigCalendar.momentLocalizer(moment)
//
// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       cal_events: [],
//     }
// }
//
// // Declare state variables here
//   componentDidMount  () {
// //Fetch events from database here
// axios.get('http://localhost:3001/events')
//       .then(response => {
//
//         let appointments = response.data
//
//         for (let i = 0 i < appointments.length i++) {
//           appointments[i].start = moment.utc(appointments[i].start).toDate()
//           appointments[i].end = moment.utc(appointments[i].end).toDate()
//
//         }
//         self.setState({
//           cal_events:appointments
//         })
//
//       })
//       .catch(function (error) {
//         console.log(error)
//       })
// }
//
// render() {
//     const {calEvents} = this.state
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Test Calendar</h1>
//         </header>
//         <div style={{ height: 700 }}>
//           <BigCalendar
//             events={calEvents}
//             step={30}
//             defaultView='week'
//             views={['month','week','day']}
//             defaultDate={new Date()}
//           />
//         </div>
//       </div>
//     )
//   }
// }
// export default App
