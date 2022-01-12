import React from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useAuthContext } from "../../contexts/AuthContext";

const Navigation = () => {
  const { user } = useAuthContext();

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Link to="/" className="navbar-brand">
          Photo Reviewer
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user ? (
              <>
                <NavLink to="/logout" className="nav-link">
                  Logout
                </NavLink>
              </>
            ) : (
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
