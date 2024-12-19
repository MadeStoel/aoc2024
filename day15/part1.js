import {readFileSync} from "fs";

const input = readFileSync('input.txt').toString();
let [maze, instructions] = input.split('\r\n\r\n');
let answer = 0;


maze = maze.split('\r\n').map(line => line.split(''));
instructions = instructions.replaceAll('\r\n', '').split('').map(instruction => {
    switch (instruction) {
        case '^':
            return [-1, 0];
        case '>' :
            return [0, 1];
        case 'v':
            return [1, 0];
        case '<':
            return [0, -1];
    }
});

let robot;

maze.forEach((line, row) => {
    line.forEach((char, col) => {
        if (char === '@') {
            robot = [row, col];
        }
    });
})

for (let i = 0; i < instructions.length; i++) {
    const [nextRow, nextCol] = instructions[i];

    // Check for wall
    if (maze[robot[0] + nextRow][robot[1] + nextCol] === '#') continue;

    // Check for empty space
    if (maze[robot[0] + nextRow][robot[1] + nextCol] === '.') {
        maze[robot[0] + nextRow][robot[1] + nextCol] = '@';
        maze[robot[0]][robot[1]] = '.';
        robot[0] += nextRow;
        robot[1] += nextCol;

        continue;
    }

    let boxRow = nextRow;
    let boxCol = nextCol;

    while (maze[robot[0] + boxRow][robot[1] + boxCol] === 'O') {
        boxRow += nextRow;
        boxCol += nextCol;
    }

    // Boxes are against a wall
    if (maze[robot[0] + boxRow][robot[1] + boxCol] === '#') continue;

    // Boxes can move
    maze[robot[0] + boxRow][robot[1] + boxCol] = 'O';
    maze[robot[0] + nextRow][robot[1] + nextCol] = '@';
    maze[robot[0]][robot[1]] = '.';

    robot[0] += nextRow;
    robot[1] += nextCol;
}

maze.forEach((line, row) => {
    line.forEach((char, col) => {
       if(char === 'O') {
           answer += row * 100 + col;
       }
    });
})


console.log(answer);
