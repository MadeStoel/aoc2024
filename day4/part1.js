import {readFileSync} from 'fs';

const lines = readFileSync('input.txt').toString('utf8').split('\r\n').filter(Boolean);
let answer = 0;

function search(i,j, hor, ver) {
    let substr = '';
    for(let k = 0; k < 4; k++) {
        try {
            substr += lines[i + k * ver][j + k * hor];
        } catch(e) {}
    }
    if(substr === 'XMAS') answer++;
}

for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
        //right
        search(i,j,1,0);
        //left
        search(i,j,-1,0);
        //down
        search(i,j,0,1);
        //up
        search(i,j,0,-1);
        // up-right
        search(i,j,1,-1);
        // down-right
        search(i,j,1,1);
        // down-left
        search(i,j,-1,1);
        // up-left
        search(i,j,-1,-1);
    }
}

console.log(answer);
