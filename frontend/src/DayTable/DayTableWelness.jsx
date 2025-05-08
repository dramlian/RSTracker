import { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import AddEntryModalWelness from "../AddEntryModal/AddEntryModalWelness";
import DeleteEntryModal from "../DeleteEntryModal/DeleteEntryModal";

DataTable.use(DT);

function DayTableWelness({ day, weekKey, dayKey, fetcheddata }) {
  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  useEffect(() => {
    console.log(`weekKey: ${weekKey}, dayKey: ${dayKey}`);
    setData(fetcheddata.outcomeplayers ?? []);
  }, [fetcheddata, weekKey, dayKey]);

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
          <DataTable
            key={`${weekKey}-${dayKey}`}
            data={data}
            className="table table-striped table-hover"
            columns={[
              { title: "Name", data: "name" },
              { title: "Muscle", data: "muscle" },
              { title: "Recovery", data: "recovery" },
              { title: "Stress", data: "stress" },
              { title: "Sleep", data: "sleep" },
            ]}
            options={{
              paging: true,
              searching: true,
              ordering: true,
              info: true,
            }}
          />
        </Col>
      </Row>

      <Row className="mt-3">
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
        weekKey={weekKey}
        dayKey={dayKey}
      />
      <DeleteEntryModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        weekKey={weekKey}
        dayKey={dayKey}
        type="welness"
      />
    </Container>
  );
}

export default DayTableWelness;
