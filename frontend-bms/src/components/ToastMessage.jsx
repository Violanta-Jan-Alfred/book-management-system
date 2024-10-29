// ToastMessage.js
import React from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const ToastMessage = ({ show, onClose, message, variant }) => {
  return (
    <ToastContainer
      position="top-end"
      className="p-3"
      style={{
        zIndex: 1000,
        position: 'fixed',
        top: '20px',
        right: '20px',
      }}
    >
      <Toast onClose={onClose} show={show} bg={variant} delay={3000} autohide>
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Notification</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastMessage;
