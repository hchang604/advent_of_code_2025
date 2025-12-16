import { readFile } from 'fs/promises';


let zeroCount = 0;

async function readTextFile(): Promise<string[]> {
  const content = await readFile('data.txt', 'utf8');
  return content.split(/\r?\n/);
}

function parseInput(input: string[]) : { dir: string; val: number }[] {
  return input.map(line => {
    let value = Number(line.slice(1));

    while(value > 99) {
        value -= 100;
        zeroCount++;
    }
    
    return {
        dir: line.slice(0, 1),
        val: value
    }
  });
}

async function solution() {
    const inputLines = await readTextFile();
    const inputs = parseInput(inputLines);

    let start = 50;
    const MAX = 99
    const MIN = 0;

    for (const input of inputs) {
        const val = start + (input.dir === "L" ? (-input.val) : (input.val));

        if (val > MAX) {
            if(start !== 0) {
                zeroCount++;
            }
            start = val - MAX - 1;
        } else if (val < MIN) {
            if(start !== 0) {
                zeroCount++;
            }
            start = MAX + val + 1;
        } else {
            start = val;
                
            if(start === 0) {
                zeroCount++;
            }
        }
    }

    console.log('zeroCount:', zeroCount);
}

solution()

