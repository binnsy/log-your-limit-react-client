import React from 'react'
import { Link } from 'react-router-dom'

const LogWorkoutForm = ({ workout, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>

    <h3>Log Workout</h3>
    <label>Title</label>
    <input
      required
      type="text"
      name="title"
      value={workout.title}
      placeholder="title"
      onChange={handleChange}
    />
    <label>Description</label>
    <input
      type="text"
      name="descrition"
      value={workout.description}
      placeholder="description"
      onChange={handleChange}
    />
    <label>Date</label>
    <input
      required
      type="date"
      name="date"
      value={workout.date}
      placeholder="YYYY-MM-DD"
      onChange={handleChange}
    />
    <label>Start Date</label>
    <input
      type="date"
      name="startDate"
      value={workout.startDate}
      placeholder="YYYY-MM-DD"
      onChange={handleChange}
    />
    <label>End Date</label>
    <input
      type="date"
      name="endDate"
      value={workout.endDate}
      placeholder="YYYY-MM-DD"
      onChange={handleChange}
    />
    <label>Distance</label>
    <input
      type="text"
      name="distance"
      value={workout.distance}
      placeholder="Distance in miles"
      onChange={handleChange}
    />
    <label>Time</label>
    <input
      type="text"
      name="time"
      value={workout.time}
      placeholder="hh:mm:ss"
      onChange={handleChange}
    />
    <button type="submit">Log Workout</button>
    <Link to={cancelPath}><button>Cancel</button>
    </Link>
  </form>

)

export default LogWorkoutForm
