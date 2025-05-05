import { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import AddEntryModal from "../AddEntryModal/AddEntryModal";
import DeleteEntryModal from "../DeleteEntryModal/DeleteEntryModal";

DataTable.use(DT);

function DayTable({ day }) {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  useEffect(() => {
    const dummyData = [
      {
        name: "Richard Rezes",
        muscle: 10,
        recovery: 20,
        stress: 30,
        sleep: 40,
      },
      {
        name: "Jakub Kovalcik",
        muscle: 15,
        recovery: 25,
        stress: 35,
        sleep: 40,
      },
      { name: "Pavol Hasin", muscle: 20, recovery: 30, stress: 40, sleep: 40 },
    ];
    setData(dummyData);

    const summaryData = {
      value1: dummyData.reduce((sum, row) => sum + row.muscle, 0),
      value2: dummyData.reduce((sum, row) => sum + row.recovery, 0),
      value3: dummyData.reduce((sum, row) => sum + row.stress, 0),
      value4: dummyData.reduce((sum, row) => sum + row.sleep, 0),
    };
    setSummary(summaryData);
  }, []);

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
                <td>Value 1</td>
                <td>{summary.value1}</td>
              </tr>
              <tr>
                <td>Value 2</td>
                <td>{summary.value2}</td>
              </tr>
              <tr>
                <td>Value 3</td>
                <td>{summary.value3}</td>
              </tr>
              <tr>
                <td>Value 4</td>
                <td>{summary.value4}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      <AddEntryModal show={showAddModal} handleClose={handleCloseAddModal} />
      <DeleteEntryModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
      />
    </Container>
  );
}

export default DayTable;
