import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import ConfirmationModal from './ConfirmationModal';

const ConfirmAction = ({ action, message, children }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Fragment>
      {React.cloneElement(children, { onClick: () => setOpenModal(true) })}
      {openModal && (
        <ConfirmationModal
          text={message}
          open={openModal}
          action={() => {
            action();
            setOpenModal(false);
          }}
          onCancel={() => setOpenModal(false)}
        />
      )}
    </Fragment>
  );
};

ConfirmAction.propTypes = {
  action: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ConfirmAction;
