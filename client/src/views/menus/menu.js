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
        tags
      } = nextProps.menus.current;

      this.setState({
        name,
        description,
        price,
        category,
        tags
      });
    }
  }

  render() {
    return (
      <Modal>
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
        </ModalBody>
        <ModalFooter>
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
