/**
 * Normal difficulty game page: grid-based clicking with timer and per-level high scores.
 */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { startGame, resetGame, playGame } from '../utils/game-logic';
import Error from '../components/Error';
import PageShell from '../components/PageShell';
import GameChrome from '../components/GameChrome';

// Normal mode for easy, medium, or hard grid sizes from the URL
const Game = () => {
    // Difficulty slug from the route (easy | medium | hard)
    const { level } = useParams();
    // Valid level keys accepted by this page
    const [allowedLevels] = useState(['easy', 'medium', 'hard']);

    // Total number of cells in the grid for the current level
    const [size, setSize] = useState(0);

    // Elapsed time as a string with two decimal places
    const [timer, setTimer] = useState('0');
    // Whether a round is currently in progress
    const [active, setActive] = useState(false);

    // DOM references to clickable grid cells for game-logic helpers
    const [cells, setCells] = useState([]);

    // Count of cells successfully turned green this round
    const [greenCells, setGreenCells] = useState(0);
    // Best time stored for this level
    const [highScoreTime, setHighScoreTime] = useState(0);
    // Best green-cell count stored for this level
    const [highScoreCells, setHighScoreCells] = useState(0);
    // Banner text when the player beats a stored record
    const [highScoreStatus, setHighScoreStatus] = useState(null);

    // Set grid dimensions and refresh cell references when level changes
    useEffect(() => {
        if (level === 'easy') {
            setSize(9);
        } else if (level === 'medium') {
            setSize(16);
        } else if (level === 'hard') {
            setSize(25);
        }
        const elements = Array.from(document.querySelectorAll('.cell-available'));
        setCells(elements);
    }, [level, size]);

    // Reset board state when navigating between difficulty routes
    useEffect(() => {
        if (allowedLevels.includes(level)) {
            resetGame(setActive, setTimer, setCells, setGreenCells, setHighScoreStatus);
        }
    }, [level, allowedLevels]);

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

    // Load persisted high scores for the current level from localStorage
    useEffect(() => {
        const storedHighScoreTime = localStorage.getItem(`highscore-time-${level}`) ?? 0;
        const storedHighScoreCells = localStorage.getItem(`highscore-cells-${level}`) ?? 0;
        setHighScoreTime(storedHighScoreTime);
        setHighScoreCells(storedHighScoreCells);
    }, [level]);

    // Compare finished round against stored records and save improvements
    useEffect(() => {
        if (!active) {
            if (parseInt(greenCells) > parseInt(highScoreCells)) {
                setHighScoreStatus('New High Score!');
                setHighScoreCells(greenCells);
                setHighScoreTime(timer);
                localStorage.setItem(`highscore-time-${level}`, timer);
                localStorage.setItem(`highscore-cells-${level}`, greenCells);
            } else if (
                parseInt(greenCells) === parseInt(highScoreCells) &&
                parseFloat(timer) < parseFloat(highScoreTime)
            ) {
                setHighScoreStatus('New High Score!');
                setHighScoreTime(timer);
                localStorage.setItem(`highscore-time-${level}`, timer);
            }
        }
    }, [active, greenCells, timer, level, highScoreCells, highScoreTime]);

    if (!allowedLevels.includes(level)) {
        return <Error />;
    }

    // Capitalized label for the current difficulty
    const modeTitle = level.charAt(0).toUpperCase().concat(level.slice(1)).concat(' Mode');

    return (
        <PageShell>
            <GameChrome
                modeTitle={modeTitle}
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
                <div className={`grid grid-${level}`}>
                    {Array.from({ length: size }).map((_, index) => (
                        <div
                            key={index}
                            className="cell-available"
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

export default Game;
