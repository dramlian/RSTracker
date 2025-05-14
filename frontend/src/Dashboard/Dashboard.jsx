import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import BarChartWelness from "../BarChart/BarChartWelness";
import BarChartRPE from "../BarChart/BarChartRPE";
import DayTableWelness from "../DayTable/DayTableWelness";
import DayTableRPE from "../DayTable/DayTableRPE";
import Select from "react-select";
import { useRef, useState, useEffect } from "react";
import ApiClient from "../Helpers/ApiClient";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import WeekTableWelness from "../WeekTable/WeekTableWelness";

export default function Dashboard({ type }) {
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
  const [isLoading, setIsLoading] = useState(true);
  const [wasUpdated, setWasUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await ApiClient.get(`get-${type}/${selectedWeek.value}`);
        setDayData(data); // Save the entire response object
        if (type === "welness") {
          setChartData(calculateWelnessCharts(data.days)); // Use .days here
        } else if (type === "rpe") {
          setChartData(calculateRPECharts(data.days)); // Use the entire object if needed
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type, selectedWeek, wasUpdated]);

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

  const calculateRPECharts = (data) => {
    const result = {};

    for (const dayNumber in data) {
      const dayName = dayDictionary.current[dayNumber];
      const dayData = data[dayNumber];

      result[dayName] = {
        volume: dayData.volume,
        intensity: dayData.intensity,
      };
    }

    return result;
  };

  return (
    <Container fluid>
      <LoadingScreen isLoading={isLoading} />
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
          {type === "rpe" && <BarChartRPE chartData={chartData} />}
        </Col>
      </Row>
      {type === "welness" && (
        <Row>
          <Col>
            <WeekTableWelness
              data={dayData.days}
              dayDictionary={dayDictionary.current}
              totalWeekWelness={dayData.totalWeekWelness}
              averageThree={dayData.averageThree}
            />
          </Col>
        </Row>
      )}
      <Row className="d-flex align-items-stretch">
        {dayData.days &&
          Object.entries(dayDictionary.current).map(([key, day]) => (
            <Col
              key={`${selectedWeek.value}-${key}`}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              className="mb-4 d-flex"
            >
              {dayData.days[key] &&
                (type === "welness" ? (
                  <DayTableWelness
                    key={`${selectedWeek.value}-${key}`}
                    day={day}
                    weekKey={selectedWeek.value}
                    dayKey={key}
                    fetcheddata={dayData.days[key]}
                    setWasUpdated={setWasUpdated}
                  />
                ) : (
                  <DayTableRPE
                    key={`${selectedWeek.value}-${key}`}
                    day={day}
                    weekKey={selectedWeek.value}
                    dayKey={key}
                    fetcheddata={dayData.days[key]}
                    setWasUpdated={setWasUpdated}
                  />
                ))}
            </Col>
          ))}
      </Row>
    </Container>
  );
}
