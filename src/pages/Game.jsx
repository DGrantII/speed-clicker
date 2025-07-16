import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { startGame, resetGame, playGame } from '../utils/game-logic';
import Error from '../components/Error';

const Game = () => {
    const { level } = useParams(); // Extracting level from URL parameters
    const allowedLevels = ['easy', 'medium', 'hard'];
    
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

    // Resetting the game when user navigates to a different level
    useEffect(() => {
        resetGame(setActive, setTimer, setCells, setGreenCells, setHighScoreStatus);
    }, [level]);

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

    // Initializing green cells and highscore
    const [greenCells, setGreenCells] = useState(0);
    const [highScoreTime, setHighScoreTime] = useState(0);
    const [highScoreCells, setHighScoreCells] = useState(0);
    const [highScoreStatus, setHighScoreStatus] = useState(null);

    // Getting high scores
    useEffect(() => {
        const storedHighScoreTime = localStorage.getItem(`highscore-time-${level}`) ?? 0;
        const storedHighScoreCells = localStorage.getItem(`highscore-cells-${level}`) ?? 0;
        setHighScoreTime(storedHighScoreTime);
        setHighScoreCells(storedHighScoreCells);
    }, [level]);

    // Storing and comparing values for highscore
    useEffect(() => {
        if (!active) {
            if (parseInt(greenCells) > parseInt(highScoreCells)) {
                setHighScoreStatus('New High Score!');
                setHighScoreCells(greenCells);
                setHighScoreTime(timer);
                localStorage.setItem(`highscore-time-${level}`, timer);
                localStorage.setItem(`highscore-cells-${level}`, greenCells);
            } else if (parseInt(greenCells) === parseInt(highScoreCells) && parseFloat(timer) < parseFloat(highScoreTime)) {
                setHighScoreStatus('New High Score!');
                setHighScoreTime(timer);
                localStorage.setItem(`highscore-time-${level}`, timer);
            }
        }
    }, [active, greenCells, timer, level, highScoreCells, highScoreTime]);

    const handleResetHighScore = () => {
        localStorage.setItem(`highscore-time-${level}`, 0);
        localStorage.setItem(`highscore-cells-${level}`, 0);
        setHighScoreCells(0);
        setHighScoreTime(0);
    }

    if (!allowedLevels.includes(level)) {
        return <Error />; // Error handling for invalid levels
    }

    return (
        <div className="col-12 col-md-6 align-self-center text-center pt-5 px-5">
            <h2 id='output' style={{ marginBottom: "10px" }}></h2>
            {(!active && timer !== '0') && <h4>Score: {`${greenCells} correct cells in ${timer} seconds`}</h4>}
            <h3>{level.charAt(0).toUpperCase().concat(level.slice(1))} Mode</h3>
            <button id='startBtn' onClick={(event) => { startGame(event, setActive, cells, setCells) }}>Start</button>
            <button id='resetBtn' onClick={() => { resetGame(setActive, setTimer, setCells, setGreenCells, setHighScoreStatus) }}>Reset</button>
            <button id='resetHighScoreBtn' onClick={handleResetHighScore}>Reset High Score</button>
            <p>Time elapsed: {timer}</p>
            {highScoreStatus !== null && <p>{highScoreStatus}</p>}
            <div className={`grid grid-${level}`}>
                {Array.from({ length: size }).map((_, index) => (
                    <div
                        key={index}
                        className="cell-available"
                        onClick={(event) => { playGame(event, active, setActive, cells, setCells, setGreenCells) }}></div>
                ))}
            </div>
            <p>Personal Highscore: {`${highScoreCells} correct cells in ${highScoreTime} seconds`}</p>
        </div>        
    );
}

export default Game;