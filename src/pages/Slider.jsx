import React, { useState, useEffect, useRef } from 'react';
import { startGame, resetGame, playGame } from '../utils/game-logic';
import Col from 'react-bootstrap/Col';

const Slider = () => {
    const cellRefs = useRef([]); // Using ref to store cell elements
    const numCells = 8; // Number of cells in the slider mode

    // Initializing timer
    const [timer, setTimer] = useState('0');
    const [active, setActive] = useState(false);

    // Initializing cells and grid
    const [cells, setCells] = useState([]);
    //const [cellSize, setCellSize] = useState(0); // Size of each cell in pixels

    useEffect(() => {
        // Obtaining array of cells
        const elements = Array.from(document.querySelectorAll('.cell-available'));
        //setCellSize(elements[0].getBoundingClientRect().width);
        setCells(elements);
    }, []);

    useEffect(() => {
        const cellSize = 70;
        //const positions = [
        //    { x: 0, y: 0 },
        //    { x: cellSize, y: 0 },
        //    { x: cellSize * 2, y: 0 },
        //    { x: cellSize * 2, y: cellSize },
        //    { x: cellSize * 2, y: cellSize * 2 },
        //    { x: cellSize, y: cellSize * 2 },
        //    { x: 0, y: cellSize * 2 },
        //    { x: 0, y: cellSize },
        //];
        const positions2 = [
            { x: 0, y: cellSize },
            { x: 0, y: cellSize * 2 },
            { x: cellSize, y: cellSize * 2 },
            { x: cellSize * 2, y: cellSize * 2 },
            { x: cellSize * 2, y: cellSize },
            { x: cellSize * 2, y: 0 },
            { x: cellSize, y: 0 },
            { x: 0, y: 0 },
        ]
        let frame = 0;
        const animate = () => {
            cellRefs.current.forEach((ref, i) => {
                if (ref) {
                    const posIndex = (frame + i) % positions2.length; // Cycling through positions
                    const { x, y } = positions2[posIndex];
                    ref.style.left = `${x}px`;
                    ref.style.top = `${y}px`;
                }
            });
            frame = (frame + 1) % positions2.length; // Incrementing frame for next animation
            setTimeout(() => requestAnimationFrame(animate), 500); // Requesting next frame after 700ms
        }
        animate(); // Starting the animation
    }, []);

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
        const storedHighScoreTime = localStorage.getItem('highscore-time-slider') ?? 0;
        const storedHighScoreCells = localStorage.getItem('highscore-cells-slider') ?? 0;
        setHighScoreTime(storedHighScoreTime);
        setHighScoreCells(storedHighScoreCells);
    }, []);

    // Storing and comparing values for highscore
    useEffect(() => {
        if (!active) {
            if (parseInt(greenCells) > parseInt(highScoreCells)) {
                setHighScoreStatus('New High Score!');
                setHighScoreCells(greenCells);
                setHighScoreTime(timer);
                localStorage.setItem('highscore-time-slider', timer);
                localStorage.setItem('highscore-cells-slider', greenCells);
            } else if (parseInt(greenCells) === parseInt(highScoreCells) && parseFloat(timer) < parseFloat(highScoreTime)) {
                setHighScoreStatus('New High Score!');
                setHighScoreTime(timer);
                localStorage.setItem('highscore-time-slider', timer);
            }
        }
    }, [active, greenCells, timer, highScoreCells, highScoreTime]);

    return (
        <Col xs={12} md={6} className="align-self-center text-center pt-5 px-5">
            <h2 id='output' style={{ marginBottom: "10px" }}></h2>
            {(!active && timer !== '0') && <h4>Score: {`${greenCells} correct cells in ${timer} seconds`}</h4>}
            <h3>Slider Mode</h3>
            <button className='game-button' id='startBtn' onClick={(event) => { startGame(event, setActive, cells, setCells) }}>Start</button>
            <button className='game-button' id='resetBtn' onClick={() => { resetGame(setActive, setTimer, setCells, setGreenCells, setHighScoreStatus) }}>Reset</button>
            <p>Time elapsed: {timer}</p>
            {highScoreStatus !== null && <p>{highScoreStatus}</p>}
            <div className="slider-grid">
                <div id="slider-center" className="cell-available" onClick={(event) => { playGame(event, active, setActive, cells, setCells, setGreenCells) }}></div>
                {Array.from({ length: numCells }).map((_, index) => (
                    <div
                        key={index}
                        className="cell-available"
                        ref={el => cellRefs.current[index] = el}
                        onClick={(event) => { playGame(event, active, setActive, cells, setCells, setGreenCells) }}
                    ></div>
                ))}
            </div>
            <p>Personal Highscore: {`${highScoreCells} correct cells in ${highScoreTime} seconds`}</p>
        </Col>
    );
}

export default Slider;
