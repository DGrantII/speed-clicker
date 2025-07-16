export const startGame = (event, setActive, cells, setCells) => {
    setActive(true);
    nextTarget(cells, setCells);
    event.target.disabled = true; // Disable the start button after starting the game
}

export const resetGame = (setActive, setTimer, setCells, setGreenCells, setHighScoreStatus) => {
    setActive(false); // Deactivate the game
    setTimer('0'); // Reset the timer to 0
    setGreenCells(0); // Reset the count of green cells
    setHighScoreStatus(null); // Reset high score status
    const elements = Array.from(document.querySelectorAll('.cell-target, .cell-done, .cell-wrong, .cell-available'));
    elements.forEach(cell => {
        cell.className = 'cell-available';
    });
    setCells(elements);
    document.getElementById('startBtn').disabled = false; // Re-enable the start button
    document.getElementById('output').innerHTML = ''; // Clear output message
}

export const playGame = (event, active, setActive, cells, setCells, setGreenCells) => {
    if (event.target.className === 'cell-target') {
        event.target.className = 'cell-done';
        setGreenCells(prev => prev + 1); // Increment the count of green cells
        // Check if all cells are done
        if (!cells[0]) {
            setActive(false); // Deactivate the game
            document.getElementById('output').innerHTML = 'You Win!';
        } else {
            nextTarget(cells, setCells);
        }
    } else if (active === false) {
        return; // Do nothing if the game is not active
    } else {
        event.target.className = 'cell-wrong';
        setActive(false);
        document.getElementById('output').innerHTML = 'Game Over! You clicked the wrong cell.';
    }
}

const nextTarget = (cells, setCells) => {
    let index = Math.floor(Math.random() * cells.length);
    let cell = cells[index];
    setCells(prev => prev.filter(c => c !== cell)); // Remove the selected cell from the available cells
    cell.className = 'cell-target';
}