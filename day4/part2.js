import {readFileSync} from 'fs';

const lines = readFileSync('input.txt').toString('utf8').split('\r\n').filter(Boolean);
let answer = 0;

for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
        const words = ['MAS', 'SAM'];
        let str1 = '';
        let str2 = '';

        // down-right
        for(let k = 0; k < 3; k++) {
            try {
                str1 += lines[i + k][j + k];
            } catch(e) {}
        }

        // up-right-offset
        for(let k = 0; k < 3; k++) {
            try {
                str2 += lines[i + 2 - k][j + k];
            } catch(e) {}
        }

        if(words.includes(str1) && words.includes(str2)) answer++;
    }
}

console.log(answer);
