import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { MDBIcon } from 'mdb-react-ui-kit';

const NavBar = ({ onSearch }) => {
  const [activeLink, setActiveLink] = useState('home');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value.trim();
    if (searchValue) {
      setIsSearching(true);
    }
    onSearch(searchValue);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsSearching(false);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">
          <MDBIcon fas icon="book" className="me-2" /> 
          Book Management System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            <Nav.Link
              href="#home"
              onClick={() => handleLinkClick('home')}
              style={{ color: activeLink === 'home' ? '#6f42c1' : 'inherit' }}
            >
              Home
            </Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <Form.Control
              type="search"
              name="search"
              placeholder="Search books"
              className="me-2"
              aria-label="Search"
              style={{ borderColor: isSearching ? '#6f42c1' : 'inherit' }}
            />
            <Button
              variant="outline-success"
              type="submit"
              style={{ color: isSearching ? '#6f42c1' : 'inherit', borderColor: isSearching ? '#6f42c1' : 'inherit' }}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
