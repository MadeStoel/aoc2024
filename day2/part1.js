import {readFileSync} from 'fs';

const lines = readFileSync('input.txt').toString('utf8').split('\r\n').filter(Boolean);

let safe = 0;

function inOrder(nums, operator) {
    return nums.every((num, i) => {
        if (i === 0) return true;

        return eval(num + operator + nums[i - 1]);
    });
}

function isSafe(nums) {
    const increasing = inOrder(nums, '>');
    const decreasing = inOrder(nums, '<');

    if (!increasing && !decreasing) return false;

    return nums.every((num, i) => {
        const prevNum = i === 0 ? num + 1 : nums[i - 1];

        return Math.abs(num - prevNum) >= 1 && Math.abs(num - prevNum) <= 3;
    });
}

lines.forEach(line => {
    const nums = line.split(' ').map(Number);

    if (isSafe(nums)) safe++;
});

console.log(safe);
