import { Row, Col, Table } from "react-bootstrap";

export default function WeekTableRpe({ data }) {
  const normsObj = Array.isArray(data?.norms)
    ? data.norms.reduce((acc, n) => {
        acc[n.day] = n.average;
        return acc;
      }, {})
    : {};

  const averagesObj = Array.isArray(data?.totalWeekAverages)
    ? data.totalWeekAverages.reduce((acc, n) => {
        acc[n.day] = n.average;
        return acc;
      }, {})
    : {};

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
            {data?.days &&
              data.days.map((day) => (
                <tr key={day.dayOfWeekString}>
                  <td>{day.dayOfWeekString || "N/A"}</td>
                  <td>
                    {typeof day.volume === "number" ? day.volume + " %" : "N/A"}
                  </td>
                  <td>
                    {typeof day.intensity === "number"
                      ? day.intensity + " %"
                      : "N/A"}
                  </td>
                  <td>
                    {typeof day.commonTime === "number"
                      ? day.commonTime + " min"
                      : "N/A"}
                  </td>
                  <td>
                    {typeof day.totalAverage === "number"
                      ? day.totalAverage
                      : "N/A"}
                  </td>
                  <td>
                    {normsObj[day.dayOfWeekString] !== undefined
                      ? normsObj[day.dayOfWeekString]
                      : "N/A"}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <Table striped bordered hover className="mt-4 mx-auto">
          <tbody>
            <tr>
              <td>
                <strong>Total Weekly Volume</strong>
              </td>
              <td>
                {typeof data?.totalWeekVolume === "number"
                  ? data.totalWeekVolume + " %"
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Total Weekly Intensity</strong>
              </td>
              <td>
                {typeof data?.totalWeekIntensity === "number"
                  ? data.totalWeekIntensity + " %"
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Total Weekly RPE</strong>
              </td>
              <td>
                {typeof data?.totalWeekRpe === "number"
                  ? data.totalWeekRpe
                  : "N/A"}
              </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}
