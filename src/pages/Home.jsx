import React from 'react';

const Home = () => {
    return (
        <div className='home-wrapper'>
            <h1>Welcome to Speed Clicker!</h1>
            <h2>How to Play:</h2>
            <p>
                Objective: Try to convert the entire grid to green.
                <br /><br />
                When you start the game, the first target cell will turn
                blue. Click on it to turn it green. Continue clicking on
                the blue cells until you convert the entire grid.
                <br /><br />
                Watch out! If you miss the target cell, the game will end.
                <br /><br />
                Try to complete the grid as quickly as possible!
            </p>
        </div>
    )
}

export default Home;