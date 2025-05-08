import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import Select from "react-select";
import AddEntryFormRPE from "../AddEntryForm/AddEntryFormRPE";
import AddEntryFormWellness from "../AddEntryForm/AddEntryFormWellness";

function InsertPage() {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const rpeFormRef = useRef();
  const wellnessFormRef = useRef();

  const weekOptions = [
    { value: 1, label: "Week 1" },
    { value: 2, label: "Week 2" },
    { value: 3, label: "Week 3" },
  ];

  const dayOptions = [
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
    { value: 7, label: "Sunday" },
  ];

  const playerOptions = [
    { value: 1, label: "Player 1" },
    { value: 2, label: "Player 2" },
    { value: 3, label: "Player 3" },
  ];

  useEffect(() => {
    setSelectedWeek(weekOptions[0]);
    setSelectedDay(dayOptions[0]);
    setSelectedPlayer(playerOptions[0]);
  }, []);

  const handleSaveRPE = () => {
    //(weekKey, dayKey, selectedPlayer);
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
