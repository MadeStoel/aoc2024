import {readFileSync} from 'fs';

const lines = readFileSync('input.txt').toString('utf8').split('\r\n').filter(Boolean);
let answer = 0;
const regex = /mul\((-?\d+),(-?\d+)\)/g;

const mul = (x,y) => x*y;

lines.forEach(line => {
    const muls = line.match(regex);
    muls.forEach(mulString => answer += eval(mulString));
});

console.log(answer);
