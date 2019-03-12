/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH; rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for (let rowIdx = 0; rowIdx < GRID_LENGTH; rowIdx++) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum % 2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if (gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="' + colIdx + '" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for (let colIdx = 0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;

    renderMainGrid();
    if(!alertResult()){
        addClickHandlers();
        playComputerTurn();
    }
  
}
function alertResult() {
    if (checkWinner(1)) {
        alert("Player won");
        resetGame();
        return true;

    } else if (checkWinner(2)) {
        alert("Computer won");
        resetGame();
        return true;

    } else if (checkTied()) {
        alert("Game tied");
        resetGame();
        return true;
    }
}
function checkTied() {
    var flag = true;
    for (var i = 0; i < GRID_LENGTH; i++) {
        for (var j = 0; j < GRID_LENGTH; j++) {
            if (grid[i][j] === 0) {
                flag = false;
                break;
            }
        }
    }
    return flag;
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}
function resetGame() {
    for (var i = 0; i < GRID_LENGTH; i++) {
        for (var j = 0; j < GRID_LENGTH; j++) {
            grid[i][j] = 0;
        }
    }
    renderMainGrid();
    addClickHandlers();

}

function playComputerTurn() {
    var coords = platSmartMove();
    var i = coords.i, j = coords.j;
    grid[i][j] = 2;
    renderMainGrid();
    alertResult();
    addClickHandlers();

}
function platSmartMove() {
    var middle = (GRID_LENGTH - 1) / 2;
    if (grid[middle][middle] === 0) {
        return { i: middle, j: middle };
    }

    if (checkRow(2)) {
        return checkRow(2);
    };
    if (checkColumn(2)) {
        return checkColumn(2);
    }
    if (checkDiagonal(2)) {
        return checkDiagonal(2);
    };
    return playRandom();
}

function checkRow(value) {
    for (var i = 0; i < GRID_LENGTH; i++) {
        var count = 0;
        var flag = false;
        var colPos = -1;
        for (var j = 0; j < GRID_LENGTH; j++) {
            if (grid[i][j] === value) {
                count++;
            } else if (grid[i][j] === 0) {
                colPos = j;
                flag = true;
            }

        }
        if (count + 1 === GRID_LENGTH && flag) {
            console.log("return from row")
            return { i: i, j: colPos };

        } else if (count === GRID_LENGTH) {
            return true;
        }
    }
}
function checkColumn(value) {
    for (var i = 0; i < GRID_LENGTH; i++) {
        var count = 0;
        var flag = false;
        var colPos = -1;
        for (var j = 0; j < GRID_LENGTH; j++) {
            if (grid[j][i] === value) {
                count++;
            } else if (grid[j][i] === 0) {
                colPos = i;
                flag = true;
            }
        }
        if (count + 1 === GRID_LENGTH && flag) {
            console.log("return from column")
            return { i: j, j: colPos };
        } else if (count === GRID_LENGTH) {
            return true;
        }
    }
}

function checkDiagonal(value) {
    var count1 = 0, count2 = 0, flag1 = false, flag2 = false, pos = -1;
    for (var i = 0; i < GRID_LENGTH; i++) {
        if (grid[i][i] === value) {
            count1++;
        } else if (grid[i][i] === 0) {
            pos = i;
            flag1 = true;
        }
        if (grid[GRID_LENGTH - i - 1][GRID_LENGTH - i - 1] === value) {
            count2++;
        } else if (grid[GRID_LENGTH - i - 1][GRID_LENGTH - i - 1] === 0) {
            pos = i;
            flag2 = true;
        }
    }
    if (count1 + 1 === GRID_LENGTH && flag1) {
        console.log("return from diagonal1")
        return { i: pos, j: pos };
    } else if (count1 === GRID_LENGTH) {
        return true;
    }
    if (count2 + 1 === GRID_LENGTH && flag1) {
        console.log("return from diagonal2")
        return { i: pos, j: pos };
    } else if (count2 === GRID_LENGTH) {
        return true;
    }
}
function playRandom() {
    var i = getRandom(), j = getRandom();
    while (grid[i][j] !== 0) {
        i = getRandom(), j = getRandom();
    }
    console.log("return from random")
    return { i: i, j: j };
}
function getRandom() {
    return Math.floor(Math.random() * GRID_LENGTH);
}

function checkWinner(val) {
    if (checkRow(val) === true) {
        return checkRow(val)
    } else if (checkColumn(val) === true) {
        return checkColumn(val)
    } else if (checkDiagonal(val) === true) {
        return checkDiagonal(val);
    }
    return false;
}

initializeGrid();
renderMainGrid();
addClickHandlers();
