/**
 * Home page with welcome copy and step-by-step instructions for Normal mode gameplay.
 */
import React from 'react';
import PageShell from '../components/PageShell';

// Landing route content; game modes are reached via the navigation bar
const Home = () => {
    return (
        <PageShell title="Welcome">
            <div className="home-intro">
                <p>
                    Speed Clicker tests how fast and accurately you can hit moving targets.
                    Choose a mode from the menu above to begin.
                </p>
            </div>
            <h3>How to Play</h3>
            <div className="instruction-step">
                <strong>Objective:</strong> Turn every cell on the grid green as quickly as you can.
            </div>
            <div className="instruction-step">
                When the game starts, one cell turns blue. Click it to turn it green, then keep
                clicking each new blue cell until the whole grid is green.
            </div>
            <div className="instruction-step">
                <strong>Watch out:</strong> Clicking the wrong cell ends the game immediately.
            </div>
            <div className="instruction-step">
                Try to clear the grid in the shortest time possible and beat your personal high score.
            </div>
            <p className="home-callout">Pick a mode from the menu above to start playing.</p>
        </PageShell>
    );
};

export default Home;
