import {readFileSync} from 'fs';

let lines = readFileSync('input.txt').toString('utf8').split('\r\n').filter(Boolean).map(line => line.split(''));
const directions = [[0, 1], [-1, 0], [0, -1], [1, 0]];
const gridSize = lines.length - 1;
let currentDirection = 2;
let currentCoords = findStartingCoords();
let answer = 0;
let visitedCoords = [];

function findStartingCoords() {
    for (let y = 0; y < lines.length; y++) {
        const x = lines[y].findIndex(position => position === '^');

        if (x !== -1) {
            return [x, y];
        }
    }
}

function insideGrid() {
    return currentCoords[0] >= 0 && currentCoords[0] <= gridSize &&
        currentCoords[1] >= 0 && currentCoords[1] <= gridSize;
}

function nextPositionIsFull() {
    try {
        return lines[currentCoords[1] + directions[currentDirection][1]][currentCoords[0] + directions[currentDirection][0]] === '#';
    } catch(e) {
        return false;
    }
}

function move() {
    const stringCoords = `${currentCoords[0]}-${currentCoords[1]}-${currentDirection}`;
    if(visitedCoords.includes(stringCoords)) return true;

    visitedCoords.push(stringCoords);
    currentCoords[0] += directions[currentDirection][0];
    currentCoords[1] += directions[currentDirection][1];

    return false;
}

function rotate() {
    currentDirection = (currentDirection + 1) % 4;
}

// Better make a cup of coffee, this is gonna take a while...
for (let i = 0; i <= gridSize; i++) {
    console.log(`${i} of ${gridSize}`);

    for (let j = 0; j <= gridSize; j++) {
        if(lines[i][j] === '#' || lines[i][j] === '^') continue;
        lines[i][j] = '#';

        let inLoop = false;

        while(insideGrid() && !inLoop) {
            if(nextPositionIsFull()) {
                rotate();
            } else {
                inLoop = move();
            }
        }

        if(inLoop) answer++;

        lines[i][j] = '.';
        currentCoords = findStartingCoords();
        currentDirection = 2;
        visitedCoords = [];
    }
}

console.log(answer);
