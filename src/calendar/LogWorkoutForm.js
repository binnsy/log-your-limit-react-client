import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LogWorkoutForm = ({ workout, handleSubmit, handleChange, cancelPath }) => (

  <Form className="form form-color" onSubmit={handleSubmit} >
    <h2>Edit Workout</h2>
    <Form.Group controlId="title">
      <Form.Label>Workout Title</Form.Label>
      <Form.Control
        required
        type="string"
        value={workout.title}
        name="title"
        onChange={handleChange}
        placeholder="Workout title"
      />
    </Form.Group>
    <Form.Group controlId="description">
      <Form.Label>Workout Description</Form.Label>
      <Form.Control
        type="string"
        value={workout.description}
        name="description"
        placeholder="Description"
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="distance">
      <Form.Label>Workout Distance</Form.Label>
      <Form.Control
        type="string"
        value={workout.distance}
        name="distance"
        placeholder="Enter distance in miles"
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="date">
      <Form.Label>Workout Date</Form.Label>
      <Form.Control
        required
        type="date"
        value={workout.date}
        name="date"
        placeholder="YYYY-MM-DD"
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="time">
      <Form.Label>Workout time</Form.Label>
      <Form.Control
        type="string"
        value={workout.time}
        name="time"
        placeholder="hh:mm:ss"
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="startDate">
      <Form.Label>Start Date</Form.Label>
      <Form.Control
        type="date"
        value={workout.startDate}
        name="startDate"
        placeholder="YYYY-MM-DD"
        onChange={handleChange}
      />
    </Form.Group>
    <Form.Group controlId="endDate">
      <Form.Label>End Date</Form.Label>
      <Form.Control
        type="date"
        value={workout.endDate}
        name="endDate"
        placeholder="YYYY-MM-DD"
        onChange={handleChange}
      />
    </Form.Group>
    <Button
      variant="success"
      type="submit"
      className="m-1"
    >
      Submit
    </Button>

    <Link to='/workouts'>
      <Button variant='secondary'>Back to all workouts</Button>
    </Link>
  </Form>
)

export default LogWorkoutForm
