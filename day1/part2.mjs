import {readFileSync} from 'fs';

const lines =  readFileSync('input.txt').toString('utf8').split('\r\n').filter(Boolean);

const pairs = lines.map(line => line.split('   ').map(Number));
const left = pairs.map(pair => pair[0]);
const right = pairs.map(pair => pair[1]);

const distances = left.map(num => {
    const amount = right.filter(num2 => num === num2).length;

    return num * amount;
});

console.log(distances.reduce((a,b) => a + b, 0));
