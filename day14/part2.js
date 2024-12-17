import {readFileSync, writeFileSync} from "fs";

const lines = readFileSync('input.txt').toString().split('\r\n').filter(Boolean);

const width = 101;
const height = 103;

let robots = [];

lines.forEach(line => {
    let [p, v] = line.split(' ');
    p = [+p.split('=')[1].split(',')[0], +p.split('=')[1].split(',')[1]];
    v = [+v.split('=')[1].split(',')[0], +v.split('=')[1].split(',')[1]];
    robots.push([p, v]);
});

let whileIteration = 0;

while(robots.reduce((acc, val) => acc.add(`${val[0][0]}-${val[0][1]}`), new Set()).size !== robots.length) {
    robots.forEach(robot => {
        robot[0][0] += robot[1][0];

        if (robot[0][0] < 0) robot[0][0] = width + robot[0][0];
        if (robot[0][0] >= width) robot[0][0] = robot[0][0] % width;

        robot[0][1] += robot[1][1];

        if (robot[0][1] < 0) robot[0][1] = height + robot[0][1];
        if (robot[0][1] >= height) robot[0][1] = robot[0][1] % height;
    });

    whileIteration++;
}

const output = Array(width * height).fill('.');

robots.forEach((robot, i) => {
    const [x, y] = robot[0];

    output[y * width + x] = '#';
});

writeFileSync(`result.txt`, output.reduce((acc, val, i) => {
    if (i % (width) === 0 && i !== 0) acc += '\r\n';
    acc += val;
    return acc
}, ''));

console.log(whileIteration);
