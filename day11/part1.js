import {readFileSync} from "fs";

let numbers = readFileSync('input.txt').toString('utf8').trimEnd().split(' ').reduce((acc, val) => {
    if (!!acc[val]) acc[val]++;
    else acc[val] = 1;

    return acc;
}, {});

const blinks = 25;

function process(state) {
    const newState = {};

    Object.entries(state).forEach(([number, amount]) => {
        const numberLength = number.toString().length;

        if (number === '0') {
            newState['1'] = amount;
        } else if (numberLength % 2 === 0) {
            const firstHalf = +number.toString().substring(0, numberLength / 2);
            const secondHalf = +number.toString().substring(numberLength / 2)

            !!newState[firstHalf] ? newState[firstHalf] += amount : newState[firstHalf] = amount;
            !!newState[secondHalf] ? newState[secondHalf] += amount : newState[secondHalf] = amount;
        } else {
            const multiple = (+number * 2024).toString();
            !!newState[multiple] ? newState[multiple] += amount : newState[multiple] = amount;
        }
    });

    return newState;
}

for (let i = 0; i < blinks; i++) {
    numbers = process(numbers);
}

console.log(Object.values(numbers).reduce((acc, val) => acc += val, 0));
