import { useEffect, useState } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import AddEntryModalRPE from "../AddEntryModal/AddEntryModalRPE";
import DeleteEntryModal from "../DeleteEntryModal/DeleteEntryModal";

function DayTableRPE({ day, selectedDate, fetcheddata, setWasUpdated }) {
  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  useEffect(() => {
    setData(fetcheddata.outcomePlayers ?? []);
  }, [fetcheddata, selectedDate]);

  function getRowClass(entry) {
    if (entry.value > 7) {
      return "table-danger";
    } else if (entry.value === 7) {
      return "table-warning";
    }
    return "";
  }

  return (
    <Container className="mt-5 border border-2 rounded p-4">
      <Row className="d-flex justify-content-between align-items-center mb-3">
        <Col>
          <h2>{day}</h2>
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
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Duration</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {data.map((entry, index) => (
                <tr key={index} className={getRowClass(entry)}>
                  <td>{entry.name}</td>
                  <td>{entry.value}</td>
                  <td>{entry.duration}</td>
                  <td>{entry.totalvalue}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Table bordered striped>
            <tbody>
              <tr>
                <td>Average Duration</td>
                <td>{fetcheddata.commonTime}</td>
              </tr>
              <tr>
                <td>Average Total Value</td>
                <td>{fetcheddata.totalAverage}</td>
              </tr>
              <tr>
                <td>Average common intensity</td>
                <td>{fetcheddata.intensity} %</td>
              </tr>
              <tr>
                <td>Average common volume</td>
                <td>{fetcheddata.volume} %</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      <AddEntryModalRPE
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
        type="rpe"
        setWasUpdated={setWasUpdated}
        dayString={day}
      />
    </Container>
  );
}

export default DayTableRPE;
