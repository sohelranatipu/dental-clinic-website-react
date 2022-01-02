import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../../src/images/Logo/logo-sm.png";
import useAuth from "../../Hooks/useAuth";
import "./Header.css";

const Header = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    //log out confirmation checking popup
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut(true);
      }
    });
  };

  const activeStyle = {
    color: "#07A5E2",
    fontWeight: 500,
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" sticky="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          {" "}
          <img src={logo} alt="logo" />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link activeStyle={activeStyle} as={NavLink} to="/home">
              Home
            </Nav.Link>
            <Nav.Link activeStyle={activeStyle} as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link activeStyle={activeStyle} as={NavLink} to="/services">
              Services
            </Nav.Link>
            <Nav.Link activeStyle={activeStyle} as={NavLink} to="/dentists">
              Dentists
            </Nav.Link>
            {/* -------------------------------------------------------------------------- */
            /*                      CONDITION RENDERING based on USER                     */
            /* -------------------------------------------------------------------------- */}
            {user ? (
              <>
                <Nav.Link>
                  <i class="fas fa-user me-2"></i>
                  {user.displayName?.split(" ")[0]}
                </Nav.Link>
                <button className="btn-signout nav-link" onClick={handleLogOut}>
                  <i class="fas fa-sign-out-alt"></i> Sign Out
                </button>
              </>
            ) : (
              <Nav.Link activeStyle={activeStyle} as={NavLink} to="/login">
                Sign In <i class="fas fa-sign-in-alt"></i>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
