import {readFileSync} from "fs";

const lines = readFileSync("input.txt").toString("utf8").split("\r\n").filter(Boolean).map(line => line.split(""));

const processed = [];
const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
let lastResult = {
    crop: null,
    area: 0,
    perimeter: 0,
    seen: [],
};
const results = [];

function toCoordString(row, col) {
    return `${row}-${col}`;
}

function mapCrop(row, col) {
    processed.push(toCoordString(row, col));
    lastResult.seen.push([row, col]);
    lastResult.area++;

    for (let direction = 0; direction < directions.length; direction++) {
        const nextRow = row + directions[direction][0];
        const nextCol = col + directions[direction][1];

        if (nextRow < 0 || nextRow >= lines.length ||
            nextCol < 0 || nextCol > lines[0].length ||
            lines[nextRow][nextCol] !== lastResult.crop) {
            lastResult.perimeter++;
            continue;
        }

        if (!processed.includes(toCoordString(nextRow, nextCol))) mapCrop(nextRow, nextCol);
    }
}

function addSides() {
    let sides = 0;

    lastResult.seen.forEach(coords => {
        //outside corners
        [[[0, -1], [-1, 0]], [[-1, 0], [0, 1]], [[0, 1], [1, 0]], [[1, 0], [0, -1]]].forEach(cornerSet => {
            if (cornerSet.every(adjacent => lines[coords[0] + adjacent[0]] === undefined ||
                lines[coords[0] + adjacent[0]][coords[1] + adjacent[1]] !== lastResult.crop)) sides++;
        });

        // inside corners
        [[[-1, 0], [0, -1]], [[-1, 0], [0, 1]], [[0, 1], [1, 0]], [[1, 0], [0, -1]]].forEach(cornerSet => {
            const diagonal = [cornerSet[0][0] + cornerSet[1][0], cornerSet[0][1] + cornerSet[1][1]];

            if (cornerSet.every(adjacent => {
                const adjacentRow = lines[coords[0] + adjacent[0]];
                let cropToCheck;
                if (!!adjacentRow) {
                    cropToCheck = lines[coords[0] + adjacent[0]][coords[1] + adjacent[1]];
                }

                return adjacentRow !== undefined && cropToCheck === lastResult.crop;
            }) && (lines[coords[0] + diagonal[0]] === undefined || lines[coords[0] + diagonal[0]][coords[1] + diagonal[1]] !== lastResult.crop)) {
                sides++;
            }
        });

        // diagonal touching corner thingies
        [[[-1, 0], [0, -1]], [[-1, 0], [0, 1]], [[0, 1], [1, 0]], [[1, 0], [0, -1]]].forEach(cornerSet => {
            const diagonal = [cornerSet[0][0] + cornerSet[1][0], cornerSet[0][1] + cornerSet[1][1]];

            if (cornerSet.every(adjacent => {
                const adjacentRow = lines[coords[0] + adjacent[0]];
                let cropToCheck;
                if (!!adjacentRow) {
                    cropToCheck = lines[coords[0] + adjacent[0]][coords[1] + adjacent[1]];
                }

                return adjacentRow === undefined && cropToCheck !== lastResult.crop;
            }) && (lines[coords[0] + diagonal[0]] !== undefined && lines[coords[0] + diagonal[0]][coords[1] + diagonal[1]] === lastResult.crop)) {
                console.log([coords[0], coords[1]]);

                sides++;
            }
        });
    });


    lastResult.sides = sides;
}

for (let row = 0; row < lines.length; row++) {
    for (let col = 0; col < lines[0].length; col++) {
        if (!processed.includes(toCoordString(row, col))) {
            lastResult.crop = lines[row][col];

            mapCrop(row, col);
            addSides();

            results.push(lastResult);

            lastResult = {
                crop: null,
                area: 0,
                perimeter: 0,
                seen: []
            };
        }
    }
}

console.log(results.reduce((acc, val) => {
    return acc += val.area * val.sides;
}, 0));
