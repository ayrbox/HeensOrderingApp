import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

// actions
import { getCategories } from '../../actions/categoryActions';
import { createMenu } from '../../actions/menuActions';

// components
import Modal, {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../../components/Modal';

class AddMenu extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      description: '',
      price: '',
      category: '',
      tags: '',
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose(e) {
    e.preventDefault();
    this.props.history.push('/menus');
  }

  handleSubmit(e) {
    e.preventDefault();

    const {
      name, description, price, category, tags,
    } = this.state;

    this.props.createMenu({
      name,
      description,
      price,
      category,
      tags,
    });
  }

  componentDidMount() {
    this.props.getCategories();
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const categories = this.props.categories.list;
    const { errors, msg } = this.props.menus;

    return (
      <Modal onSubmit={this.handleSubmit}>
        <ModalHeader title="Add Menu" onClose={this.handleClose} />
        <ModalBody>
          {msg ? (
            <div className="form-group row">
              <div className="col-12">
                <div className="alert alert-warning">{msg}</div>
              </div>
            </div>
          ) : null}
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-4 col-form-label">
              Name
            </label>
            <div className="col-sm-8">
              <input
                className={classnames('form-control', {
                  'is-invalid': errors.name,
                })}
                id="name"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              {errors.name ? (
                <div className="invalid-feedback">{errors.name}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="description" className="col-sm-4 col-form-label">
              Description
            </label>
            <div className="col-sm-8">
              <textarea
                className={classnames('form-control', {
                  'is-invalid': errors.description,
                })}
                id="description"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
              />
              {errors.description ? (
                <div className="invalid-feedback">{errors.description}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="price" className="col-sm-4 col-form-label">
              Price
            </label>
            <div className="col-sm-8">
              <input
                className={classnames('form-control', {
                  'is-invalid': errors.price,
                })}
                id="price"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
                type="number"
              />
              {errors.price ? (
                <div className="invalid-feedback">{errors.price}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="category" className="col-sm-4 col-form-label">
              Category
            </label>
            <div className="col-sm-8">
              <select
                value={this.state.category}
                defaultValue=""
                name="category"
                id="category"
                onChange={this.handleChange}
                className={classnames('form-control', {
                  'is-invalid': errors.category,
                })}
              >
                <option value="">--Select Category--</option>
                {categories.map(o => (
                  <option key={o._id} value={o._id}>
                    {o.name}
                  </option>
                ))}
              </select>
              {errors.category ? (
                <div className="invalid-feedback">{errors.category}</div>
              ) : null}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="tags" className="col-sm-4 col-form-label">
              Tags
            </label>
            <div className="col-sm-8">
              <input
                className={classnames('form-control', {
                  'is-invalid': errors.tags,
                })}
                id="tags"
                name="tags"
                value={this.state.tags}
                onChange={this.handleChange}
              />
              {errors.tags ? (
                <div className="invalid-feedback">{errors.tags}</div>
              ) : null}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button type="submit" className="btn btn-outline-primary">
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={this.handleClose}
          >
            Close
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  menus: state.menus,
});

export default connect(
  mapStateToProps,
  { getCategories, createMenu },
)(AddMenu);
