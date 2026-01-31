import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const NavbarComponent: React.FC = () => {
  return (
    <Navbar
      expand="lg"
      variant="dark"
      style={{ backgroundColor: "#0d0d0d", boxShadow: "0 2px 10px rgba(0,0,0,0.5)" }}
    >
      <Container>
        {/* Logo / Brand */}
        <Navbar.Brand href="/" className="fw-bold text-light">
          Développeur Junior
        </Navbar.Brand>

        {/* Toggle pour mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Liens */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" className="text-light fw-semibold">
              Accueil
            </Nav.Link>
            <Nav.Link href="/#about" className="text-light fw-semibold">
              À Propos
            </Nav.Link>
            <Nav.Link href="/#projects" className="text-light fw-semibold">
              Projets
            </Nav.Link>
            <Nav.Link href="/#contact" className="text-light fw-semibold">
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
