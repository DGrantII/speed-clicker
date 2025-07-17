import React from 'react';
import Row from 'react-bootstrap/Row';

const Header = () => {
    return (
        <Row>
            <header style={{ textAlign: "center", paddingTop: "20px", paddingBottom: "20px", backgroundColor: "#282c34", color: "white" }}>
                <h1>Speed Clicker</h1>
                <p>Test your clicking speed and improve your reflexes!</p>
            </header>
        </Row>
    );
}

export default Header;
