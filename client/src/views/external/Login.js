import React, { Component } from "react";

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    var loginModel = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(loginModel, this.props.history);
  }

  render() {
    return (
      <form className="form-signin text-center" onSubmit={this.onSubmit}>
        <img
          className="mb-4"
          src="https://getbootstrap.com/docs/4.1/assets/brand/bootstrap-solid.svg"
          alt=""
          width="72"
          height="72"
        />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          name="email"
          className="form-control"
          placeholder="Email address"
          required=""
          autofocus=""
          value={this.state.email}
          onChange={this.onChange}
        />
        <label for="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          name="password"
          className="form-control"
          placeholder="Password"
          required=""
          value={this.state.password}
          onChange={this.onChange}
        />
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
      </form>
    );
  }
}

export default Login;
