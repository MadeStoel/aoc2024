import {readFileSync} from "fs";

const lines = readFileSync('input.txt').toString().split('\r\n').filter(Boolean);

const width = 101;
const height = 103;

const iterations = 100;
const robots = [];

lines.forEach(line => {
    let [p, v] = line.split(' ');
    p = [+p.split('=')[1].split(',')[0], +p.split('=')[1].split(',')[1]];
    v = [+v.split('=')[1].split(',')[0], +v.split('=')[1].split(',')[1]];

    for (let i = 0; i < iterations; i++) {
        p[0] += v[0];

        if (p[0] < 0) p[0] = width + p[0];
        if (p[0] >= width) p[0] = p[0] % width;

        p[1] += v[1];

        if (p[1] < 0) p[1] = height + p[1];
        if (p[1] >= height) p[1] = p[1] % height;
    }

    robots.push(p);
});

const quadrants = [
    [[0, 0], [Math.floor(width / 2) - 1, Math.floor(height / 2) - 1]],
    [[Math.ceil(width / 2), 0], [width - 1, Math.floor(height / 2) - 1]],
    [[0, Math.ceil(height / 2)], [Math.floor(width / 2) - 1, height - 1]],
    [[Math.ceil(width / 2), Math.ceil(height / 2)], [width - 1, height - 1]],
]

const answer = quadrants.reduce((total, quadrant) => {
    const robotsInQuadrant = robots.filter(robot => robot[0] >= quadrant[0][0] && robot[0] <= quadrant[1][0] && robot[1] >= quadrant[0][1] && robot[1] <= quadrant[1][1]);

    if(total === 0) total += robotsInQuadrant.length;
    else total *= robotsInQuadrant.length;

    return total;
}, 0);


console.log(answer);
