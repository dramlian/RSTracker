import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import BarChart from "../BarChart/BarChart";
import DayTable from "../DayTable/DayTable";

function WelnessDashboard() {
  return (
    <Container>
      <BarChart />
      <DayTable />
    </Container>
  );
}

export default WelnessDashboard;
