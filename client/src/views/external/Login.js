import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';

import ExternalLayout from '../viewcomponents/ExternalLayout';

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: '',
      password: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated) {
      this.props.history.push('/orders'); // todo main page after login
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      console.log(nextProps.errors);
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const loginModel = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(loginModel, this.props.history);
  }

  render() {
    return (
      <ExternalLayout>
        <form
          className="form-signin text-center"
          onSubmit={this.onSubmit}
          noValidate
        >
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">
            Email address
          </label>
          <input
            type="email"
            id="inputEmail"
            name="email"
            className="form-control"
            placeholder="Email address"
            required=""
            autoFocus
            value={this.state.email}
            onChange={this.onChange}
          />
          {this.state.errors.email ? (
            <div className="text-help">{this.state.errors.email}</div>
          ) : null}
          <label htmlFor="inputPassword" className="sr-only">
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
          {this.state.errors.password ? (
            <div className="text-help">{this.state.errors.password}</div>
          ) : null}
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" />
              {' '}
Remember me
            </label>
          </div>
          <button className="btn btn-lg btn-primary btn-block" type="submit">
            Sign in
          </button>
        </form>
      </ExternalLayout>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  {
    loginUser,
  },
)(Login);
