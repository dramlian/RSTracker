import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Form } from "react-bootstrap";
import BarChartWelness from "../BarChart/BarChartWelness";
import BarChartRPE from "../BarChart/BarChartRPE";
import DayTableWelness from "../DayTable/DayTableWelness";
import DayTableRPE from "../DayTable/DayTableRPE";
import { useState, useEffect } from "react";
import ApiClient from "../Helpers/ApiClient";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import WeekTableWelness from "../WeekTable/WeekTableWelness";
import WeekTableRpe from "../WeekTable/WeekTableRpe";
import ComboChartRPE from "../BarChart/ComboChartRPE";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function Dashboard({ type }) {
  const toDate = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().split("T")[0];
  });

  const [dayData, setDayData] = useState({});
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [wasUpdated, setWasUpdated] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await ApiClient.get(`get-${type}/${selectedDate}`);
        setDayData(data);
        if (type === "welness") {
          setChartData(calculateWelnessCharts(data.days));
        } else if (type === "rpe") {
          setChartData(calculateRPECharts(data.days));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [type, selectedDate, wasUpdated]);

  const calculateWelnessCharts = (days) => {
    const result = {};
    if (!Array.isArray(days)) return result;
    days.forEach((day) => {
      result[day.dayOfWeekString] =
        typeof day.totalWelnessAverage === "number"
          ? day.totalWelnessAverage
          : 0;
    });
    return result;
  };

  const calculateRPECharts = (days) => {
    const result = {};
    if (!Array.isArray(days)) return result;
    days.forEach((day) => {
      result[day.dayOfWeekString] = {
        volume: day.volume,
        intensity: day.intensity,
      };
    });
    return result;
  };

  return (
    <Container fluid>
      <LoadingScreen isLoading={isLoading} />
      <div className="p-5 pt-3">
        <Row className="align-items-center justify-content-center">
          <Col xs={12}>
            <Form.Group controlId="datePicker">
              <Form.Label>Select from date</Form.Label>
              <DatePicker
                selected={new Date(selectedDate)}
                onChange={(date) => {
                  const iso = date.toISOString().split("T")[0];
                  setSelectedDate(iso);
                }}
                dateFormat="dd/MM/yyyy"
                maxDate={new Date()}
                className="form-control"
                wrapperClassName="w-100"
              />
            </Form.Group>

            <Form.Group controlId="toDateDisplay" className="mt-3">
              <Form.Label>To date</Form.Label>
              <Form.Control
                type="text"
                value={format(new Date(toDate), "dd/MM/yyyy")}
                readOnly
                plaintext={false}
                className="w-100"
                style={{ backgroundColor: "#e9ecef" }}
              />
            </Form.Group>
          </Col>
        </Row>
        {type === "welness" ? (
          <Row>
            <Col>
              <WeekTableWelness data={dayData} />
            </Col>
          </Row>
        ) : type === "rpe" ? (
          <Row>
            <Col>
              <WeekTableRpe data={dayData} />
            </Col>
          </Row>
        ) : null}
        <Row className="justify-content-center">
          <Col>
            {type === "welness" && <BarChartWelness chartData={chartData} />}
            {type === "rpe" && (
              <>
                <BarChartRPE chartData={chartData} />
                <ComboChartRPE
                  norms={dayData.norms}
                  averages={dayData.totalWeekAverages}
                />
              </>
            )}
          </Col>
        </Row>
      </div>
      <Row className="d-flex align-items-stretch">
        {Array.isArray(dayData.days) &&
          dayData.days.map((day) => (
            <Col
              key={`${selectedDate}-${day.dayOfWeek}`}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              className="mb-4 d-flex"
            >
              {type === "welness" ? (
                <DayTableWelness
                  day={day.dayOfWeekString}
                  selectedDate={day.date}
                  fetcheddata={day}
                  setWasUpdated={setWasUpdated}
                />
              ) : (
                <DayTableRPE
                  day={day.dayOfWeekString}
                  selectedDate={day.date}
                  fetcheddata={day}
                  setWasUpdated={setWasUpdated}
                />
              )}
            </Col>
          ))}
      </Row>
    </Container>
  );
}
