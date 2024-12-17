import {readFileSync} from "fs";

const games = readFileSync('input.txt').toString('utf8').split('\r\n\r\n').map(block => block.split('\r\n').filter(Boolean));
let answer = 0;

const offset = 10000000000000;

function getButtonAmount(game, index) {
    const chunks = game[index].split(' ');


    const x = +chunks[2].split('+')[1].substring(0, 2);
    const y = +chunks[3].split('+')[1].substring(0, 2);

    return [x, y];
}

function getPrizeAmount(game) {
    const chunks = game[2].split(' ');

    const x = +chunks[1].split('=')[1].split(',')[0] + offset;
    const y = +chunks[2].split('=')[1] + offset;

    return [x, y];
}

/**
 * K = amount of A button presses
 * L = amount of B button presses
 *
 * AxK + BxL = Px
 * AyK + ByL = Py
 *
 * ByAxK + ByBxL = PxBy <-- multiply by By
 * BxAyK + BxByL = PyBx <-- multiply by Bx
 *
 * ByAxK - BxAyK = PxBy - PyBx <-- subtract ByAxK + ByBxL by BxAyK + BxByL to equal PxBy - PyBx
 *
 * (ByAx - BxAy)K = pxBy - PyBx <-- group multipliers
 *
 * K = (PxBy - PyBx) / (ByAx - BxAy) <-- divide both sides by multipliers
 *
 * BxL = Px - AxK <-- move L to opposite side
 * L = (Px - AxK) / Bx <-- divide both sides by Bx
 */

games.forEach(game => {
    // 3 tokens
    const a = getButtonAmount(game, 0);
    // 1 token
    const b = getButtonAmount(game, 1);
    const p = getPrizeAmount(game);

    const aPresses = (p[0] * b[1] - p[1] * b[0]) / (b[1] * a[0] - b[0] * a[1]);
    const bPresses = (p[0] - a[0] * aPresses) / b[0];

    if(Math.floor(aPresses) === aPresses && Math.floor(bPresses) === bPresses) {
        answer += aPresses * 3 + bPresses;
    }
});

console.log(answer)
