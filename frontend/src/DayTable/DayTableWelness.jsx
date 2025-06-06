import { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import AddEntryModalWelness from "../AddEntryModal/AddEntryModalWelness";
import DeleteEntryModal from "../DeleteEntryModal/DeleteEntryModal";
import { format } from "date-fns";

function DayTableWelness({ day, selectedDate, fetcheddata, setWasUpdated }) {
  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const formattedDate = selectedDate
    ? format(new Date(selectedDate), "dd.MM.yyyy")
    : "";

  useEffect(() => {
    setData(fetcheddata.outcomePlayers ?? []);
  }, [fetcheddata, selectedDate]);

  function getRowClass(entry) {
    if (
      entry.muscle > 5 ||
      entry.recovery > 5 ||
      entry.stress > 5 ||
      entry.sleep > 5
    ) {
      return "table-danger";
    } else if (
      entry.muscle === 5 ||
      entry.recovery === 5 ||
      entry.stress === 5 ||
      entry.sleep === 5
    ) {
      return "table-warning";
    }
    return "";
  }

  return (
    <Container className="mt-5 border border-2 rounded p-4">
      <Row className="d-flex justify-content-between align-items-center mb-3">
        <Col className="text-center">
          <h2>{day}</h2>
          <h4>{formattedDate}</h4>
        </Col>
        <Col className="text-end">
          <Button
            variant="btn btn-outline-primary"
            onClick={handleShowAddModal}
          >
            Add Entry
          </Button>
          <Button
            variant="btn btn-outline-danger"
            className="ms-2"
            onClick={handleShowDeleteModal}
          >
            Delete Entry
          </Button>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Muscle</th>
                <th>Recovery</th>
                <th>Stress</th>
                <th>Sleep</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
                <tr key={index} className={getRowClass(entry)}>
                  <td>{entry.name}</td>
                  <td>{entry.muscle}</td>
                  <td>{entry.recovery}</td>
                  <td>{entry.stress}</td>
                  <td>{entry.sleep}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row className="mt-3 text-center">
        <Col>
          <Table bordered striped>
            <tbody>
              <tr>
                <td>Muscle average</td>
                <td>{fetcheddata.muscleAverage}</td>
              </tr>
              <tr>
                <td>Recovery average</td>
                <td>{fetcheddata.recoveryAverage}</td>
              </tr>
              <tr>
                <td>Stress average</td>
                <td>{fetcheddata.stressAverage}</td>
              </tr>
              <tr>
                <td>Sleep average</td>
                <td>{fetcheddata.sleepAverage}</td>
              </tr>
              <tr>
                <td>Total welness average</td>
                <td>{fetcheddata.totalWelnessAverage}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      <AddEntryModalWelness
        show={showAddModal}
        handleClose={handleCloseAddModal}
        selectedDate={selectedDate}
        setWasUpdated={setWasUpdated}
        dayString={day}
      />
      <DeleteEntryModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        selectedDate={selectedDate}
        type="welness"
        setWasUpdated={setWasUpdated}
        dayString={day}
      />
    </Container>
  );
}

export default DayTableWelness;
