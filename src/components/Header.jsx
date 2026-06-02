/**
 * Site-wide header displayed on every page with the app title and tagline.
 */
import React from 'react';
import Row from 'react-bootstrap/Row';

// Top banner with branding; styling comes from .site-header in index.css
const Header = () => {
    return (
        <Row>
            <header className="site-header">
                <h1>Speed Clicker</h1>
                <p>Test your clicking speed and improve your reflexes!</p>
            </header>
        </Row>
    );
};

export default Header;
