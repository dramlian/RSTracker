import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";

function DeleteEntryModal({ show, handleClose, weekKey, dayKey, type }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const options = [
    { value: "option1", label: "Player 1" },
    { value: "option2", label: "Player 2" },
    { value: "option3", label: "Player 3" },
    { value: "option4", label: "Player 4" },
    { value: "option5", label: "Player 5" },
  ];

  const handleDropdownChange = (selectedOption) => {
    setSelectedPlayer(selectedOption);
  };

  const handleDelete = () => {
    if (selectedPlayer) {
      console.log("Deleted player:", selectedPlayer);
      alert(
        `Deleted player: ${selectedPlayer.label}, week: ${weekKey}, day: ${dayKey}, type: ${type}`
      );
      handleClose();
    } else {
      alert("Please select a player to delete.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Select Player</Form.Label>
          <Select
            value={selectedPlayer}
            onChange={handleDropdownChange}
            options={options}
            placeholder="Select a player"
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteEntryModal;
