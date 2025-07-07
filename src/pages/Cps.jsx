import React, { useState, useEffect, useRef } from 'react';

const Cps = () => {
    const [clicks, setClicks] = useState(0);
    const [cps, setCps] = useState(null);
    const [timerActive, setTimerActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(5); // 5 seconds timer
    const [enableDiv, setEnableDiv] = useState(true); // To enable/disable the div
    const timerRef = useRef(null);
    const clicksRef = useRef(0); // Ref to keep track of clicks without causing re-renders

    const handleClick = (e) => {
        // Preventing default action and stopping propagation
        e.preventDefault();
        e.stopPropagation();

        if (!enableDiv) return; // If the div is disabled, do nothing

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

    const handleReset = () => {
        setClicks(0);
        setCps(null);
        setTimerActive(false);
        setTimeLeft(5); // Reset timer to 5 seconds
        setEnableDiv(true); // Re-enable the div for a new test
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

    return (
        <div className="cps-wrapper">
            <div className="cps-header">
                <h2>Clicks Per Second (CPS) Test</h2>
                <p>Click the section below as fast as you can for 5 seconds!</p>
                <button onClick={handleReset}>Reset</button>
            </div>
            <div
                onClick={handleClick}
                onDoubleClick={(e) => e.preventDefault()}
                className="cps-div"
                style={{
                    userSelect: 'none',
                    padding: '2rem',
                    backgroundColor: timerActive ? '#e6c7ff' : '#eee',
                    cursor: enableDiv ? 'pointer' : 'default',
                    textAlign: 'center',
                    border: timerActive ? '2px solid #56009b' : '2px solid #ccc',
                    width: '50%',
                    margin: '0 auto',
                }}
            >
                {(timerActive || cps === null) ? 'Click here!' : <p>Your CPS: {cps}</p>}
            </div>
            <h2>{timerActive && <p>Time left: {timeLeft}s</p>}</h2>
            <p>Clicks: {clicks}</p>
            
        </div>
    )

}

export default Cps;
