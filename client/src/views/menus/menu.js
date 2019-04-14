import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// components
import Modal, {
  ModalHeader,
  ModalFooter,
  ModalBody,
} from '../../components/Modal';

// actions
import { getMenu, deleteMenuOption } from '../../actions/menuActions';

class Menu extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      description: '',
      price: '',
      category: '',
      tags: [],
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
  }

  componentDidMount() {
    const {
      match: { params: { id } },
      getMenu: handleGetMenu,
    } = this.props;
    handleGetMenu(id);
  }

  componentWillReceiveProps(nextProps) {
    const { menus: { current } } = nextProps;
    if (current) {
      const {
        name,
        description,
        price,
        category,
        tags,
        menuOptions,
      } = current;

      this.setState({
        name,
        description,
        price,
        category,
        tags,
        menuOptions,
      });
    }
  }

  handleAddOption(e) {
    e.preventDefault();

    const {
      match: { params: { id } },
      history,
    } = this.props;

    history.push(`/menus/${id}/options/add`);
  }

  handleDelete(e) {
    e.preventDefault();

    const {
      match: { params: { id } },
      history,
    } = this.props;

    history.push(`/menus/${id}/delete`);
  }

  handleClose(e) {
    e.preventDefault();
    const { history } = this.props;
    history.push('/menus/');
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleDeleteOption(optionId, e) {
    e.preventDefault();

    const {
      match: { params: { id } },
      deleteMenuOption: handleDeleteMenuOption,
      history,
    } = this.props;
    handleDeleteMenuOption(id, optionId, history);
  }


  render() {
    const {
      name,
      description,
      price,
      category,
      tags,
      menuOptions,
    } = this.state;
    return (
      <Modal size="large">
        <ModalHeader title="Menu" onClose={this.handleClose} />
        <ModalBody>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-4 col-form-label">
              Name
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control-plaintext"
                id="name"
                name="name"
                value={name}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="description" className="col-sm-4 col-form-label">
              Description
            </label>
            <div className="col-sm-8">
              <textarea
                type="text"
                className="form-control-plaintext"
                id="description"
                name="description"
                value={description}
                readOnly
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="price" className="col-sm-4 col-form-label">
              Price
            </label>
            <div className="col-sm-8">
              <input
                type="number"
                className="form-control-plaintext"
                id="price"
                name="price"
                value={price}
                readOnly
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="category" className="col-sm-4 col-form-label">
              Category
            </label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control-plaintext"
                id="category"
                name="category"
                value={category.name || ''}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="tags" className="col-sm-4 col-form-label">
              Tags
            </label>
            <div className="col-sm-8">
              {tags.map(t => (
                <label
                  key={`${t}`}
                  className="badge badge-pill badge-dark mb-1 mr-1"
                >
                  {t}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-4 col-form-label">Menu Options</div>
            <div className="col-sm-8">
              {menuOptions ? (
                <ul className="list-group">
                  {menuOptions.map(({
                    _id: optionId,
                    description: optionDesc,
                    additionalCost,
                  }) => (
                    <li key={optionId} className="list-group-item">
                      <div className="d-flex w-100 justify-content-between">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={e => this.handleDeleteOption(optionId, e)}
                        >
                          X
                        </button>
                        {optionDesc}
                        <span>
                          {`&pound; ${additionalCost}`}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={this.handleAddOption}
          >
            Add Menu Option
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={(e) => {
              e.preventDefault();
              const {
                match: { params: { id } },
                history,
              } = this.props;
              history.push(`/menus/${id}/edit`);
            }}
          >
            Edit
          </button>

          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={this.handleDelete}
          >
            Delete
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

Menu.propTypes = {
  menus: PropTypes.shape({
    current: PropTypes.shape(),
  }).isRequired,
  getMenu: PropTypes.func.isRequired,
  deleteMenuOption: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = state => ({
  menus: state.menus,
});

export default connect(
  mapStateToProps,
  { getMenu, deleteMenuOption },
)(Menu);
