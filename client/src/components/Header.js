import React from 'react';
import {Container, Navbar, Nav} from 'react-bootstrap';

function Header() {
  return (
    <>
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand href="/">Empleados</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/contacto">Contacto</Nav.Link>
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </>

  );
}

export default Header;
