import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Nav.Link className="header" href="#change-password">Change Password</Nav.Link>
    <Nav.Link className="header" href="#sign-out">Sign Out</Nav.Link>
    <Nav.Link className="header" href="#workouts">Workouts</Nav.Link>
    <Nav.Link className="header" href="#calendar">Calendar</Nav.Link>
    <Nav.Link className="header" href="#countdowns">My Countdown</Nav.Link>
    <Nav.Link className="header" href="#home">Home</Nav.Link>

  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Nav.Link className="header" href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link className="header" href="#sign-in">Sign In</Nav.Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
  </React.Fragment>
)

const Header = ({ user }) => (
  <Navbar className="main-header" collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Brand className="log-your-limit" href="#home"><strong>Log Your Limit</strong></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="hello ml-auto">
        <div className="nickname"><strong>{ user && <span>Welcome, {user.nickname}</span>}</strong></div>
        { user ? authenticatedOptions : unauthenticatedOptions }
        { alwaysOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
