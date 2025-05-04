import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          RsTracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">
              HomePage
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              Insert data
            </Nav.Link>
            {/* Add more nav links as you add pages */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
