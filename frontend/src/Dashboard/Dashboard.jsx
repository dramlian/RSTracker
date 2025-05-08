import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import BarChartWelness from "../BarChart/BarChartWelness";
import BarChartRPE from "../BarChart/BarChartRPE";
import DayTableWelness from "../DayTable/DayTableWelness";
import DayTableRPE from "../DayTable/DayTableRPE";
import { useRef } from "react";

function Dashboard({ type }) {
  const dayDictionary = useRef({
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
    7: "Sunday",
  });

  const days = Object.values(dayDictionary.current);

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8} xl={6}>
          {type === "welness" && <BarChartWelness />}
          {type === "rpe" && <BarChartRPE />}
        </Col>
      </Row>

      <Row>
        {days.map((day, index) => (
          <Col key={index} xs={12} sm={12} lg={4} className="mb-4">
            {type === "welness" && <DayTableWelness day={day} />}
            {type === "rpe" && <DayTableRPE day={day} />}
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Dashboard;
