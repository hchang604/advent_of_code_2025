import { readFile } from 'fs/promises';

async function readTextFile(): Promise<string[]> {
  const content = await readFile('data.txt', 'utf8');
  return content.split(/\r?\n/);
}

function parseInput(input: string[]) : { dir: string; val: number }[] {
  return input.map(line => {
    let value = Number(line.slice(1));

    while(value > 99) {
        value -= 100;
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

    let zeroCount = 0;
    let start = 50;
    const MAX = 99
    const MIN = 0;

    for (const input of inputs) {
        const val = start + (input.dir === "L" ? (-input.val) : (input.val));
        if (val > MAX) {
            start = val - MAX - 1;
        } else if (val < MIN) {
            start = MAX + val + 1;
        } else {
            start = val;
        }
        
        console.log(start);

        if(start === 0) {
            zeroCount++;
        }
    }

    console.log('zeroCount:', zeroCount);
}

solution()

