/**
 * Clicks-per-second (CPS) test page: rapid clicking in a timed zone with local high score.
 */
import React, { useState, useEffect, useRef } from 'react';
import PageShell from '../components/PageShell';

// Five-second click test with ripple feedback and CPS calculation
const Cps = () => {
    // Total clicks registered during the current or last test
    const [clicks, setClicks] = useState(0);
    // Calculated clicks per second after the timer ends; null before first result
    const [cps, setCps] = useState(null);
    // Whether the five-second countdown is running
    const [timerActive, setTimerActive] = useState(false);
    // Seconds remaining on the countdown
    const [timeLeft, setTimeLeft] = useState(5);
    // Whether the click target accepts input
    const [enableDiv, setEnableDiv] = useState(true);

    // Interval id for the one-second countdown
    const timerRef = useRef(null);
    // Latest click count readable inside interval callbacks without stale closures
    const clicksRef = useRef(0);
    // Click target element used to position ripple effects
    const containerRef = useRef(null);

    // Banner text when the player beats the stored CPS record
    const [highScoreStatus, setHighScoreStatus] = useState(null);
    // Best CPS value loaded from and saved to localStorage
    const [highScore, setHighScore] = useState(() => {
        return localStorage.getItem('highscore-cps') || 0;
    });

    // Creates a short-lived ripple span at the click coordinates
    const rippleEffect = (e) => {
        const container = containerRef.current;
        const circle = document.createElement('span');
        circle.className = 'ripple';
        const rect = container.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        circle.style.width = circle.style.height = `${size}px`;
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;
        container.appendChild(circle);
        setTimeout(() => {
            circle.remove();
        }, 600);
    };

    // Handles each click: starts timer on first click, counts clicks, ends test at zero
    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!enableDiv) return;

        rippleEffect(e);

        if (!timerActive) {
            setTimerActive(true);
            setClicks(1);
            setCps(null);

            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        setTimerActive(false);
                        setCps((clicksRef.current / 5).toFixed(2));
                        setEnableDiv(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            setClicks((prev) => prev + 1);
        }
    };

    // Clears state so the user can run another CPS test
    const handleReset = () => {
        setClicks(0);
        setCps(null);
        setTimerActive(false);
        setTimeLeft(5);
        setEnableDiv(true);
        setHighScoreStatus(null);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };

    // Clear interval on unmount to avoid leaks
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    // Keep ref in sync with click state for the interval callback
    useEffect(() => {
        clicksRef.current = clicks;
    }, [clicks]);

    // Persist a new CPS record when the finished score beats the stored high score
    useEffect(() => {
        if (cps !== null) {
            if (parseFloat(cps) > parseFloat(highScore)) {
                setHighScoreStatus('New High Score!');
                setHighScore(cps);
                localStorage.setItem('highscore-cps', cps);
            }
        }
    }, [cps, highScore]);

    return (
        <PageShell title="Clicks Per Second (CPS) Test">
            <div className="cps-header">
                <p>Click the section below as fast as you can for 5 seconds!</p>
                <button className="game-button" onClick={handleReset}>
                    Reset
                </button>
            </div>
            <div
                ref={containerRef}
                onClick={handleClick}
                onDoubleClick={(e) => e.preventDefault()}
                className="cps-div"
                style={{
                    cursor: enableDiv ? 'pointer' : 'default',
                    border: timerActive ? '2px solid #56009b' : '2px solid #ccc',
                }}
            >
                {(timerActive || cps === null) ? 'Click here!' : <p>Your CPS: {cps}</p>}
            </div>
            {timerActive && <p className="timer-display">Time left: {timeLeft}s</p>}
            <div className="cps-page-stats game-stats">
                <p>Clicks: {clicks}</p>
                {highScoreStatus !== null && <p className="stat-highlight">{highScoreStatus}</p>}
                <p>Personal Highscore: {highScore}</p>
            </div>
        </PageShell>
    );
};

export default Cps;
