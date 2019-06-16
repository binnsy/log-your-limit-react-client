import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const EditCountdownForm = ({ countdown, handleSubmit, handleChange, cancelPath }) => (

  <Form className="form form-color" onSubmit={handleSubmit} >
    <h2>Edit My Countdown</h2>
    <Form.Group controlId="title">
      <Form.Label>Countdown Title</Form.Label>
      <Form.Control
        required
        type="string"
        value={countdown.title}
        name="title"
        onChange={handleChange}
        placeholder="Enter the countdown title"
      />
    </Form.Group>
    <Form.Group controlId="date">
      <Form.Label>Countdown Date</Form.Label>
      <Form.Control
        required
        type="date"
        value={countdown.date}
        name="date"
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
    <Link to='/countdowns'>
      <Button variant="secondary">Back to all Countdowns</Button>
    </Link>
  </Form>
)

export default EditCountdownForm
