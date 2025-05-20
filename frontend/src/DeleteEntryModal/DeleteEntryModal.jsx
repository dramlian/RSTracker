import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import ApiClient from "../Helpers/ApiClient";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

function DeleteEntryModal({
  show,
  handleClose,
  weekKey,
  dayKey,
  type,
  setWasUpdated,
  dayString,
}) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleDelete = async () => {
    try {
      const url = `delete-${type}/${selectedPlayer.value}?dayOfWeek=${dayKey}&LeagueWeek=${weekKey}`;
      await ApiClient.delete(url);
      handleClose();
      setWasUpdated((prev) => !prev);
    } catch (error) {
      console.error("Failed to delete entry:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <LoadingScreen isLoading={isLoading} />
      <Modal.Header closeButton>
        <Modal.Title>
          Delete Entry in week {weekKey}, day {dayString}
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
