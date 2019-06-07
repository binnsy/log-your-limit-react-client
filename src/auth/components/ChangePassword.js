import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { changePassword } from '../api'
import messages from '../messages'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { alert, history, user } = this.props

    changePassword(this.state, user)
      .then(() => alert(messages.changePasswordSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(() => {
        this.setState({ oldPassword: '', newPassword: '' })
        alert(messages.changePasswordFailure, 'danger')
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    return (

      <Form className='form' onSubmit={this.onChangePassword}>
        <h3 className='change-password'>Change Password</h3>
        <Form.Group controlId="oldpw">
          <Form.Control
            required
            type="password"
            name="oldPassword"
            value={oldPassword}
            placeholder="Old Password"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="newPassword">
          <Form.Control
            required
            name="newPassword"
            value={newPassword}
            type="password"
            placeholder="New Password"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Button className='btn-secondary' type="submit">Change Password</Button>
      </Form>
    )
  }
}

export default withRouter(ChangePassword)
