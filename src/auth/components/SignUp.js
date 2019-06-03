import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { signUp, signIn } from '../api'
import messages from '../messages'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      nickname: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signUpSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', password: '', passwordConfirmation: '', nickname: '' })
        alert(messages.signUpFailure, 'danger')
      })
  }

  render () {
    const { email, password, passwordConfirmation, nickname } = this.state

    return (
      <Form className='form' onSubmit={this.onSignUp}>
        <h3>Sign Up</h3>
        <Form.Group controlId="nickname">
          <Form.Label>Nickname</Form.Label>
          <Form.Control
            required
            name="nickname"
            value={nickname}
            type="string"
            placeholder="Nickname"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            required
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            name="passwordConfirmation"
            value={passwordConfirmation}
            type="password"
            placeholder="Confirm Password"
            onChange={this.handleChange}
          />
        </Form.Group>
        <Button type="submit">Sign In</Button>
        <Form.Text className="text-danger mt-3">
          Do <strong>not</strong> use real emails or passwords. Seriously, don&rsquo;t do it!
        </Form.Text>
      </Form>
    )
  }
}

export default withRouter(SignUp)
