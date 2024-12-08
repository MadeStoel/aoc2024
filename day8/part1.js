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
        for ( let j = i + 1; j < typedAntennas.length; j++ ) {
            const antis = [];

            const xDiff = typedAntenna.x - typedAntennas[ j ].x;
            const yDiff = typedAntenna.y - typedAntennas[ j ].y;

            if ( typedAntenna.x + xDiff >= 0 && typedAntenna.x + xDiff < gridSize &&
                typedAntenna.y + yDiff >= 0 && typedAntenna.y + yDiff < gridSize ) {
                antis.push([typedAntenna.x + xDiff, typedAntenna.y + yDiff]);
            }

            if ( typedAntennas[ j ].x - xDiff >= 0 && typedAntennas[ j ].x - xDiff < gridSize &&
                typedAntennas[ j ].y - yDiff >= 0 && typedAntennas[ j ].y - yDiff < gridSize ) {
                antis.push([typedAntennas[ j ].x - xDiff, typedAntennas[ j ].y - yDiff]);
            }

            antis.forEach(anti => answer.add(`${anti[0]}-${anti[1]}`))
        }
    });
});

console.log(answer.size);
