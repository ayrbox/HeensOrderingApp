import { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Fetch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: null,
      error: null,
    };
  }

  componentDidMount() {
    const { url } = this.props;

    this.setState({ loading: true, data: undefined });

    axios.get(url).then(({ data }) => {
      this.setState({
        loading: false,
        data,
        error: null,
      });
    }).catch((error) => {
      this.setState({
        loading: false,
        data: null,
        error,
      });
    });
  }

  render() {
    const { children } = this.props;
    const { loading, data, error } = this.state;
    return children({ loading, data, error });
  }
}

Fetch.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
};

export default Fetch;
