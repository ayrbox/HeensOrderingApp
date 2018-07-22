import React, { Component } from "react";
import { connect } from "react-redux";

//components
import Modal, {
  ModalHeader,
  ModalFooter,
  ModalBody
} from "../../components/Modal";

//actions
import { getMenu } from "../../actions/menuActions";

class Menu extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: "",
      description: "",
      price: "",
      category: "",
      tags: []
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();

    const { id } = this.props.match.params;

    this.props.history.push(`/menus/${id}/delete`);
  }

  handleClose(e) {
    e.preventDefault();
    this.props.history.push("/menus/");
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.getMenu(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.menus.current) {
      const {
        name,
        description,
        price,
        category,
        tags,
        menuOptions
      } = nextProps.menus.current;

      this.setState({
        name,
        description,
        price,
        category,
        tags,
        menuOptions
      });
    }
  }

  render() {
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
                value={this.state.name}
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
                value={this.state.description}
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
                value={this.state.price}
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
                value={this.state.category.name || ""}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="tags" className="col-sm-4 col-form-label">
              Tags
            </label>
            <div className="col-sm-8">
              {this.state.tags.map((t, i) => (
                <label
                  key={i}
                  className="badge badge-pill badge-dark mb-1 mr-1"
                >
                  {t}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-4 col-form-label">Menu Options</label>
            <div className="col-sm-8">
              {this.state.menuOptions ? (
                <ul className="list-group">
                  {this.state.menuOptions.map(o => (
                    <li key={o._id} className="list-group-item">
                      <div className="d-flex w-100 justify-content-between">
                        {o.description}
                        <span>&pound;{o.additionalCost}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-outline-primary">
            Add Menu Option
          </button>
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={e => {
              e.preventDefault();
              const { id } = this.props.match.params;
              this.props.history.push(`/menus/${id}/edit`);
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

const mapStateToProps = state => ({
  menus: state.menus
});

export default connect(
  mapStateToProps,
  { getMenu }
)(Menu);
