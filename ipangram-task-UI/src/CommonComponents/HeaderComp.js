import * as React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogin, userLogout } from "../ReduxStore/Action/LoginAction";

function HeaderComp({ navigate }) {
  const authUser = useSelector((state) => state.LoginReducer.list[0]);
  const dispatch = useDispatch();

  const logoutFun = () => {
    sessionStorage.removeItem("token");
    dispatch(userLogout());
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>iPangram</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>

            {authUser !== undefined ? (
              authUser.userType == "manager" ? (
                <>
                  <NavDropdown title="Master" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/department">
                      Department Master
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/employee">
                      Employee Master
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link as={Link} to="/dept-allocation">
                    Department Allocation
                  </Nav.Link>

                  <NavDropdown title="Query List" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/query-1">
                      Query 1
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/query-2">
                      Query 2
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                ""
              )
            ) : (
              ""
            )}
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} onClick={logoutFun}>
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default HeaderComp;
