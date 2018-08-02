import React, { Component } from "react";
import { connect } from "react-redux";
import Modal, {
  ModalHeader,
  ModalBody,
  ModalFooter
} from "../../components/Modal";

//actions
//@todo get menu for the id

class TakeOrderSelectMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menu: undefined
    };
  }

  render() {
    return (
      <Modal>
        <ModalHeader title="Select Options" onClose={this.handleClose} />
        <ModalBody>
          @todo Hello This will show menu detail and menu options
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-outline-secondary">Close</button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  takeOrder: state.takeOrder
});

export default connect(mapStateToProps)(TakeOrderSelectMenu);
