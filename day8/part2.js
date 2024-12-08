import { readFileSync } from "fs";

const lines    = readFileSync("input.txt").toString("utf8").split("\n").filter(Boolean);
let answer     = new Set();
const gridSize = lines.length;

const antennas = [];
let antennaTypes;

function setAntennasAndTypes() {
    const types = new Set();

    lines.forEach((line, y) => {
        line.split("").forEach((char, x) => {
            if ( char !== "." ) {
                types.add(char);

                antennas.push({
                    type: char,
                    x,
                    y
                });
            }

        });
    });

    antennaTypes = Array.from(types);
}

setAntennasAndTypes();

antennaTypes.forEach(antennaType => {
    const typedAntennas = antennas.filter(antenna => antenna.type === antennaType);

    typedAntennas.forEach((typedAntenna, i) => {
        answer.add(`${typedAntenna.x}-${typedAntenna.y}`)

        for ( let j = i + 1; j < typedAntennas.length; j++ ) {
            const antis = [];

            const xDiff = typedAntenna.x - typedAntennas[ j ].x;
            const yDiff = typedAntenna.y - typedAntennas[ j ].y;

            let xLoc = typedAntenna.x + xDiff;
            let yLoc = typedAntenna.y + yDiff;

            while ( xLoc >= 0 && xLoc < gridSize && yLoc >= 0 && yLoc < gridSize ) {
                antis.push([xLoc, yLoc]);

                xLoc += xDiff;
                yLoc += yDiff;
            }

            xLoc = typedAntennas[ j ].x - xDiff;
            yLoc = typedAntennas[ j ].y - yDiff;

            while ( xLoc >= 0 && xLoc < gridSize && yLoc >= 0 && yLoc < gridSize ) {
                antis.push([xLoc, yLoc]);

                xLoc -= xDiff;
                yLoc -= yDiff;
            }

            antis.forEach(anti => answer.add(`${ anti[ 0 ] }-${ anti[ 1 ] }`));
        }
    });
});

console.log(answer.size);
