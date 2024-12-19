import {readFileSync} from "fs";

const input = readFileSync('input.txt').toString();
let [maze, instructions] = input.split('\r\n\r\n');
let answer = 0;

maze = maze.split('\r\n').map(line => line.split('').map(char => {
    if (char === '#') return ['#', '#'];
    if (char === '.') return ['.', '.'];
    if (char === 'O') return ['[', ']'];
    if (char === '@') return ['@', '.'];
}).flat());

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
    maze.forEach((line, row) => {
        console.log(line.join(''));
    });

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

    //HORIZONTAL
    if (nextCol !== 0) {
        let boxCol = nextCol;

        while (['[', ']'].includes(maze[robot[0]][robot[1] + boxCol])) {
            boxCol += nextCol;
        }

        // Boxes are against a wall
        if (maze[robot[0]][robot[1] + boxCol] === '#') continue;

        // move to right
        if (boxCol > 0) {
            maze[robot[0]].splice(robot[1] + boxCol, 1);
            maze[robot[0]].splice(robot[1], 0, '.');

            // move to left
        } else {
            maze[robot[0]].splice(robot[1] + 1, 0, '.');
            maze[robot[0]].splice(robot[1] + boxCol, 1);
        }

        robot[0] += nextRow;
        robot[1] += nextCol;

        // VERTICAL
    } else {
        let boxRow = nextRow;

        while (['[', ']'].includes(maze[robot[0]][robot[1] + boxRow])) {
            boxRow += nextRow;
        }

        // Boxes are against a wall
        if (maze[robot[0]][robot[1] + boxRow] === '#') continue;

        console.log('up against box', robot);
    }
}

maze.forEach((line, row) => {
    line.forEach((char, col) => {
        if (char === '[') {
            answer += row * 100 + col;
        }
    });
});

maze.forEach((line, row) => {
    console.log(line.join(''));
});

console.log(answer);
