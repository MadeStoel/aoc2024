import {readFileSync} from "fs";

let lines = readFileSync('input.txt').toString('utf8').split('\r\n').filter(Boolean).map(line => line.split('').map(Number));

const found = {};

function findNextNode(row, col, start) {
    if (lines[row][col] === 9) return found[start].add(`${row}-${col}`);

    [[-1, 0], [0, 1], [1, 0], [0, -1]].forEach(([nextRow, nextCol]) => {
        try {
            if (lines[row + nextRow][col + nextCol] === lines[row][col] + 1) {
                findNextNode(row + nextRow, col + nextCol, start);
            }
        } catch (e) {
            // Ignore out of bounds positions.
        }
    });
}

for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
        if (lines[i][j] === 0) {
            found[`${i}-${j}`] = new Set();

            findNextNode(i, j, `${i}-${j}`);
        }
    }
}

console.log(Object.values(found).reduce((acc, val) => acc += val.size, 0));
