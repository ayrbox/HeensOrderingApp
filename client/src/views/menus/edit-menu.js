import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

//components
import Modal, {
  ModalHeader,
  ModalFooter,
  ModalBody
} from "../../components/Modal";

//actions
import { getMenu, updateMenu } from "../../actions/menuActions";
import { getCategories } from "../../actions/categoryActions";

class EditMenu extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: "",
      description: "",
      price: "",
      category: "",
      tags: ""
    };

    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getCategories();
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
        category: category._id,
        tags: tags.join(",")
      });
    }
  }

  handleClose(e) {
    e.preventDefault();
    const { id } = this.props.match.params;
    this.props.history.push(`/menus/${id}/`);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSave(e) {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { name, description, price, category, tags } = this.state;
    this.props.updateMenu(
      id,
      {
        name,
        description,
        price,
        category,
        tags
      },
      this.props.history
    );
  }

  render() {
    const categories = this.props.categories.list;
    const { errors, msg } = this.props.menus;

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
                className={classnames("form-control", {
                  "is-invalid": errors.name
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
                className={classnames("form-control", {
                  "is-invalid": errors.description
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
                className={classnames("form-control", {
                  "is-invalid": errors.price
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
                defaultValue={""}
                name="category"
                id="category"
                onChange={this.handleChange}
                className={classnames("form-control", {
                  "is-invalid": errors.category
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
                className={classnames("form-control", {
                  "is-invalid": errors.tags
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
            Close
          </button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  menus: state.menus,
  categories: state.categories
});

export default connect(
  mapStateToProps,
  {
    getMenu,
    updateMenu,
    getCategories
  }
)(EditMenu);
