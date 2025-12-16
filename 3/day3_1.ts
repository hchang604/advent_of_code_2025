import { readFile } from 'fs/promises';

async function readTextFile(): Promise<string[]> {
  const content = await readFile('data.txt', 'utf8');
  return content.split(/\r?\n/)
}

function getLargestNumber(bank: string): number {
    const parsedBank: number[] = bank.split('').map(Number);

    let largestNumber = 0;

    for(let i = 0; i < bank.length; i++) {
        const firstNumber = parsedBank[i];
    
        for(let j = i + 1; j < bank.length; j++) {
            const secondNumber = parsedBank[j];

            const combinedNumber = Number(String(firstNumber) + String(secondNumber));

            if(combinedNumber > largestNumber) {
                largestNumber = combinedNumber;
            }
        }
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