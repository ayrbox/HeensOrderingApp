import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import Modal, {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../../components/Modal';

import { getMenu, addMenuOption } from '../../actions/menuActions';

class AddMenuOption extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      description: '',
      additionalCost: 0,
      errors: {},
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const {
      menus: { current },
      match: { params: { id } },
      getMenu: handleGetMenu,
    } = this.props;
    if (!current) {
      handleGetMenu(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { menus: { errors } } = nextProps;
    if (errors) {
      this.setState({
        errors,
      });
    }
  }

  handleClose(e) {
    e.preventDefault();
    const {
      match: { params: { id } },
      history,
    } = this.props;
    history.push(`/menus/${id}`);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {
      match: { params: { id } },
      addMenuOption: handleAddMenuOption,
      history,
    } = this.props;
    const { description, additionalCost } = this.state;

    handleAddMenuOption(id, {
      description,
      additionalCost,
    }, history);
  }

  render() {
    const { menus: { current } } = this.props;
    const {
      errors,
      description,
      additionalCost,
    } = this.state;
    return (
      <Modal onSubmit={this.handleSubmit}>
        <ModalHeader title="Add Menu Option" onClose={this.handleClose} />
        {current ? (
          <ModalBody>
            <div className="form-group row">
              <div className="col-sm-12">
                <h5>
                  {current.name}
                  <small className="text-mute ml-2">
                    {current.category.name}
                  </small>
                </h5>
                <p>{current.description}</p>
                <hr />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="description" className="col-sm-4 col-form-label">
                Description
              </label>
              <div className="col-sm-8">
                <input
                  className={classnames('form-control', {
                    'is-invalid': errors.description,
                  })}
                  id="description"
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                  placeholder="Option Description"
                />
                {errors.description ? (
                  <div className="invalid-feedback">{errors.description}</div>
                ) : null}
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="additionalCost"
                className="col-sm-4 col-form-label"
              >
                Additional Cost
              </label>
              <div className="col-sm-8">
                <input
                  className={classnames('form-control', {
                    'is-invalid': errors.additionalCost,
                  })}
                  id="additionalCost"
                  name="additionalCost"
                  value={additionalCost}
                  onChange={this.handleChange}
                  type="number"
                />
                {errors.additionalCost ? (
                  <div className="invalid-feedback">
                    {errors.additionalCost}
                  </div>
                ) : null}
              </div>
            </div>
          </ModalBody>
        ) : (
          <span>Loading....</span>
        )}
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

AddMenuOption.propTypes = {
  menus: PropTypes.shape().isRequired,
  getMenu: PropTypes.func.isRequired,
  addMenuOption: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = state => ({
  menus: state.menus,
});

export default connect(
  mapStateToProps, {
    getMenu,
    addMenuOption,
  },
)(AddMenuOption);
