import { readFileSync } from "fs";

const lines = readFileSync("input.txt").toString("utf8").split("\n").filter(Boolean).map(line => line.split(""));

const processed  = [];
const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
let lastResult   = {
    crop: null,
    area: 0,
    perimeter: 0
};
const results    = [];

function toCoordString(row, col) {
    return `${ row }-${ col }`;
}

function mapCrop(row, col) {
    processed.push(toCoordString(row, col));
    lastResult.area++;

    for ( let direction = 0; direction < directions.length; direction++ ) {
        const nextRow = row + directions[ direction ][ 0 ];
        const nextCol = col + directions[ direction ][ 1 ];

        if ( nextRow < 0 || nextRow >= lines.length ||
            nextCol < 0 || nextCol > lines[ 0 ].length ||
            lines[ nextRow ][ nextCol ] !== lastResult.crop ) {
            lastResult.perimeter++;
            continue;
        }

        if ( !processed.includes(toCoordString(nextRow, nextCol)) ) mapCrop(nextRow, nextCol);
    }
}

function addSides(row, col, crop) {
    let currentDirection = 1; //right
    let sides            = 1;
    let nextRow          = directions[ currentDirection ][ 0 ];
    let nextCol          = directions[ currentDirection ][ 1 ];

    while ( row !== nextRow && col !== nextCol ) {
        const directionToCheck = currentDirection - 1 === -1 ? 3 : currentDirection - 1;

        if ( lines[ nextRow + directionToCheck[ 0 ] ][ nextCol + directionToCheck[ 1 ] ] === crop ) {
            row = nextRow;
            col = nextCol;
        }
        else {
            currentDirection++;
            nextRow = directions[ currentDirection ][ 0 ];
            nextCol = directions[ currentDirection ][ 1 ];
        }
    }


}

for ( let row = 0; row < lines.length; row++ ) {
    for ( let col = 0; col < lines[ 0 ].length; col++ ) {
        if ( !processed.includes(toCoordString(row, col)) ) {
            lastResult.crop = lines[ row ][ col ];

            mapCrop(row, col);
            addSides(row, col, lastResult.crop);

            results.push(lastResult);

            lastResult = {
                crop: null,
                area: 0,
                perimeter: 0
            };
        }
    }
}

console.log(results.reduce((acc, val) => {
    return acc += val.area * val.perimeter;
}, 0));
