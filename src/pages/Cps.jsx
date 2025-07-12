import React, { useState, useEffect, useRef } from 'react';

const Cps = () => {
    const [clicks, setClicks] = useState(0);
    const [cps, setCps] = useState(null);
    const [timerActive, setTimerActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5); // 5 seconds timer
    const [enableDiv, setEnableDiv] = useState(true); // To enable/disable the div
    const timerRef = useRef(null);
    const clicksRef = useRef(0); // Ref to keep track of clicks without causing re-renders

    // Function for the ripple effect
    const containerRef = useRef(null);
    const rippleEffect = (e) => {
        const container = containerRef.current; // Get the container element
        const circle = document.createElement('span'); // Create a span element for the ripple effect
        circle.className = 'ripple'; // Assign a class for styling the ripple effect
        const rect = container.getBoundingClientRect(); // Get the dimensions of the container
        const size = Math.max(rect.width, rect.height); // Calculate the size of the ripple effect based on the container's dimensions
        const x = e.clientX - rect.left - size / 2; // Calculate the x position for the ripple effect
        const y = e.clientY - rect.top - size / 2; // Calculate the y position for the ripple effect
        circle.style.width = circle.style.height = `${size}px`; // Set the width and height of the ripple effect
        circle.style.left = `${x}px`; // Set the left position of the ripple effect
        circle.style.top = `${y}px`; // Set the top position of the ripple effect
        container.appendChild(circle); // Append the ripple effect to the container
        setTimeout(() => {
            circle.remove(); // Remove the ripple effect after 600ms
        }, 600);
    }

    const handleClick = (e) => {
        // Preventing default action and stopping propagation
        e.preventDefault();
        e.stopPropagation();

        if (!enableDiv) return; // If the div is disabled, do nothing

        rippleEffect(e); // Trigger ripple effect on click
        // Starting timer on first click
        if (!timerActive) {
            setTimerActive(true);
            setClicks(1); // First click ticks off the timer
            setCps(null); // Reset CPS on new test

            // Setting up the timer
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current); // Clear timer when it reaches 0
                        setTimerActive(false); // Stop the timer
                        setCps((clicksRef.current / 5).toFixed(2)); // Calculate CPS
                        setEnableDiv(false); // Disable the div after the test
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            setClicks(prev => prev + 1); // Increment click count
        }
    }

    const [highScoreStatus, setHighScoreStatus] = useState(null);

    const handleReset = () => {
        setClicks(0);
        setCps(null);
        setTimerActive(false);
        setTimeLeft(5); // Reset timer to 5 seconds
        setEnableDiv(true); // Re-enable the div for a new test
        setHighScoreStatus(null);
        if (timerRef.current) {
            clearInterval(timerRef.current); // Clear any existing timer
        }
    }

    // Counting time down
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current); // Clear timeout on cleanup
            }
        };
    }, []);

    useEffect(() => {
        clicksRef.current = clicks; // Update clicksRef with the latest clicks count
    }, [clicks]);

    const [highScore, setHighScore] = useState(() => {
        return localStorage.getItem('highscore-cps') || 0;
    });

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
        <div className="col-12 col-md-6 align-self-center text-center pt-5 px-5">
            <div className="cps-header">
                <h2>Clicks Per Second (CPS) Test</h2>
                <p>Click the section below as fast as you can for 5 seconds!</p>
                <button onClick={handleReset}>Reset</button>
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
                {highScoreStatus !== null && <p>{highScoreStatus}</p>}
            </div>
            <h2>{timerActive && <p>Time left: {timeLeft}s</p>}</h2>
            <p>Clicks: {clicks}</p>
            <p>Personal Highscore: {highScore}</p>
        </div>
    )

}

export default Cps;
