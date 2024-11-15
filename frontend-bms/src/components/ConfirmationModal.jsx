import React from 'react';
import { MDBModal, 
         MDBModalDialog, 
         MDBModalContent, 
         MDBModalHeader, 
         MDBModalBody, 
         MDBModalFooter, 
         MDBBtn } from 'mdb-react-ui-kit';

const ConfirmationModal = ({ open, onConfirm, onClose, message }) => {
  return (
    <MDBModal tabIndex="-1" open={open} onClose={onClose}>
      <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader>
            <h5>Confirm Action</h5>
            <MDBBtn className="btn-close" color="none" onClick={onClose}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <p>{message}</p>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={onClose}>
              Cancel
            </MDBBtn>
            <MDBBtn color="success" onClick={onConfirm}>
              Confirm
            </MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
};

export default ConfirmationModal;
