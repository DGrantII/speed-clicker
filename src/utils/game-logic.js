/**
 * Shared DOM-driven game helpers for Normal and Slider modes: start, reset, play, and target selection.
 */

// Begins a round, picks the first target cell, and disables the start control
export const startGame = (event, setActive, cells, setCells) => {
    setActive(true);
    nextTarget(cells, setCells);
    event.target.disabled = true;
};

// Clears the board, timer, scores, and re-enables the start control
export const resetGame = (setActive, setTimer, setCells, setGreenCells, setHighScoreStatus) => {
    setActive(false);
    setTimer('0');
    setGreenCells(0);
    setHighScoreStatus(null);
    const elements = Array.from(
        document.querySelectorAll('.cell-target, .cell-done, .cell-wrong, .cell-available')
    );
    elements.forEach((cell) => {
        cell.className = 'cell-available';
    });
    setCells(elements);
    document.getElementById('startBtn').disabled = false;
    document.getElementById('output').innerHTML = '';
};

// Handles a cell click: correct hit advances target, wrong hit or win ends the round
export const playGame = (event, active, setActive, cells, setCells, setGreenCells) => {
    if (event.target.className === 'cell-target') {
        event.target.className = 'cell-done';
        setGreenCells((prev) => prev + 1);
        if (!cells[0]) {
            setActive(false);
            document.getElementById('output').innerHTML = 'You Win!';
        } else {
            nextTarget(cells, setCells);
        }
    } else if (active === false) {
        return;
    } else {
        event.target.className = 'cell-wrong';
        setActive(false);
        document.getElementById('output').innerHTML = 'Game Over! You clicked the wrong cell.';
    }
};

// Picks a random remaining cell and marks it as the next blue target
const nextTarget = (cells, setCells) => {
    const index = Math.floor(Math.random() * cells.length);
    const cell = cells[index];
    setCells((prev) => prev.filter((c) => c !== cell));
    cell.className = 'cell-target';
};
