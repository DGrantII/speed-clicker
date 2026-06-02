/**
 * Root layout shell: site header, navigation, and routed page content via an outlet.
 */
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// Wraps all routes with shared chrome and a main content region for child pages
const Root = () => {
    return (
        <Container fluid>
            <Header />
            <Navigation />
            <main className="site-main">
                <Row className="justify-content-center">
                    <Outlet />
                </Row>
            </main>
        </Container>
    );
};

export default Root;
