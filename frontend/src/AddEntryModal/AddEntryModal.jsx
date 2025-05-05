import React from "react";
import { Modal, Button } from "react-bootstrap";

function AddEntryModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This is the Add Entry modal.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEntryModal;
