import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import Select from "react-select";
import ApiClient from "../Helpers/ApiClient";

function RemovePlayer({ setPlayersUpdated, playerOptions }) {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setOptions(playerOptions);
        setSelectedPlayer(playerOptions[0]);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      }
    };

    fetchPlayers();
  }, [playerOptions]);

  const handleDropdownChange = (selectedOption) => {
    setSelectedPlayer(selectedOption);
  };

  const handleDelete = async () => {
    try {
      if (!selectedPlayer) {
        console.error("No player selected for deletion.");
        return;
      }
      const suffix = `delete/${selectedPlayer.value}`;
      await ApiClient.delete(suffix);
      setPlayersUpdated((prev) => !prev);
    } catch (error) {
      console.error("Failed to delete player:", error);
    }
  };

  return (
    <div>
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
      <Button
        variant="btn btn-outline-danger"
        onClick={handleDelete}
        disabled={!selectedPlayer}
        className="w-100"
      >
        Remove Player
      </Button>
    </div>
  );
}

export default RemovePlayer;
