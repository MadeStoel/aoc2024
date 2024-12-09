import {readFileSync} from "fs";

const line = readFileSync("input.txt").toString("utf8");

let fileIndex = 0;

let original = line.split('').reduce((acc, val, index) => {
    if (index % 2 === 0) {
        acc.push(...Array(+val).fill(fileIndex));
        fileIndex++;
    } else {
        acc.push(...Array(+val).fill('.'));
    }

    return acc;
}, []);

let compressed = original.toSpliced(0, 0);

for (let i = original.length - 1; i > 0; i--) {
    const char = compressed.pop();
    if (char === '.') continue;

    try {
        const firstEmptyIndex = compressed.indexOf('.');
        if (firstEmptyIndex === -1) {
            compressed.push(char);
            break;
        }

        compressed[firstEmptyIndex] = char;
    } catch (e) {
        break;
    }
}

console.log(compressed.reduce((acc, val, index) => {
    acc += val * index;
    return acc;
}, 0));
