import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Navigation() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/product">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/product">Products</Nav.Link>
            <Nav.Link href="/category">Categories</Nav.Link>
            <Nav.Link href="/manufacturer">Manufacturers</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    /*<>
      {/*<div className="container m-1">
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">BitZone Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="d-inline p-2 bg-light" href="/category">
                Categories
              </Nav.Link>
              <Nav.Link
                className="d-inline p-2 bg-light"
                href="/manufacturer"
                to="/manufacturer"
              >
                Manufacturers
              </Nav.Link>
              <Nav.Link
                className="d-inline p-2 bg-light"
                href="/product"
                to="/product"
              >
                Products
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
  </>*/
  );
}

export default Navigation;
