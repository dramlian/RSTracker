import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Switch from "react-switch";
import { useState } from "react";
import styles from "./Header.module.css";

import { useMsal } from "@azure/msal-react";

export default function Header() {
  const [isChecked, setIsChecked] = useState(false);
  const { instance, accounts } = useMsal();

  function handleChange(checked) {
    setIsChecked((prev) => !prev);
  }

  const handleLogin = () => {
    instance.loginRedirect({
      scopes: ["api://8d32374c-18a3-4253-aed6-9f42d981a68c/access_as_user"],
    });
  };

  const handleLogout = () => {
    instance.logoutRedirect();
  };

  const isLoggedIn = accounts.length > 0;

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
                <Nav.Link as={Link} to="/management">
                  Management
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
          {isLoggedIn ? (
            <>
              <div className={styles.username}>{accounts[0].username}</div>
              <div className={styles.nameCircle}>
                {accounts[0].name?.[0] || "U"}
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-outline-light ms-2"
              >
                Logout
              </button>
            </>
          ) : (
            <button onClick={handleLogin} className="btn btn-outline-light">
              Login
            </button>
          )}
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
