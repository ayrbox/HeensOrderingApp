import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

// components
import Modal, {
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../../components/Modal';

// actions
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
    if (!this.props.menus.current) {
      const { id } = this.props.match.params;
      this.props.getMenu(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.menus.errors) {
      this.setState({
        errors: nextProps.menus.errors,
      });
    }
  }

  handleClose(e) {
    e.preventDefault();
    const { id } = this.props.match.params;
    this.props.history.push(`/menus/${id}`);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { id } = this.props.match.params;
    const { description, additionalCost } = this.state;

    const option = {
      description,
      additionalCost,
    };

    this.props.addMenuOption(id, option, this.props.history);
  }

  render() {
    const { current } = this.props.menus;
    const { errors } = this.state;
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
                  value={this.state.description}
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
                  value={this.state.additionalCost}
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

const mapStateToProps = state => ({
  menus: state.menus,
});

export default connect(
  mapStateToProps,
  {
    getMenu,
    addMenuOption,
  },
)(AddMenuOption);
