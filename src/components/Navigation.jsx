/**
 * Primary site navigation: links to Home, CPS, Normal difficulties, and Slider modes.
 */
import { NavLink, useLocation } from 'react-router-dom';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';

// Responsive navbar with route-aware active styling for Normal mode dropdown
const Navigation = () => {
    // Current URL used to highlight the Normal dropdown when on a difficulty route
    const location = useLocation();
    // Paths that belong to the Normal game family
    const normalPaths = ['/normal/easy', '/normal/medium', '/normal/hard'];
    // Whether the user is on any Normal difficulty page
    const isNormalPath = normalPaths.includes(location.pathname);

    return (
        <>
            <Row className="navigation-row">
                <Container fluid>
                    <Navbar variant="dark" collapseOnSelect expand="md" className="navigation-bar">
                        <Container>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" className="nav-toggle-custom" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="justify-content-evenly w-100 gap-3 mx-1">
                                    <Nav.Link as={NavLink} to="/" variant="custom" className="nav-link-custom">Home</Nav.Link>
                                    <Nav.Link as={NavLink} to="/cps" variant="custom" className="nav-link-custom">CPS</Nav.Link>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            title="Normal"
                                            id="collasible-nav-dropdown"
                                            variant="custom"
                                            className={isNormalPath ? 'active' : ''}
                                        >
                                            Normal
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu variant="dark">
                                            <Dropdown.Item as={NavLink} to="/normal/easy">Easy</Dropdown.Item>
                                            <Dropdown.Item as={NavLink} to="/normal/medium">Medium</Dropdown.Item>
                                            <Dropdown.Item as={NavLink} to="/normal/hard">Hard</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Nav.Link as={NavLink} to="/slider" variant="custom" className="nav-link-custom">Slider</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </Container>
            </Row>
        </>
    );
};

export default Navigation;
