export const startGame = (event, setActive, cells, setCells) => {
    setActive(true);
    nextTarget(cells, setCells);
    event.target.disabled = true; // Disable the start button after starting the game
}

export const resetGame = (setActive, setTimer, setCells) => {
    setActive(false);
    setTimer('0');
    const elements = Array.from(document.querySelectorAll('.cell-target, .cell-done, .cell-wrong, .cell-available'));
    elements.forEach(cell => {
        cell.className = 'cell-available';
    });
    setCells(elements);
    document.getElementById('startBtn').disabled = false; // Re-enable the start button
    document.getElementById('output').innerHTML = ''; // Clear output message
}

export const playGame = (event, active, setActive, cells, setCells) => {
    if (event.target.className === 'cell-target') {
        event.target.className = 'cell-done';
        // Check if all cells are done
        if (!cells[0]) {
            setActive(false);
            document.getElementById('output').innerHTML = 'You Win!';
        } else {
            nextTarget(cells, setCells);
        }
    } else if (active === false) {
        alert('Please start the game first!'); // Alert if user clicks before starting the game
        return;
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