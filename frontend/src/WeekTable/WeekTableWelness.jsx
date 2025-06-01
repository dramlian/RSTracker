import { Row, Col, Table, Accordion } from "react-bootstrap";

export default function WeekTableWelness({ data }) {
  const daysArray = Array.isArray(data?.days)
    ? data.days
    : Object.values(data || {});

  return (
    <Row className="mt-4">
      <Col className="text-center">
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Wellness Averages</Accordion.Header>
            <Accordion.Body>
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
                  {daysArray &&
                    daysArray.map((values, idx) => {
                      const allZero =
                        values.muscleAverage === 0 &&
                        values.recoveryAverage === 0 &&
                        values.stressAverage === 0 &&
                        values.sleepAverage === 0 &&
                        values.totalWelnessAverage === 0;

                      if (allZero) return null;

                      return (
                        <tr key={values.dayOfWeekString || idx}>
                          <td>{values.dayOfWeekString}</td>
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
                    <td>
                      {typeof data?.totalWeekWelness === "number"
                        ? data.totalWeekWelness
                        : "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Average of 3 Days</strong>
                    </td>
                    <td>
                      {typeof data?.averageThree === "number"
                        ? data.averageThree
                        : "N/A"}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Row>
  );
}
