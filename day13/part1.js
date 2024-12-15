import {readFileSync} from "fs";

const games = readFileSync('input.txt').toString('utf8').split('\r\n\r\n').map(block => block.split('\r\n').filter(Boolean));
let answer = 0;

function getButtonAmount(game, index) {
    const chunks = game[index].split(' ');


    const x = +chunks[2].split('+')[1].substring(0, 2);
    const y = +chunks[3].split('+')[1].substring(0, 2);

    return [x, y];
}

function getPrizeAmount(game) {
    const chunks = game[2].split(' ');

    const x = +chunks[1].split('=')[1].split(',')[0];
    const y = +chunks[2].split('=')[1];

    return [x,y];
}

games.forEach(game => {
    // 3 tokens
    const a = getButtonAmount(game, 0);
    // 1 token
    const b = getButtonAmount(game, 1);
    const prize = getPrizeAmount(game);

    const maxA = Math.floor(prize[0] / a[0]);
    const possibilities = [];

    for (let aTimes = maxA; aTimes >= 0 ; aTimes--) {
        const remainder = prize[0] - a[0] * aTimes;

        const bTimes = remainder / b[0];

        if(Math.floor(bTimes) !== bTimes ) continue;

        if(a[1] * aTimes + b[1] * bTimes === prize[1] && aTimes <= 100 && bTimes <= 100) possibilities.push(aTimes * 3 + bTimes);
    }

    if(possibilities.length !== 0) {
        possibilities.sort((a,b) => a-b);
        answer += possibilities[0];
    }
});

console.log(answer)
