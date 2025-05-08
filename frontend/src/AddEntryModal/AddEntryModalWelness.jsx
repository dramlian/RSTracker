import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import AddEntryFormWellness from "../AddEntryForm/AddEntryFormWellness";
import ApiClient from "../Helpers/ApiClient";

function AddEntryModalWelness({ show, handleClose, weekKey, dayKey }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [options, setOptions] = useState([]);
  const formRef = useRef();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const players = await ApiClient.get("get-players");
        const mappedOptions = players.map((player) => ({
          value: player.id,
          label: player.name,
        }));
        setOptions(mappedOptions);
        setSelectedPlayer(mappedOptions[0]);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      }
    };

    fetchPlayers();
  }, []);

  const handleDropdownChange = (selectedOption) => {
    setSelectedPlayer(selectedOption);
  };

  const handleFormSubmit = async () => {
    await formRef.current?.submitForm(weekKey, dayKey, selectedPlayer?.value);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Wellness Entry</Modal.Title>
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

        <AddEntryFormWellness ref={formRef} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleFormSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddEntryModalWelness;
