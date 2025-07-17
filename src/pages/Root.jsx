import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Header from '../components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Root = () => {
    return (
        <Container fluid>
            <Header />
            <Navigation />
            <Row className='justify-content-center'>
                <Outlet />
            </Row>
        </Container>
    )
}

export default Root;
