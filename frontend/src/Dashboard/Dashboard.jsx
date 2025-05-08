import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import BarChartWelness from "../BarChart/BarChartWelness";
import BarChartRPE from "../BarChart/BarChartRPE";
import DayTableWelness from "../DayTable/DayTableWelness";
import DayTableRPE from "../DayTable/DayTableRPE";
import Select from "react-select";
import { useRef, useState, useEffect } from "react";
import ApiClient from "../Helpers/ApiClient";

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

  const [weekOptions, _] = useState(
    Array.from({ length: 15 }, (_, i) => ({
      value: i + 1,
      label: `Week ${i + 1}`,
    }))
  );
  const [selectedWeek, setSelectedWeek] = useState({
    value: 1,
    label: "Week 1",
  });

  const [dayData, setDayData] = useState({});
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (type === "welness") {
        try {
          const data = await ApiClient.get(`get-welness/${selectedWeek.value}`);
          setDayData(data);
          setChartData(calculateWelnessCharts(data));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [type, selectedWeek]);

  const calculateWelnessCharts = (data) => {
    const result = {};

    for (const dayNumber in data) {
      const dayName = dayDictionary.current[dayNumber];
      const dayData = data[dayNumber];

      if (dayData && typeof dayData.totalWelnessAverage === "number") {
        result[dayName] = dayData.totalWelnessAverage;
      } else {
        result[dayName] = 0;
      }
    }

    return result;
  };

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
          {type === "welness" && <BarChartWelness chartData={chartData} />}
          {type === "rpe" && <BarChartRPE />}
        </Col>
      </Row>

      <Row className="d-flex align-items-stretch">
        {Object.entries(dayDictionary.current).map(([key, day]) => (
          <Col
            key={`${selectedWeek.value}-${key}`}
            xs={12}
            sm={6}
            md={4}
            lg={4}
            className="mb-4 d-flex"
          >
            {type === "welness" && dayData[key] && (
              <DayTableWelness
                key={`${selectedWeek.value}-${key}`}
                day={day}
                weekKey={selectedWeek.value}
                dayKey={key}
                fetcheddata={dayData[key]}
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
