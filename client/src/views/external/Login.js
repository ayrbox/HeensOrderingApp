import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


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
    const {
      auth: { isAuthenticated },
      history,
    } = this.props;
    if (isAuthenticated) {
      history.push('/orders'); // todo main page after login
    }
  }

  componentWillReceiveProps({ errors }) {
    if (errors) {
      this.setState({ errors });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const {
      loginUser: handleLoginUser,
      history,
    } = this.props;
    handleLoginUser({ email, password }, history);
  }

  render() {
    const {
      email,
      password,
      errors,
    } = this.state;
    return (
      <ExternalLayout>
        <form
          className="form-signin text-center"
          onSubmit={this.onSubmit}
          noValidate
        >
          <TextField
            id="standard-name"
            label="Name"
            value="THIS IS THEME TESt"
            margin="normal"
          />
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
            value={email}
            onChange={this.onChange}
          />
          {errors.email ? (
            <div className="text-help">{errors.email}</div>
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
            value={password}
            onChange={this.onChange}
          />
          {errors.password ? (
            <div className="text-help">{errors.password}</div>
          ) : null}
          <div className="checkbox mb-3">
            <label>
              <input type="checkbox" value="remember-me" />
              {' Remember me'}
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

Login.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({
  })).isRequired,
  loginUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(
  mapStateToProps, {
    loginUser,
  },
)(withTheme()(Login));
