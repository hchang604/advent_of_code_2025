import { readFile } from 'fs/promises';

async function readTextFile(): Promise<string[]> {
  const content = await readFile('data.txt', 'utf8');
  return content.split(/\r?\n/)
}

function getLargestNumber(bank: string): number {
    const parsedBank: number[] = bank.split('').map(Number);

    const twelveDigits = parsedBank.slice(-12)
    const twelveDigitsSum = twelveDigits.reduce((acc, n) => Number(String(acc) + String(n)) , 0);
    const selectedIndexes: number[] = [];

    let largestNumber = twelveDigitsSum;

    let jTracker = 0;
    let twelveIndexTracker = 0;
    let tieFound = false;
    let tieIndex = -1;

    for (let i = Math.max(0, parsedBank.length - 12); i < parsedBank.length; i++) {
        let updated = false;
        for(let j = jTracker; j < i; j++) {
            const newTwelveDigits = [...twelveDigits]
            newTwelveDigits[twelveIndexTracker] =  parsedBank[j]
            const newTwelveDigitsSum = newTwelveDigits.reduce((acc, n) => Number(String(acc) + String(n)) , 0);

            if(newTwelveDigitsSum > largestNumber) {
                updated = true;
                twelveDigits[twelveIndexTracker] = parsedBank[j];
                selectedIndexes.push(j);
                jTracker = j + 1;
                
                largestNumber = twelveDigits.reduce((acc, n) => Number(String(acc) + String(n)) , 0);
            }

            if(newTwelveDigitsSum === largestNumber) {
                tieFound = true;
                if(tieIndex === -1) {
                    tieIndex = j
                }
            }
        }

        if(!updated) {
            if(tieFound) {
                tieFound = false;
                twelveDigits[twelveIndexTracker] = parsedBank[tieIndex];
                jTracker = tieIndex + 1;
                tieIndex = -1;

                largestNumber = twelveDigits.reduce((acc, n) => Number(String(acc) + String(n)) , 0);
            } else {
                break;
            }
        } else {
            tieFound = false;
            tieIndex = -1;
        }
        twelveIndexTracker++
    }

    return largestNumber
}

async function solution() {
    const banks = await readTextFile();
    let sum = 0;

    for(let i = 0; i < banks.length; i++) {
        const largestVoltageResult = getLargestNumber(banks[i]);
        sum = sum + largestVoltageResult;
    }

    console.log(sum)
}

solution()