/**
 * Slider mode page: cells orbit a center square; same win/lose rules as Normal mode.
 */
import React, { useState, useEffect, useRef } from 'react';
import { startGame, resetGame, playGame } from '../utils/game-logic';
import PageShell from '../components/PageShell';
import GameChrome from '../components/GameChrome';

// Slider mode with animated peripheral cells around a fixed center cell
const Slider = () => {
    // Refs to orbiting cell elements updated by the animation loop
    const cellRefs = useRef([]);
    // Number of cells that move along the slider path (excluding center)
    const numCells = 8;

    // Elapsed time as a string with two decimal places
    const [timer, setTimer] = useState('0');
    // Whether a round is currently in progress
    const [active, setActive] = useState(false);

    // DOM references to all clickable cells including the center
    const [cells, setCells] = useState([]);

    // Count of cells successfully turned green this round
    const [greenCells, setGreenCells] = useState(0);
    // Best time stored for slider mode
    const [highScoreTime, setHighScoreTime] = useState(0);
    // Best green-cell count stored for slider mode
    const [highScoreCells, setHighScoreCells] = useState(0);
    // Banner text when the player beats a stored record
    const [highScoreStatus, setHighScoreStatus] = useState(null);

    // Collect cell elements once after mount for game-logic helpers
    useEffect(() => {
        const elements = Array.from(document.querySelectorAll('.cell-available'));
        setCells(elements);
    }, []);

    // Animate orbiting cells through fixed positions on an octagonal path
    useEffect(() => {
        const cellSize = 70;
        const positions2 = [
            { x: 0, y: cellSize },
            { x: 0, y: cellSize * 2 },
            { x: cellSize, y: cellSize * 2 },
            { x: cellSize * 2, y: cellSize * 2 },
            { x: cellSize * 2, y: cellSize },
            { x: cellSize * 2, y: 0 },
            { x: cellSize, y: 0 },
            { x: 0, y: 0 },
        ];
        let frame = 0;
        const animate = () => {
            cellRefs.current.forEach((ref, i) => {
                if (ref) {
                    const posIndex = (frame + i) % positions2.length;
                    const { x, y } = positions2[posIndex];
                    ref.style.left = `${x}px`;
                    ref.style.top = `${y}px`;
                }
            });
            frame = (frame + 1) % positions2.length;
            setTimeout(() => requestAnimationFrame(animate), 500);
        };
        animate();
    }, []);

    // Tick the timer every 10ms while a round is active
    useEffect(() => {
        if (active) {
            const gameTime = setInterval(() => {
                setTimer((prev) => {
                    const next = Number.parseFloat(prev) + 0.01;
                    return next.toFixed(2);
                });
            }, 10);

            return () => clearInterval(gameTime);
        }
    }, [active]);

    // Load persisted slider high scores from localStorage
    useEffect(() => {
        const storedHighScoreTime = localStorage.getItem('highscore-time-slider') ?? 0;
        const storedHighScoreCells = localStorage.getItem('highscore-cells-slider') ?? 0;
        setHighScoreTime(storedHighScoreTime);
        setHighScoreCells(storedHighScoreCells);
    }, []);

    // Compare finished round against stored records and save improvements
    useEffect(() => {
        if (!active) {
            if (parseInt(greenCells) > parseInt(highScoreCells)) {
                setHighScoreStatus('New High Score!');
                setHighScoreCells(greenCells);
                setHighScoreTime(timer);
                localStorage.setItem('highscore-time-slider', timer);
                localStorage.setItem('highscore-cells-slider', greenCells);
            } else if (
                parseInt(greenCells) === parseInt(highScoreCells) &&
                parseFloat(timer) < parseFloat(highScoreTime)
            ) {
                setHighScoreStatus('New High Score!');
                setHighScoreTime(timer);
                localStorage.setItem('highscore-time-slider', timer);
            }
        }
    }, [active, greenCells, timer, highScoreCells, highScoreTime]);

    return (
        <PageShell>
            <GameChrome
                modeTitle="Slider Mode"
                active={active}
                timer={timer}
                greenCells={greenCells}
                highScoreStatus={highScoreStatus}
                highScoreCells={highScoreCells}
                highScoreTime={highScoreTime}
                onStart={(event) => startGame(event, setActive, cells, setCells)}
                onReset={() =>
                    resetGame(setActive, setTimer, setCells, setGreenCells, setHighScoreStatus)
                }
            >
                <div className="slider-grid">
                    <div
                        id="slider-center"
                        className="cell-available"
                        onClick={(event) =>
                            playGame(event, active, setActive, cells, setCells, setGreenCells)
                        }
                    ></div>
                    {Array.from({ length: numCells }).map((_, index) => (
                        <div
                            key={index}
                            className="cell-available"
                            ref={(el) => (cellRefs.current[index] = el)}
                            onClick={(event) =>
                                playGame(event, active, setActive, cells, setCells, setGreenCells)
                            }
                        ></div>
                    ))}
                </div>
            </GameChrome>
        </PageShell>
    );
};

export default Slider;
