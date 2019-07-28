import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTheme } from '@material-ui/core/styles';
import {
  TextField,
  Grid,
  Button,
  FormHelperText,
  FormControl,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@material-ui/core';

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
    e.preventDefault();
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

  handleChange = name => (e) => {
    e.preventDefault();
    this.setState({
      [name]: e.target.value,
    });
  }

  render() {
    const {
      email,
      password,
      errors,
    } = this.state;
    return (
      <ExternalLayout>
        <Grid container style={{ justifyContent: 'center' }}>
          <Grid item xs={12} sm={12} md={4}>
            <form
              onSubmit={this.onSubmit}
              noValidate
            >
              <Typography
                variant="h1"
                style={{ textAlign: 'center', paddingBottom: '2rem' }}
              >
                Heens Restaurant
              </Typography>
              <FormControl
                error={errors.email}
                fullWidth
              >
                <TextField
                  id="email"
                  label="Email"
                  type="email"
                  value={email}
                  margin="normal"
                  onChange={this.handleChange('email')}
                  fullWidth
                  error={errors.email}
                />
                {errors.email ? (
                  <FormHelperText
                    className="text-help"
                  >
                    {errors.email}
                  </FormHelperText>
                ) : null}
              </FormControl>
              <FormControl error={errors.password} fullWidth>
                <TextField
                  id="password"
                  type="password"
                  margin="normal"
                  label="Password"
                  onChange={this.handleChange('password')}
                  error={errors.password}
                  value={password}
                />
                {errors.password ? (
                  <FormHelperText id="component-error-text">{errors.password}</FormHelperText>
                ) : null}
              </FormControl>
              <FormControl
                fullWidth
              >
                <FormControlLabel
                  control={(
                    <Checkbox
                      disabled
                      value="rememberme"
                    />
                  )}
                  label="Remember me"
                />
              </FormControl>
              <FormControl
                fullWidth
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              </FormControl>
            </form>
          </Grid>
        </Grid>
      </ExternalLayout>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
  }).isRequired,
  errors: PropTypes.shape({
  }).isRequired,
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
