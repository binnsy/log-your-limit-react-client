// import React, { Component } from 'react'
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from '@fullcalendar/timegrid'
// import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
//
// import './Calendar.scss'
//
// import '@fullcalendar/core/main.css'
// import '@fullcalendar/daygrid/main.css'
// import '@fullcalendar/timegrid/main.css'
//
// class DemoApp extends Component {
//   calendarComponentRef = React.createRef()
//   state = {
//     calendarWeekends: true,
//     calendarEvents: [ // initial event data
//       { title: 'Event Now', start: new Date() }
//     ]
//   }
//
//   render () {
//     return (
//       <div className='demo-app'>
//         <div className='demo-app-top'>
//           <button onClick={ this.toggleWeekends }>toggle weekends</button>&nbsp;
//           <button onClick={ this.gotoPast }>go to a date in the past</button>&nbsp;
//           (also, click a date/time to add an event)
//         </div>
//         <div className='demo-app-calendar'>
//           <FullCalendar
//             defaultView="dayGridMonth"
//             header={{
//               left: 'prev,next today',
//               center: 'title',
//               right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
//             }}
//             plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
//             ref={ this.calendarComponentRef }
//             weekends={ this.state.calendarWeekends }
//             events={ this.state.calendarEvents }
//             dateClick={ this.handleDateClick }
//           />
//         </div>
//       </div>
//     )
//   }
//
//   toggleWeekends = () => {
//     this.setState({ // update a property
//       calendarWeekends: !this.state.calendarWeekends
//     })
//   }
//
//   gotoPast = () => {
//     const calendarApi = this.calendarComponentRef.current.getApi()
//     calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
//   }
//
//   handleDateClick = (arg) => {
//     if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
//       this.setState({ // add new event data
//         calendarEvents: this.state.calendarEvents.concat({ // creates a new array
//           title: 'New Event',
//           // description: 'description',
//           start: arg.date,
//           allDay: arg.allDay
//         })
//       })
//     }
//   }
// }
//
// export default DemoApp
