import { readFile } from 'fs/promises';

async function readTextFile(): Promise<string[]> {
  const content = await readFile('data.txt', 'utf8');
  return content.split(",").map((data) => data.replace(/\r?\n/, ''));
}

function getRange(range: string) {
    const [start, end] = range.split("-").map(Number);
    
    return [start, end]
}

function getDivisors(n: number): number[] {
  const divisors: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) {
      divisors.push(i);
    }
  }
  return divisors;
}

function chunkString(str: string, size: number): string[] {
  const chunks: string[] = [];
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.slice(i, i + size));
  }
  return chunks;
}

function isRepeatNumber(num: number, divisor: number) {
    const chunks = chunkString(num.toString(), divisor);

    if(chunks.length < 2) {
        return false;
    }

    for(let i = 1; i < chunks.length; i++) {
        if(chunks[i] !== chunks[0]) {
            return false;
        }
    }
    return true;
}

async function solution() {
    const inputLines = await readTextFile();
    let repeatNumberCount = 0;

    inputLines.forEach((line) => {
        const [start, end] = getRange(line);
        
        for(let i = start; i <= end; i++) {
            const divisors = getDivisors(i.toString().length);

            const isInvalid = divisors.some((divisor) => {
               if(isRepeatNumber(i, divisor)) {
                
                return true;
               }
            })

            if(isInvalid) {
                repeatNumberCount = repeatNumberCount + i;
            }
        }
    })

    console.log('Total repeat numbers:', repeatNumberCount);
}

solution()