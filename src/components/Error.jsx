// This component displays a simple error message when the user navigates to a non-existent page.
import React from 'react';
import Col from 'react-bootstrap/Col';

const Error = () => {
    return (
        <Col xs={12} md={6} className='align-self-center text-center pt-5 px-5'>
            <h1>Uh-Oh! The page you were looking for is not found.</h1>
        </Col>
    )
}

export default Error;
