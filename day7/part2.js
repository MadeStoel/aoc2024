import {readFileSync} from 'fs';

const lines = readFileSync('input.txt').toString('utf8').split('\r\n').filter(Boolean);
let answer = 0;
let solved = false;

function calculate(accumulator, numbers, target) {
    if (solved) return;

    if (numbers.length === 0) {
        if (accumulator === target) {
            answer += target;
            solved = true;
        }
        return;
    }

    const nextNumber = numbers[0];
    const remainingNumbers = numbers.toSpliced(0, 1)

    calculate(accumulator + nextNumber, remainingNumbers, target);
    calculate(accumulator * nextNumber, remainingNumbers, target);
    calculate(+`${accumulator.toString()}${nextNumber.toString()}`, remainingNumbers, target);
}

lines.forEach(line => {
    let [target, numbers] = line.split(': ');
    target = +target;
    numbers = numbers.split(' ').map(Number);

    calculate(numbers.splice(0, 1)[0], numbers, target);
    solved = false;
});

console.log(answer);
