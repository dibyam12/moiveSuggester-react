import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom/cjs/react-router-dom";
const MyNavbar = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-dark text-white">
        <Container>
          <Navbar.Brand>
            <Link to="/" className="text-white">
              Movie Suggester
            </Link>
          </Navbar.Brand>
          <Navbar.Text>
            <div>
              <Link to="/add" className="p-3 text-white">
                Add a Movie
              </Link>

              {localStorage.getItem("accessToken") ? (
                <>
                  <Link to="/profile" className="p-3 text-white">
                    {" "}
                    Profile{" "}
                  </Link>
                </>
              ) : (
                <>
                  {" "}
                  <Link to="/login" className="p-3 text-white">
                    {" "}
                    Login{" "}
                  </Link>
                </>
              )}
            </div>{" "}
          </Navbar.Text>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNavbar;
