import { useEffect, useState, useRef } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import Select from "react-select";
import AddEntryFormRPE from "../AddEntryForm/AddEntryFormRPE";
import AddEntryFormWellness from "../AddEntryForm/AddEntryFormWellness";
import ApiClient from "../Helpers/ApiClient";
import InsertPlayer from "./InsertPlayer";
import RemovePlayer from "./RemovePlayer";
import ListPlayers from "./ListPlayers";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ManagementPage() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerOptions, setPlayerOptions] = useState([]);
  const [playersUpdated, setPlayersUpdated] = useState(false);
  const [loading, setLoading] = useState(true);

  const rpeFormRef = useRef();
  const wellnessFormRef = useRef();

  useEffect(() => {
    const fetchPlayers = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [playersUpdated]);

  const handleClose = () => {
    // Implement close logic if needed
  };

  const handleSaveRPE = async () => {
    setLoading(true);
    await rpeFormRef.current?.submitForm(
      selectedDate,
      selectedPlayer?.value,
      handleClose
    );
    setLoading(false);
  };

  const handleSaveWellness = async () => {
    setLoading(true);
    await wellnessFormRef.current?.submitForm(
      selectedDate,
      selectedPlayer?.value,
      handleClose
    );
    setLoading(false);
  };

  return (
    <>
      <LoadingScreen isLoading={loading} />
      <div className="m-4">
        <div className="mb-4 border rounded shadow-sm bg-white p-3">
          <Row>
            <Col xs={12} md={6} className="d-flex">
              <Card className="w-100">
                <Card.Header className="fw-bold">
                  Add / Remove Player
                </Card.Header>
                <Card.Body>
                  <InsertPlayer setPlayersUpdated={setPlayersUpdated} />
                  <hr />
                  <RemovePlayer
                    setPlayersUpdated={setPlayersUpdated}
                    playerOptions={playerOptions}
                  />
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={6} className="d-flex">
              <Card className="w-100">
                <Card.Header className="fw-bold">List Players</Card.Header>
                <Card.Body>
                  <ListPlayers playerOptions={playerOptions} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
        <div className="mb-4 border rounded shadow-sm bg-white p-3">
          <Row className="mb-4">
            <Col md={6}>
              <label>Select Date</label>
              <DatePicker
                selected={new Date(selectedDate)}
                onChange={(date) => {
                  const iso = date.toISOString().split("T")[0];
                  setSelectedDate(iso);
                }}
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                className="form-control"
                wrapperClassName="w-100"
              />
            </Col>
            <Col md={6}>
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
                  <Button
                    variant="btn btn-outline-primary"
                    onClick={handleSaveRPE}
                    className="w-100"
                  >
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
                  <Button
                    variant="btn btn-outline-primary"
                    onClick={handleSaveWellness}
                    className="w-100"
                  >
                    Submit
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default ManagementPage;
