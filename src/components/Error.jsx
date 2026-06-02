/**
 * Fallback UI for unknown routes; shown when no matching route is found.
 */
import React from 'react';
import { NavLink } from 'react-router-dom';
import PageShell from './PageShell';

// 404-style message with a link back to the home page
const Error = () => {
    return (
        <PageShell title="Page not found">
            <p>Uh-oh! The page you were looking for does not exist.</p>
            <p>
                <NavLink to="/" className="error-link">
                    Return to Home
                </NavLink>
            </p>
        </PageShell>
    );
};

export default Error;
