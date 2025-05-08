import { useEffect, useState } from "react";
import DataTable from "datatables.net-react";
import DT from "datatables.net-bs5";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import AddEntryModalRPE from "../AddEntryModal/AddEntryModalRPE";
import DeleteEntryModal from "../DeleteEntryModal/DeleteEntryModal";

DataTable.use(DT);

function DayTableRPE({ day, weekKey, dayKey }) {
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
      { name: "Richard Rezes", value: 10, duration: 30, totalvalue: 300 },
      { name: "Jakub Kovalcik", value: 15, duration: 40, totalvalue: 600 },
      { name: "Pavol Hasin", value: 20, duration: 50, totalvalue: 1000 },
    ];
    setData(dummyData);

    const summaryData = {
      avgDuration: (
        dummyData.reduce((sum, row) => sum + row.duration, 0) / dummyData.length
      ).toFixed(2),
      avgTotalValue: (
        dummyData.reduce((sum, row) => sum + row.totalvalue, 0) /
        dummyData.length
      ).toFixed(2),
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
              { title: "Value", data: "value" },
              { title: "Duration", data: "duration" },
              { title: "Total Value", data: "totalvalue" },
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
                <td>Average Duration</td>
                <td>{summary.avgDuration}</td>
              </tr>
              <tr>
                <td>Average Total Value</td>
                <td>{summary.avgTotalValue}</td>
              </tr>
              <tr>
                <td>Volume</td>
                <td>{summary.avgDuration}</td>
              </tr>
              <tr>
                <td>Intensity</td>
                <td>{summary.avgTotalValue}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      <AddEntryModalRPE
        show={showAddModal}
        handleClose={handleCloseAddModal}
        weekKey={weekKey}
        dayKey={dayKey}
      />
      <DeleteEntryModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
      />
    </Container>
  );
}

export default DayTableRPE;
