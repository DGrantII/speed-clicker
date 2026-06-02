/**
 * Shared layout wrapper that centers page content in a card below the site navigation.
 */
import React from 'react';
import Col from 'react-bootstrap/Col';

// Renders a Bootstrap column with an inner content card and optional page title
const PageShell = ({
    title,
    children,
}) => {
    // Whether to show the optional h2 heading inside the card
    const showTitle = Boolean(title);

    return (
        <Col xs={12} md={10} lg={8} className="align-self-center">
            <div className="content-card">
                {showTitle && <h2>{title}</h2>}
                {children}
            </div>
        </Col>
    );
};

export default PageShell;
