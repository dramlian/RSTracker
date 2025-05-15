import { Row, Col, Table } from "react-bootstrap";

export default function WeekTableRpe({
  data,
  dayDictionary,
  totalWeekVolume,
  totalWeekIntensity,
  totalWeekRpe,
  norms,
}) {
  return (
    <Row className="mt-4">
      <Col className="text-center">
        <h2 className="mb-3">RPE Averages</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Day</th>
              <th>Volume</th>
              <th>Intensity</th>
              <th>Duration</th>
              <th>Total Average</th>
              <th>Norm</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              Object.entries(data).map(([day, values]) => {
                if (!values.outcomeplayers) return null;

                return (
                  <tr key={day}>
                    <td>{dayDictionary?.[day] || "N/A"}</td>
                    <td>{values?.volume ? values.volume + " %" : "N/A"}</td>
                    <td>
                      {values?.intensity ? values.intensity + " %" : "N/A"}
                    </td>
                    <td>
                      {values?.commonTime ? values.commonTime + " min" : "N/A"}
                    </td>
                    <td>{values?.totalAverage || "N/A"}</td>
                    <td>{norms?.[day] || "N/A"}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
        <Table striped bordered hover className="mt-4 mx-auto">
          <tbody>
            <tr>
              <td>
                <strong>Total Weekly Volume</strong>
              </td>
              <td>{totalWeekVolume || "N/A"}</td>
            </tr>
            <tr>
              <td>
                <strong>Total Weekly Intensity</strong>
              </td>
              <td>{totalWeekIntensity || "N/A"} %</td>
            </tr>
            <tr>
              <td>
                <strong>Total Weekly RPE</strong>
              </td>
              <td>{totalWeekRpe || "N/A"} %</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}
