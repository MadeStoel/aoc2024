import {readFileSync} from 'fs';

const lines =  readFileSync('input.txt').toString('utf8').split('\r\n').filter(Boolean);

const pairs = lines.map(line => line.split('   ').map(Number));
const left = pairs.map(pair => pair[0]).sort((a,b) => a-b);
const right = pairs.map(pair => pair[1]).sort((a,b) => a-b);

const distances = left.map((num, i) => Math.abs(num - right[i]));

console.log(distances.reduce((a,b) => a + b, 0));
