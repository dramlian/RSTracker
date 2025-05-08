import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import Select from "react-select";
import AddEntryFormRPE from "../AddEntryForm/AddEntryFormRPE";
import AddEntryFormWellness from "../AddEntryForm/AddEntryFormWellness";

function InsertPage() {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const weekOptions = [
    { value: "week1", label: "Week 1" },
    { value: "week2", label: "Week 2" },
    { value: "week3", label: "Week 3" },
  ];

  const dayOptions = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
    { value: "saturday", label: "Saturday" },
    { value: "sunday", label: "Sunday" },
  ];

  const playerOptions = [
    { value: "player1", label: "Player 1" },
    { value: "player2", label: "Player 2" },
    { value: "player3", label: "Player 3" },
  ];

  useEffect(() => {
    setSelectedWeek(weekOptions[0]);
    setSelectedDay(dayOptions[0]);
    setSelectedPlayer(playerOptions[0]);
  }, []);

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
              <AddEntryFormRPE />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100">
            <Card.Header className="fw-bold">Wellness Entry</Card.Header>
            <Card.Body className="p-3">
              <AddEntryFormWellness />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default InsertPage;
