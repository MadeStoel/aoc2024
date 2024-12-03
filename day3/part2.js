import {readFileSync} from 'fs';

const lines = readFileSync('input.txt').toString('utf8').split('\r\n').filter(Boolean);
let answer = 0;
const regex = /mul\((-?\d+),(-?\d+)\)/g;

const mul = (x, y) => x * y;

function getSplicePairs(doIndexes, dontIndexes) {
    const result = [];
    for(let i = 0; i < doIndexes.length;) {
        const firstDontIndex = dontIndexes.findIndex(dont => dont >= doIndexes[i]);

        result.push([doIndexes[i], dontIndexes[firstDontIndex]]);

        i = doIndexes.findIndex(doIndex => doIndex > dontIndexes[firstDontIndex]);

        if(i === -1) break;
    }

    return result;
}

lines.forEach(line => {
    const dontIndexes = [...line.matchAll(/don't\(\)/g)].map(occ => occ.index);
    const doIndexes = [...line.matchAll(/do\(\)/g)].map(occ => occ.index);
    const splicePairs = getSplicePairs([0,  ...doIndexes], dontIndexes);

    let filteredLine = '';

    splicePairs.forEach(splicePair => {
        filteredLine += line.substring(splicePair[0], splicePair[1]);
    });

    const muls = filteredLine.match(regex);
    muls.forEach(mulString => answer += eval(mulString));
});

console.log(answer);
