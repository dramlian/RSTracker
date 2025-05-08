import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import BarChartWelness from "../BarChart/BarChartWelness";
import BarChartRPE from "../BarChart/BarChartRPE";
import DayTableWelness from "../DayTable/DayTableWelness";
import DayTableRPE from "../DayTable/DayTableRPE";
import Select from "react-select";
import { useRef, useState, useEffect } from "react";

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

  const [weekOptions, setWeekOptions] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      value: i + 1,
      label: `Week ${i + 1}`,
    }))
  );
  const [selectedWeek, setSelectedWeek] = useState({
    value: 1,
    label: "Week 1",
  });

  return (
    <Container fluid>
      <Row className="align-items-center justify-content-center mt-4">
        <Col xs={12}>
          <Select
            options={weekOptions}
            value={selectedWeek}
            onChange={setSelectedWeek}
            placeholder="Select a week"
          />
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col>
          {type === "welness" && <BarChartWelness />}
          {type === "rpe" && <BarChartRPE />}
        </Col>
      </Row>

      <Row>
        {Object.entries(dayDictionary.current).map(([key, day]) => (
          <Col key={key} xs={12} sm={12} lg={4} className="mb-4">
            {type === "welness" && (
              <DayTableWelness
                day={day}
                weekKey={selectedWeek.value}
                dayKey={key}
              />
            )}
            {type === "rpe" && (
              <DayTableRPE
                day={day}
                weekKey={selectedWeek.value}
                dayKey={key}
              />
            )}
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Dashboard;
