import { readFile } from 'fs/promises';

async function readTextFile(): Promise<string[]> {
  const content = await readFile('data.txt', 'utf8');
  return content.split(",").map((data) => data.replace(/\r?\n/, ''));
}

function isRepeatNumber(num: number) {
    const length = num.toString().length;
    const isOdd = length % 2 !== 0;

    if(isOdd) {
        return false;
    }

    const firstHalf = num.toString().slice(0, length / 2);
    const secondHalf = num.toString().slice(length / 2);

    return firstHalf === secondHalf;
}

function getRange(range: string) {
    const [start, end] = range.split("-").map(Number);
    
    return [start, end]
}



async function solution() {
    const inputLines = await readTextFile();
    let repeatNumberCount = 0;

    inputLines.forEach((line) => {
        const [start, end] = getRange(line);
        
        for(let i = start; i <= end; i++) {
            if(isRepeatNumber(i)) {
                repeatNumberCount = repeatNumberCount + i;
            }
        }
    })

    console.log('Total repeat numbers:', repeatNumberCount);
}

solution()