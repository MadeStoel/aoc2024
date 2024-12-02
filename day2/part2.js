import {readFileSync} from 'fs';

const lines = readFileSync('input.txt').toString('utf8').split('\r\n').filter(Boolean);

let safe = 0;

function isSafe(nums) {
    const increasing = nums.every((num, i) =>{
        if(i === 0) return true;
        return num >  nums[i - 1];
    });

    const decreasing = nums.every((num, i) =>{
        if(i === 0) return true;
        return num < nums[i - 1];
    });

    if(!increasing && !decreasing) return false;

    return nums.every((num, i) => {
        const prevNum = i === 0 ? num + 1 : nums[i - 1];

        return Math.abs(num - prevNum) >= 1 && Math.abs(num - prevNum) <= 3;
    });
}

lines.forEach(line => {
    const nums = line.split(' ').map(Number);

    if(!isSafe(nums)) {
        for(let i = 0; i < nums.length; i++) {
            if(isSafe(nums.toSpliced(i,1))) {
                safe++;
                break;
            }
        }
    } else {
        safe++;
    }
});

console.log(safe);
