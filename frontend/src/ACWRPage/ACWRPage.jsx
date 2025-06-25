import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ComboBarChartACWR from "../BarChart/ComboBarChartACWR";
import StackedBarChartRPE from "../BarChart/StackedBarChartRPE";
import api from "../Helpers/ApiClient";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function ACWRPage() {
  const [startDate, setStartDate] = useState("");
  const [numberOfWeeks, setNumberOfWeeks] = useState(0);
  const [acwrData, setAcwrData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchData = async () => {
    if (!startDate || numberOfWeeks <= 0 || numberOfWeeks > 52) {
      alert("Please select a valid date and number of weeks (1-52)");
      return;
    }

    try {
      setLoading(true);
      // Format date from YYYY-MM-DD to MM-DD-YYYY for the API
      const formattedDate = new Date(startDate)
        .toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
        .replace(/\//g, "-");

      const endpoint = `get-acwr/${formattedDate}/${numberOfWeeks}`;
      console.log("Fetching ACWR data from:", endpoint);

      const response = await api.get(endpoint);
      setAcwrData(response);
      console.log("ACWR data received:", response);
    } catch (error) {
      console.error("Error fetching ACWR data:", error);
      alert("Failed to fetch ACWR data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="p-4">
      <LoadingScreen isLoading={loading} />
      <Row className="mb-4 justify-content-center">
        <Col md={4}>
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

        <Col md={4}>
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
        <Col md={4}>
          <Button
            variant="outline-secondary"
            style={{ marginTop: "1.9rem" }}
            className="w-100"
            onClick={handleFetchData}
            disabled={loading}
          >
            {loading ? "Fetching..." : "Fetch ACWR Stats"}
          </Button>
        </Col>
      </Row>

      <Row>
        <Col>
          <ComboBarChartACWR />
        </Col>
      </Row>
      <Row>
        <Col>
          <StackedBarChartRPE rpeData={acwrData} />
        </Col>
      </Row>
    </Container>
  );
}
