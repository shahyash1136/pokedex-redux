import React from "react";
import Logo from "../../assets/images/logo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";
const Header = () => {
  return (
    <Navbar expand='md'>
      <Container>
        <NavbarBrand>
          <Link to='/pokedex' className='navbar-brand mr-auto'>
            <img src={Logo} alt='Logo' style={{ width: "100px" }} />
          </Link>
        </NavbarBrand>
        <NavbarToggler />
        <Collapse navbar>
          <Nav className='ml-auto' navbar>
            <>
              <NavItem>
                <NavLink tag={Link} to='/pokedex/signup' className='text-white'>
                  SignUp
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to='/pokedex/signin' className='text-white'>
                  SignIn
                </NavLink>
              </NavItem>
            </>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
