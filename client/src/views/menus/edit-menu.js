import React, { Component } from "react";

//components
import Modal, {
  ModalHeader,
  ModalFooter,
  ModalBody
} from "../../components/Modal";

class EditMenu extends Component {
  render() {
    // const tags = menu.tags.join(",");
    return (
      <Modal>
        <ModalHeader title="Edit Menu" onClose={() => {}} />
        <ModalBody>
          <h1>test</h1>
        </ModalBody>
        <ModalFooter>
          <button>test</button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default EditMenu;
