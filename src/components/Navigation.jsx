import { NavLink } from 'react-router-dom';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Navigation = () => {
    return (
        <Row className="navigation-row">
            <Container fluid>
                <Navbar variant="dark" collapseOnSelect expand="md" className="navigation-bar">
                    <Container>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" className="nav-toggle-custom" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="justify-content-evenly w-100 gap-3 mx-1">
                                <Nav.Link as={NavLink} to="/" className="nav-link-custom">Home</Nav.Link>
                                <Nav.Link as={NavLink} to="/cps" className="nav-link-custom">CPS</Nav.Link>
                                <Nav.Link as={NavLink} to="/easy" className="nav-link-custom">Easy</Nav.Link>
                                <Nav.Link as={NavLink} to="/medium" className="nav-link-custom">Medium</Nav.Link>
                                <Nav.Link as={NavLink} to="/hard" className="nav-link-custom">Hard</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Container>
            
        </Row>
    )
}

export default Navigation;
