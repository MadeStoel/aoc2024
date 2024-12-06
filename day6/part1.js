import {readFileSync} from 'fs';

let lines = readFileSync('input.txt').toString('utf8').split('\r\n').filter(Boolean).map(line => line.split(''));
const directions = [[0, 1], [-1, 0], [0, -1], [1, 0]];
const gridSize = lines.length - 1;
let currentDirection = 2;
let currentCoords = findCurrentCoords();
const visitedCoords = [];

function findCurrentCoords() {
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
    const stringCoords = `${currentCoords[0]}-${currentCoords[1]}`;
    if(!visitedCoords.includes(stringCoords)) visitedCoords.push(stringCoords);

    currentCoords[0] += directions[currentDirection][0];
    currentCoords[1] += directions[currentDirection][1];
}

function rotate() {
    currentDirection = (currentDirection + 1) % 4;
}

while(insideGrid()) {
    if(nextPositionIsFull()) {
        rotate();
    } else {
        move();
    }
}

console.log(visitedCoords.length);
