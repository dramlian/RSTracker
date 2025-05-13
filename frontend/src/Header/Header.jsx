import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Switch from "react-switch";
import styles from "./Header.module.css";
import { useState } from "react";

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
          <Nav className="ms-auto">
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
        </Navbar.Collapse>
        <Switch
          offColor={"#0000"}
          onColor={"#d9d5d4"}
          uncheckedIcon={false}
          checkedIcon={false}
          onChange={handleChange}
          checked={isChecked}
        />
      </Container>
    </Navbar>
  );
}
