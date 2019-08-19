import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import axios from "axios";
import jwt_decode from "jwt-decode";

class Navigation extends Component {
  state = {
    genres: []
  };

  getUserEmail() {
    console.log("getting email");
    if (localStorage.usertoken) {
      //this.getGenres();
      const token = localStorage.usertoken;
      const decoded = jwt_decode(token);
      return decoded.identity.email;
    }
  }

  logOut(e) {
    e.preventDefault();
    localStorage.removeItem("usertoken");
    this.props.history.push(`/`);
  }

  getGenres = async () => {
    axios.get(`/api/genres`).then(response => {
      const genres = response.data;
      this.setState({ genres });
    });
  };

  render() {
    const notAuthenticated = (
      <Nav className="ml-auto">
        <Link to="/login">
          <span class="nav-link">
            <i class="fad fa-sign-in-alt mr-2 fa-lg" />
            Sign in
          </span>
        </Link>
      </Nav>
    );

    const authenticated = (
      <Nav className="ml-auto">
        <NavDropdown
          title={
            <span>
              <i class="fad fa-user-tie mr-2 fa-lg" />
              {this.getUserEmail()}
            </span>
          }
          id="user-nav-dropdown"
          alignRight="true"
          className="dropdown-dark"
        >
          <Link to="/profile">
            <span class="dropdown-item">
              <i class="fad fa-user-cog mr-2" />
              Settings
            </span>
          </Link>
          <NavDropdown.Divider />
          <a
            class="dropdown-item"
            href="javascript:void(0)"
            onClick={this.logOut.bind(this)}
          >
            <i class="fad fa-power-off mr-2" />
            Logout
          </a>
        </NavDropdown>
      </Nav>
    );

    const mainNav = (
      <Nav className="mr-auto">
        <Link to="/add/game">
          <span class="nav-link">
            <i class="fad fa-plus-square mr-2 fa-lg" />
            Add game
          </span>
        </Link>
        <NavDropdown
          title={
            <span>
              <i class="fad fa-gamepad mr-2 fa-lg" />
              Games
            </span>
          }
          id="basic-nav-dropdown"
        >
          <Link to="/games">
            <span class="dropdown-item">All</span>
          </Link>
          <NavDropdown.Divider />
          {this.state.genres.map(genre => (
            <Link key={genre} to={`/games/${genre}`}>
              <span class="dropdown-item">{genre}</span>
            </Link>
          ))}
        </NavDropdown>
      </Nav>
    );

    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Link to="/">
            <Navbar.Brand>
              <i class="fad fa-chart-bar mr-2 fa-lg" />
              GStats
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {localStorage.usertoken ? mainNav : ""}
            {localStorage.usertoken ? authenticated : notAuthenticated}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default withRouter(Navigation);
