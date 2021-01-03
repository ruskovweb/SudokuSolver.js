const n = null;
const sudoku = [
    [n, n, n, 5, n, n, 3, n, 9],
    [n, 3, n, 6, 1, n, n, n, n],
    [n, n, n, 8, n, 2, n, 1, n],
    [1, n, n, n, n, 7, 6, n, 2],
    [n, n, 7, 9, n, 3, 8, n, n],
    [4, n, 3, 1, n, n, n, n, 5],
    [n, 5, n, 7, n, 8, n, n, n],
    [n, n, n, n, 9, 1, n, 6, n],
    [3, n, 6, n, n, 5, n, n, n]
];

const matrix = JSON.parse(JSON.stringify(sudoku));
solve(0, 0);

function solve(row, col) {
    if (row === matrix.length) {
        return;
    }

    if (sudoku[row][col] === null) {
        const temp = matrix[row][col];
        for (let value = 1; value <= matrix.length; value++) {
            const result = performAllChecks(row, col, value);
            if (result) {
                matrix[row][col] = value;
                moveNext(row, col);
                matrix[row][col] = temp;
            }
        }
    } else {
        moveNext(row, col);
    }   
}

function moveNext(row, col) {
    if (col < matrix.length - 1) {
        solve(row, col + 1, 1);
    } else if (row < matrix.length) {
        solve(row + 1, 0, 1);
    }
}

function performAllChecks() {
    return checkRow(...arguments) && 
           checkCol(...arguments) && 
           checkSquare(...arguments);
}

function checkRow(row, col, value) {
    for (let i = 0; i < matrix.length; i ++) {
        if (i !== col && matrix[row][i] === value) {
            return false;
        }
    }

    return true;
}

function checkCol(row, col, value) {
    for (let i = 0; i < matrix.length; i++) {
        if (i !== row && matrix[i][col] === value) {
            return false;
        }
    }

    return true;
}

function checkSquare(row, col, value) {
    const quadrantLength = Math.floor(matrix.length / 3)
    const quadrantRow = Math.floor(row / quadrantLength) * quadrantLength;
    const quadrantCol = Math.floor(col / quadrantLength) * quadrantLength;

    for (let sRow = 0; sRow < 3; sRow++) {
        const currentRow = quadrantRow + sRow;
        for (let sCol = 0; sCol < 3; sCol++) {
            const currentCol = quadrantCol + sCol;
            if (currentRow !== row && currentCol !== col && 
                matrix[currentRow][currentCol] === value) {
                return false;
            }
        }
    }

    return true;
}