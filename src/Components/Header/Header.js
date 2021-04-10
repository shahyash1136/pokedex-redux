import React from 'react';
import Logo from '../../assets/images/logo.png';
import './Header.css';
import { NavLink } from "react-router-dom";
import { Navbar, Container } from 'reactstrap';
const header = () => {
    return (
        <Navbar>
            <Container>
                <NavLink to="/" className="navbar-brand mr-auto">
                    <img src={Logo} alt="Logo" style={{ width: '100px' }} />
                </NavLink>
            </Container>
        </Navbar>
    )
}

export default header;