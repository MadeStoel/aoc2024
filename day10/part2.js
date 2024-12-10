import {readFileSync} from "fs";

let lines = readFileSync('input.txt').toString('utf8').split('\r\n').filter(Boolean).map(line => line.split('').map(Number));

let answer = 0;

function findNextNode(row, col) {
    if (lines[row][col] === 9) return answer++;

    [[-1, 0], [0, 1], [1, 0], [0, -1]].forEach(([nextRow, nextCol]) => {
        try {
            if (lines[row + nextRow][col + nextCol] === lines[row][col] + 1) {
                findNextNode(row + nextRow, col + nextCol);
            }
        } catch (e) {
            // Ignore out of bounds positions.
        }
    });
}

for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
        if (lines[i][j] === 0) findNextNode(i, j);
    }
}

console.log(answer);
