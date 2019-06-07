import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { signIn } from '../api'
import messages from '../messages'
//  <FontAwesomeIcon icon={faCoffee} size="4x" />
// import { library } from '@fortawesome/fontawesome-svg-core'
// import {
//   faCoffee,
//   faCog,
//   faSpinner,
//   faQuoteLeft,
//   faSquare,
//   faCheckSquare
// } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//
// library.add(
//   faCoffee,
//   faCog,
//   faSpinner,
//   faQuoteLeft,
//   faSquare,
//   faCheckSquare
// )

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      nickname: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signInSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(() => {
        this.setState({ nickname: '', mail: '', password: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  render () {
    const { email, password } = this.state

    return (
      <Form className='form' onSubmit={this.onSignIn}>
        <h3 className='sign-in'>Sign In</h3>
        <Form.Group controlId="email">
          <Form.Control
            required
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Control
            required
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Button className='btn-secondary' type="submit">Sign In</Button>
        <Form.Text className="text-secondary mt-3">
        If you need an account click here
          <Link to='/sign-up'>
            <Button className='btn-sm btn-secondary' type="submit">Sign up</Button>
          </Link>
        </Form.Text>
      </Form>
    )
  }
}

export default withRouter(SignIn)
