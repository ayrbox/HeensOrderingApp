import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import isEmpty from '../../utils/is-empty';

// components
import MainLayout from '../viewcomponents/MainLayout';
import Spinner from '../../components/Spinner';

// actions
import { getCustomer, updateCustomer } from '../../actions/customerActions';

class EditCustomer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: undefined,
      address: undefined,
      postCode: undefined,
      phoneNo: undefined,
      note: undefined,
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      getCustomer: handleGetCustomer,
      match: { params: { id } },
    } = this.props;
    handleGetCustomer(id);
  }

  componentWillReceiveProps(nextProps) {
    const { customers: { current, errors } } = nextProps;
    if (current) {
      const {
        name,
        address,
        postCode,
        phoneNo,
        note,
      } = current;
      this.setState({
        name,
        address,
        postCode,
        phoneNo,
        note,
      });
    }

    if (errors) {
      this.setState({
        errors: errors || {},
      });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      name,
      phoneNo,
      address,
      postCode,
      note,
    } = this.state;

    const {
      match: { params: { id } },
      updateCustomer: handleUpdateCustomer,
    } = this.props;

    handleUpdateCustomer(id, {
      name,
      phoneNo,
      address,
      postCode,
      note,
    });
  }

  render() {
    const { customers: { current, loading } } = this.props;
    const {
      errors,
      name,
      phoneNo,
      address,
      postCode,
      note,
    } = this.state;

    return (
      <MainLayout>
        <div className="px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Edit Customer</h1>
          <p className="lead">Enter detail of new customer</p>
        </div>

        {!current || loading ? (
          <Spinner />
        ) : (
          <div className="container">
            {!isEmpty(errors) ? (
              <div className="alert alert-danger">
                Please enter required fiels with valid data.
                <ul>
                  {Object.keys(errors).map(key => (
                    <li key={key}>{errors[key]}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <label htmlFor="name" className="col-sm-2 col-form-label">
                  Name
                </label>
                <div className="col-sm-5">
                  <input
                    type="name"
                    className={classnames('form-control', {
                      'is-invalid': errors.name,
                    })}
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Enter customer name..."
                    onChange={this.handleChange}
                  />
                  {errors.name ? (
                    <div className="invalid-feedback">{errors.name}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="phoneNo" className="col-sm-2 col-form-label">
                  Contact No
                </label>
                <div className="col-sm-5">
                  <input
                    type="phoneNo"
                    className={classnames('form-control', {
                      'is-invalid': errors.phoneNo,
                    })}
                    id="phoneNo"
                    name="phoneNo"
                    value={phoneNo}
                    placeholder="Mobile/Home no..."
                    onChange={this.handleChange}
                  />
                  {errors.phoneNo ? (
                    <div className="invalid-feedback">{errors.phoneNo}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="address" className="col-sm-2 col-form-label">
                  Address
                </label>
                <div className="col-sm-5">
                  <input
                    type="address"
                    className={classnames('form-control', {
                      'is-invalid': errors.address,
                    })}
                    id="address"
                    name="address"
                    value={address}
                    placeholder="address..."
                    onChange={this.handleChange}
                  />
                  {errors.address ? (
                    <div className="invalid-feedback">{errors.address}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="postCode" className="col-sm-2 col-form-label">
                  Postcode
                </label>
                <div className="col-sm-5">
                  <input
                    type="postCode"
                    className={classnames('form-control', {
                      'is-invalid': errors.postCode,
                    })}
                    id="postCode"
                    name="postCode"
                    value={postCode}
                    placeholder="postcode..."
                    onChange={this.handleChange}
                  />
                  {errors.postCode ? (
                    <div className="invalid-feedback">{errors.postCode}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="note" className="col-sm-2 col-form-label">
                  Note
                </label>
                <div className="col-sm-5">
                  <textarea
                    type="note"
                    className={classnames('form-control', {
                      'is-invalid': errors.note,
                    })}
                    id="note"
                    name="note"
                    value={note}
                    placeholder="Note about customer..."
                    onChange={this.handleChange}
                  />
                  {errors.note ? (
                    <div className="invalid-feedback">{errors.note}</div>
                  ) : null}
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-2" />
                <div className="col-sm-5">
                  {loading ? (
                    <Spinner />
                  ) : (
                    <button type="submit" className="btn btn-outline-primary">
                      Save
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </MainLayout>
    );
  }
}

EditCustomer.propTypes = {
  customers: PropTypes.shape({
    loading: PropTypes.bool,
    current: PropTypes.shape({}),
  }).isRequired,
  getCustomer: PropTypes.func.isRequired,
  updateCustomer: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = state => ({
  customers: state.customers,
});

export default connect(
  mapStateToProps, {
    getCustomer,
    updateCustomer,
  },
)(EditCustomer);
