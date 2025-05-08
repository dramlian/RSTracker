import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import AddEntryFormRPE from "../AddEntryForm/AddEntryFormRPE";

function AddEntryModalRPE({ show, handleClose }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
    { value: "option5", label: "Option 5" },
  ];

  useEffect(() => {
    setSelectedPlayer(options[0]);
  }, []);

  const handleDropdownChange = (selectedOption) => {
    setSelectedPlayer(selectedOption);
  };

  const handleFormSubmit = (formData) => {
    if (!selectedPlayer) {
      alert("Please select a player.");
      return;
    }

    const completeData = {
      player: selectedPlayer,
      ...formData,
    };

    console.log("Form Data Submitted:", completeData);
    handleClose(); // Close modal after submission
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add RPE Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Select Player</Form.Label>
          <Select
            value={selectedPlayer}
            onChange={handleDropdownChange}
            options={options}
            isSearchable={true}
            placeholder="Search and select a player"
          />
        </Form.Group>

        <AddEntryFormRPE onSubmit={handleFormSubmit} />
      </Modal.Body>
    </Modal>
  );
}

export default AddEntryModalRPE;
