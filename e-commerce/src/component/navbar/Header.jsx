// src/components/Header.js
import React, { useContext } from 'react';
import { Button, Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartPlus } from "react-icons/fa";
import { CartContext } from '../cart/CartContext';
import { LanguageContext } from '../../languges/LangugeContext';

const Header = ({ search, setSearch, onLogout }) => {
  const navigate = useNavigate();
  const { cartCount } = useContext(CartContext);
  const { language, setLanguage, translate } = useContext(LanguageContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.getAttribute('data-value'));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  const getCurrentLanguageLabel = () => {
    switch (language) {
      case 'en':
        return translate('navbar.english');
      case 'fr':
        return translate('navbar.french');
      default:
        return translate('navbar.language');
    }
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">{translate('navbar.navbarBrand')}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Item>
              <Nav.Link as={Link} to="/">{translate('navbar.home')}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/about">{translate('navbar.about')}</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as={Link} to="/cart">
                <FaCartPlus /> {cartCount}
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <NavDropdown  title={getCurrentLanguageLabel()} id="language-dropdown">
            <NavDropdown.Item data-value="en" onClick={handleLanguageChange}>
              {translate('navbar.english')}
            </NavDropdown.Item>
            <NavDropdown.Item data-value="fr" onClick={handleLanguageChange}>
              {translate('navbar.french')}
            </NavDropdown.Item>
          </NavDropdown>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder={translate('navbar.search')}
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={handleSearchChange}
            />
            <Button variant="outline-success" type="submit">{translate('navbar.search')}</Button>
          </Form>
          <Button variant="outline-danger" onClick={handleLogout} className="ms-3">
            {translate('navbar.logout')}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
