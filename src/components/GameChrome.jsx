/**
 * Shared UI chrome for Normal and Slider modes: controls, timer, scores, and a slot for the game grid.
 */
import React from 'react';

// Layout for mode title, buttons, timer, and stats around the interactive grid
const GameChrome = ({
    modeTitle,
    active,
    timer,
    greenCells,
    highScoreStatus,
    highScoreCells,
    highScoreTime,
    onStart,
    onReset,
    children,
}) => {
    // Whether to show the end-of-round score summary
    const showScore = !active && timer !== '0';

    return (
        <div className="game-chrome">
            <h2 id="output"></h2>
            {showScore && (
                <h4>Score: {`${greenCells} correct cells in ${timer} seconds`}</h4>
            )}
            <h3>{modeTitle}</h3>
            <div className="button-row">
                <button className="game-button" id="startBtn" onClick={onStart}>
                    Start
                </button>
                <button className="game-button" id="resetBtn" onClick={onReset}>
                    Reset
                </button>
            </div>
            <p>Time elapsed: {timer}</p>
            {highScoreStatus !== null && <p className="stat-highlight">{highScoreStatus}</p>}
            {children}
            <p className="game-stats">
                Personal Highscore: {`${highScoreCells} correct cells in ${highScoreTime} seconds`}
            </p>
        </div>
    );
};

export default GameChrome;
