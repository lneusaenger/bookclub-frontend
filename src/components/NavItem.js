import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavItem = ({ text, to, active }) => {
  return (
    <Nav.Link as={Link} to={to} className={`nav__item ${active ? 'active' : ''}`} style={{ color: "black", textDecoration: "none" }}>
      {text}
    </Nav.Link>
  );
}

export default NavItem;


