import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { startGame, resetGame, playGame } from '../utils/game-logic';

const Game = () => {
    const { level } = useParams(); // Extracting level from URL parameters
    if (level !== 'easy' && level !== 'medium' && level !== 'hard') {
        throw new Error('Invalid level specified. Please choose easy, medium, or hard.'); // Error handling for invalid levels
    }
    const [size, setSize] = useState(0);

    // Initializing timer
    const [timer, setTimer] = useState('0');
    const [active, setActive] = useState(false);

    // Initializing cells and grid
    const [cells, setCells] = useState([]);
    useEffect(() => {
        // Setting grid size based on level
        if (level === 'easy') {
            setSize(9); // 3x3 grid
        } else if (level === 'medium') {
            setSize(16); // 4x4 grid
        } else if (level === 'hard') {
            setSize(25); // 5x5 grid
        }
        // Obtaining array of cells
        const elements = Array.from(document.querySelectorAll('.cell-available'));
        setCells(elements);
    }, [level, size]);


    useEffect(() => {
        // Starting game
        if (active) {
            let gameTime = setInterval(() => {
                setTimer(prev => {
                    prev = Number.parseFloat(prev) + 0.01; // Incrementing timer by 0.1 seconds
                    return prev.toFixed(2);
                });
            }, 10);

            return () => clearInterval(gameTime);
        } else {
            // Stopping timer when game is not active
            setTimer(prev => prev);
        }
    }, [active]);
    

    return (
        <div className="col-12 col-md-6 align-self-center text-center pt-5 px-5">
            <h2 id='output' style={{marginBottom: "10px"} }></h2>
            <h3>{level.charAt(0).toUpperCase().concat(level.slice(1))} Mode</h3>
            <button id='startBtn' onClick={(event) => { startGame(event, setActive, cells, setCells) }}>Start</button>
            <button id='resetBtn' onClick={() => { resetGame(setActive, setTimer, setCells) }}>Reset</button>
            <p>Time elapsed: {timer}</p>
            <div className={`grid grid-${level}`}>
                {Array.from({ length: size }).map((_, index) => (
                    <div
                        key={index}
                        className="cell-available"
                        onClick={(event) => { playGame(event, active, setActive, cells, setCells) }}></div>
                ))}
            </div>
        </div>        
    );
}

export default Game;