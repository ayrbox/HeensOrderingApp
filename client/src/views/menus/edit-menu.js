import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

// components
import Modal, {
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '../../components/Modal';

// actions
import { getMenu, updateMenu } from '../../actions/menuActions';
import { getCategories } from '../../actions/categoryActions';

class EditMenu extends Component {
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
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    const {
      match: { params: { id } },
      getCategories: handleGetCategories,
      getMenu: handleGetMenu,
    } = this.props;

    handleGetCategories();
    handleGetMenu(id);
  }

  componentWillReceiveProps(nextProps) {
    const { menus: { current } } = nextProps;
    if (current) {
      const {
        name,
        description,
        price,
        category: { _id: categoryId },
        tags,
      } = current;

      this.setState({
        name,
        description,
        price,
        category: categoryId,
        tags: tags.join(','),
      });
    }
  }

  handleClose(e) {
    e.preventDefault();
    const {
      match: { params: { id } },
      history,
    } = this.props;
    history.push(`/menus/${id}/`);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSave(e) {
    e.preventDefault();
    const {
      match: { params: { id } },
      updateMenu: handleUpdateMenu,
      history,
    } = this.props;
    const {
      name, description, price, category, tags,
    } = this.state;
    handleUpdateMenu(
      id,
      {
        name,
        description,
        price,
        category,
        tags,
      },
      history,
    );
  }

  render() {
    const {
      categories: { categoryList },
      menus: { errors, msg },
    } = this.props;

    const {
      name,
      description,
      price,
      category,
      tags,
    } = this.state;

    return (
      <Modal>
        <ModalHeader title="Edit Menu" onClose={this.handleClose} />
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
                value={name}
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
                value={description}
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
                value={price}
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
                value={category}
                defaultValue=""
                name="category"
                id="category"
                onChange={this.handleChange}
                className={classnames('form-control', {
                  'is-invalid': errors.category,
                })}
              >
                <option value="">--Select Category--</option>
                {categoryList.map(({
                  _id: categoryId,
                  name: categoryName,
                }) => (
                  <option key={categoryId} value={categoryId}>
                    {categoryName}
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
                value={tags}
                onChange={this.handleChange}
              />
              {errors.tags ? (
                <div className="invalid-feedback">{errors.tags}</div>
              ) : null}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={this.handleSave}
          >
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={this.handleClose}
          >
            Back
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

EditMenu.propTypes = {
  menus: PropTypes.shape().isRequired,
  categories: PropTypes.shape().isRequired,
  getMenu: PropTypes.func.isRequired,
  updateMenu: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  match: PropTypes.shape().isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  menus: state.menus,
  categories: state.categories,
});

export default connect(
  mapStateToProps,
  {
    getMenu,
    updateMenu,
    getCategories,
  },
)(EditMenu);
