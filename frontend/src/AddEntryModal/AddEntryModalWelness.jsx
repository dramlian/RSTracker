import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import AddEntryFormWellness from "../AddEntryForm/AddEntryFormWellness";
import ApiClient from "../Helpers/ApiClient";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { format } from "date-fns";

function AddEntryModalWelness({
  show,
  handleClose,
  selectedDate,
  setWasUpdated,
  dayString,
}) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const formRef = useRef();
  const formattedDate = selectedDate
    ? format(new Date(selectedDate), "dd.MM.yyyy")
    : "";

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setIsLoading(true);
        const players = await ApiClient.get("get-players");
        const mappedOptions = players.map((player) => ({
          value: player.id,
          label: player.name,
        }));
        setOptions(mappedOptions);
        setSelectedPlayer(mappedOptions[0]);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (show) {
      fetchPlayers();
    }
  }, [show]);

  const handleDropdownChange = (selectedOption) => {
    setSelectedPlayer(selectedOption);
  };

  const handleFormSubmit = async () => {
    if (
      await formRef.current?.submitForm(
        selectedDate,
        selectedPlayer?.value,
        handleClose
      )
    ) {
      setWasUpdated((prev) => !prev);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <LoadingScreen isLoading={isLoading} />
      <Modal.Header closeButton>
        <Modal.Title>
          Add Wellness to {formattedDate}, {dayString}
        </Modal.Title>
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
