import { Row, Col, Table } from "react-bootstrap";

export default function WeekTableWelness({
  data,
  dayDictionary,
  totalWeekWelness,
  averageThree,
}) {
  return (
    <Row className="mt-4">
      <Col className="text-center">
        <h2 className="mb-3">Wellness Averages</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Day</th>
              <th>Muscle</th>
              <th>Recovery</th>
              <th>Stress</th>
              <th>Sleep</th>
              <th>Total Wellness</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              Object.entries(data).map(([day, values]) => {
                const allZero =
                  values.muscleAverage === 0 &&
                  values.recoveryAverage === 0 &&
                  values.stressAverage === 0 &&
                  values.sleepAverage === 0 &&
                  values.totalWelnessAverage === 0;

                if (allZero) return null;

                return (
                  <tr key={day}>
                    <td>{dayDictionary[day]}</td>
                    <td>{values.muscleAverage}</td>
                    <td>{values.recoveryAverage}</td>
                    <td>{values.stressAverage}</td>
                    <td>{values.sleepAverage}</td>
                    <td>{values.totalWelnessAverage}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <Table striped bordered hover className="mt-4 mx-auto">
          <tbody>
            <tr>
              <td>
                <strong>Total Weekly Wellness</strong>
              </td>
              <td>{totalWeekWelness || "N/A"}</td>
            </tr>
            <tr>
              <td>
                <strong>Average of 3 Days</strong>
              </td>
              <td>{averageThree || "N/A"}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}
