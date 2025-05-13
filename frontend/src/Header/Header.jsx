import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Switch from "react-switch";
import { useState } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const [isChecked, setIsChecked] = useState(false);

  function handleChange(checked) {
    setIsChecked((prev) => !prev);
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className={styles.logo}>
          RsTracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Row className="w-100 justify-content-center">
            <Col className="d-flex justify-content-center" xs="auto">
              <Nav>
                <Nav.Link as={Link} to="/">
                  HomePage
                </Nav.Link>
                <Nav.Link as={Link} to="/insert">
                  Insert
                </Nav.Link>
                <Nav.Link as={Link} to="/rpe">
                  RPE Dashboard
                </Nav.Link>
                <Nav.Link as={Link} to="/welness">
                  Wellness Dashboard
                </Nav.Link>
              </Nav>
            </Col>
          </Row>
        </Navbar.Collapse>

        <div className={styles.switchWrapper}>
          <div className={styles.username}>John Doe</div>
          <div className={styles.nameCircle}>JD</div>
          <Switch
            offColor={"#0000"}
            onColor={"#d9d5d4"}
            uncheckedIcon={false}
            checkedIcon={false}
            onChange={handleChange}
            checked={isChecked}
          />
        </div>
      </Container>
    </Navbar>
  );
}
