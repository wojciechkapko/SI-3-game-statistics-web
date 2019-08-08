import React, { Component } from "react";
import { register, login } from "./UserFunctions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      password: this.state.password
    };

    register(newUser).then(response => {
      let message = response.message;
      let type = response.type;
      login(newUser).then(res => {
        if (!res.error) {
          this.props.history.push(`/`);
          if (type == "success") {
            toast.success(message);
          }
        }
      });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Register</h1>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter Email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enter Password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </div>

              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Register
              </button>
            </form>
            <p className="mt-3 d-inline-block mr-2">Already have an account?</p>
            <Link to="/login" className="d-inline-block">
              <span>Sign in</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
