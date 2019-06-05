import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Nav.Link className="header" href="#change-password">Change Password</Nav.Link>
    <Nav.Link className="header" href="#sign-out">Sign Out</Nav.Link>
    <Nav.Link className="header" href="#workouts">Workouts</Nav.Link>
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
    <Nav.Link className="header" href="#home">Home</Nav.Link>
    <Nav.Link className="header" href="#calendar">Calendar</Nav.Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand className="log-your-limit mr-auto" href="#home"><strong>Log Your Limit</strong></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          { user && <span>Hi, {user.name}</span>}
          { user && <span>Welcome, {user.nickname}</span>}
          { user ? authenticatedOptions : unauthenticatedOptions }
          { alwaysOptions }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </header>
)

export default Header
