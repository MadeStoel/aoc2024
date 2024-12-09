import {readFileSync} from "fs";

const line = readFileSync("input.txt").toString("utf8").trimEnd();

let fileIndex = 0;

const original = line.split('').reduce((acc, val, index) => {
    if (index % 2 === 0) {
        acc.push({
            value: fileIndex.toString(),
            amount: +val
        });
        fileIndex++;
    } else {
        acc.push({
            value: '.',
            amount: +val
        });
    }

    return acc;
}, []);

const compressed = JSON.parse(JSON.stringify(original));

for (let i = original.length - 1; i >= 0; i--) {
    if (original[i].value === '.') continue;

    const spaceIndex = compressed.findIndex(obj => obj.value === '.' && obj.amount >= original[i].amount);

    if (spaceIndex === -1) continue;

    compressed[spaceIndex].amount -= original[i].amount;

    compressed.splice(spaceIndex, 0, original[i]);
    compressed.findLast(obj => obj.value === original[i].value).value = '.';
}

const compressedArray = compressed.reduce((acc, obj) => {
    for (let i = 0; i < obj.amount; i++) {
        acc.push(obj.value);
    }

    return acc;
}, []);

console.log(compressedArray.reduce((acc, val, index) => {
    if (val === '.') return acc;

    return acc += +val * index;
}, 0));
