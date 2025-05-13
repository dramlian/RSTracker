import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
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
      </Container>
    </Navbar>
  );
}
