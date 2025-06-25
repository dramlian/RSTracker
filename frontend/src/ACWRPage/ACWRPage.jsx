import { useState, useEffect } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import ComboBarChartACWR from "../BarChart/ComboBarChartACWR";
import StackedBarChartRPE from "../BarChart/StackedBarChartRPE";

export default function ACWRPage() {
  const [startDate, setStartDate] = useState("");
  const [numberOfWeeks, setNumberOfWeeks] = useState(7);

  useEffect(() => {
    // Auto-update when form values change
    if (startDate) {
      console.log("Start Date:", startDate);
      console.log("Number of Weeks:", numberOfWeeks);
      // Here you can add API call or data processing logic
    }
  }, [startDate, numberOfWeeks]);

  return (
    <Container fluid className="p-4">
      <Row className="mb-4 justify-content-center">
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>First Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Number of Weeks</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="52"
              value={numberOfWeeks}
              onChange={(e) => setNumberOfWeeks(parseInt(e.target.value))}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <ComboBarChartACWR />
        </Col>
      </Row>
      <Row>
        <Col>
          <StackedBarChartRPE />
        </Col>
      </Row>
    </Container>
  );
}
