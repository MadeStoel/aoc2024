import {readFileSync} from 'fs';

let [rules, updates] = readFileSync('input.txt').toString('utf8').split('\r\n\r\n').filter(Boolean);
rules = rulesToObject(rules);

updates = updates.split('\n').map(line => line.split(',').map(Number));

let answer = 0;

function containsAny(arr1, arr2) {
    return arr1.some(val => arr2.includes(val));
}

function rulesToObject(rules) {
    const result = {};

    rules.split('\n').map(rule => {
        const [key, value] = rule.split('|').map(Number);
        result.hasOwnProperty(key) ? result[key].push(value) : result[key] = [value];
    });

    return result;
}

updates.forEach(update => {
    const checked = [];
    let good = true;

    for (let i = 0; i < update.length; i++) {
        checked.push(update[i]);
        if (!rules[update[i]]) continue;

        if (containsAny(rules[update[i]], checked)) {
            good = false;
            break;
        }
    }

    if (good) answer += update[Math.floor(update.length / 2)];
});

console.log(answer);
