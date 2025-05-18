import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import Select from "react-select";
import AddEntryFormRPE from "../AddEntryForm/AddEntryFormRPE";
import AddEntryFormWellness from "../AddEntryForm/AddEntryFormWellness";
import ApiClient from "../Helpers/ApiClient";
import InsertPlayer from "./InsertPlayer";

function InsertPage() {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerOptions, setPlayerOptions] = useState([]);
  const [playersUpdated, setPlayersUpdated] = useState(false);

  const rpeFormRef = useRef();
  const wellnessFormRef = useRef();

  const weekOptions = Array.from({ length: 15 }, (_, i) => ({
    value: i + 1,
    label: `Week ${i + 1}`,
  }));

  const dayOptions = [
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
    { value: 7, label: "Sunday" },
  ];

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const players = await ApiClient.get("get-players");
        const mappedOptions = players.map((player) => ({
          value: player.id,
          label: player.name,
        }));
        setPlayerOptions(mappedOptions);
        setSelectedPlayer(mappedOptions[0]);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      }
    };

    fetchPlayers();
    setSelectedWeek(weekOptions[0]);
    setSelectedDay(dayOptions[0]);
  }, [playersUpdated]);

  const handleSaveRPE = () => {
    rpeFormRef.current?.submitForm(
      selectedWeek.value,
      selectedDay.value,
      selectedPlayer.value
    );
  };

  const handleSaveWellness = () => {
    wellnessFormRef.current?.submitForm(
      selectedWeek.value,
      selectedDay.value,
      selectedPlayer.value
    );
  };

  return (
    <div className="m-4">
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header className="fw-bold">Add New Player</Card.Header>
            <Card.Body>
              <InsertPlayer setPlayersUpdated={setPlayersUpdated} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <label>Select Week</label>
          <Select
            value={selectedWeek}
            onChange={setSelectedWeek}
            options={weekOptions}
            placeholder="Choose a week"
          />
        </Col>
        <Col md={4}>
          <label>Select Day</label>
          <Select
            value={selectedDay}
            onChange={setSelectedDay}
            options={dayOptions}
            placeholder="Choose a day"
          />
        </Col>
        <Col md={4}>
          <label>Select Player</label>
          <Select
            value={selectedPlayer}
            onChange={setSelectedPlayer}
            options={playerOptions}
            placeholder="Choose a player"
            isSearchable
          />
        </Col>
      </Row>

      <Row className="align-items-stretch">
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="fw-bold">RPE Entry</Card.Header>
            <Card.Body className="p-3">
              <AddEntryFormRPE ref={rpeFormRef} onSave={handleSaveRPE} />
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" onClick={handleSaveRPE}>
                Submit
              </Button>
            </Card.Footer>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="fw-bold">Wellness Entry</Card.Header>
            <Card.Body className="p-3">
              <AddEntryFormWellness
                ref={wellnessFormRef}
                onSave={handleSaveWellness}
              />
            </Card.Body>
            <Card.Footer>
              <Button variant="primary" onClick={handleSaveWellness}>
                Submit
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default InsertPage;
