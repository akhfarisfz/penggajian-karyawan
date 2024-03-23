import { Container, Nav, Navbar } from "react-bootstrap";
import { useContext } from "react";
import { ContextApplication } from "../config/contexts.js";
import useJWT from "../hooks/useJWT.jsx";
import useHTTP from "../hooks/useHTTP.jsx";

const LibComponentNavbar = () => {
  const jwt = useJWT();

  const applcation = useContext(ContextApplication);

  const signOut = () => {
    jwt.signOut();
    applcation.setIsAuthenticated(false);
  };

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="d-print-none">
      <Container>
        <Navbar.Brand href="#">
          <img
            src="public/B.png"
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Logo Penggajian Absensi"
          />
          Penggajian Absensi</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {applcation.isAuthenticated && (
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#/">Karyawan</Nav.Link>
              <Nav.Link href="#jabatan">Jabatan</Nav.Link>
              <Nav.Link href="#departemen">Departemen</Nav.Link>
              <Nav.Link href="#potongan">Potongan</Nav.Link>
              <Nav.Link href="#penggajian">Penggajian</Nav.Link>
              <Nav.Link onClick={signOut}>Log Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default LibComponentNavbar;
