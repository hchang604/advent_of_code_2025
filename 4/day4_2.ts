import { readFile } from 'fs/promises';

async function readTextFile(): Promise<string[][]> {
  const content = await readFile('data.txt', 'utf8');

  const splitByNewLine = content.split(/\r?\n/);

  return splitByNewLine.map(line => line.split(''));
}

async function solution() {
    const rolls = await readTextFile();
    
    let rollsRemoved = true;
    let rollsRemovedCount = 0;

    while(rollsRemoved) {
        rollsRemoved = false;

        for(let i = 0; i < rolls.length; i++) {
            for(let j = 0; j < rolls[i].length; j++) {
                if(rolls[i][j] === "@") {
                    let adjacentRolls = 0;

                    const top = rolls[i-1]?.[j];
                    const topRight = rolls[i-1]?.[j+1];
                    const topLeft = rolls[i-1]?.[j-1];
                    const bottom = rolls[i+1]?.[j];
                    const bottomRight = rolls[i+1]?.[j+1];
                    const bottomLeft = rolls[i+1]?.[j-1];
                    const left = rolls[i][j-1];
                    const right = rolls[i][j+1];

                    const sides = [top, bottom, left, right, topRight, topLeft, bottomRight, bottomLeft];

                    for(const side of sides) {
                        if(side === "@") {
                            adjacentRolls++;
                        }
                    }

                    if(adjacentRolls < 4) {
                        rollsRemovedCount++;
                        rollsRemoved = true;
                        rolls[i][j] = "."
                    }
                }
            }
        }
    }
    
    console.log(rollsRemovedCount)
}

solution();