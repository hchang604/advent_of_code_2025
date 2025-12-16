import { readFile } from 'fs/promises';

function isOperation(char: string): boolean {
  return ['+', '-', '*', '/'].includes(char);
}

async function readTextFile(): Promise<{
  numbers: string[][];
  operations: string[];
}> {
  const content = await readFile('data.txt', 'utf8');

  const splitContent = content.split(/\r?\n/);

  const operations = splitContent
    .pop()
    .split('')
    .reduce((acc, currVal) => {
      if (currVal === ' ') {
        acc[acc.length - 1] += ' ';
      } else if (isOperation(currVal)) {
        acc.push(currVal);
      }

      return acc;
    }, []);

  const numbersRaw = splitContent.map((line) => line.split(''));

  const numbers: string[][] = [];

  for (let i = 0; i < operations.length; i++) {
    const opLength = operations[i].length;

    numbersRaw.forEach((line) => {
      const numSegment = line.splice(0, opLength).reduce((acc, currVal) => {
        let finalStr = acc + currVal;

        return finalStr;
      }, '');

      if (!numbers[i]) {
        numbers[i] = [];
      }

      if (i !== operations.length - 1) {
        const newStr = numSegment.slice(-1) + numSegment.slice(0, -1);

        numbers[i].push(newStr);
      } else {
        numbers[i].push(numSegment);
      }
    });
  }

  return { numbers, operations };
}

function applyOperation(num1: number, num2: number, operation: string): number {
  switch (operation.trim()) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}

function getVerticalNumbers(numbers: string[]): string[] {
  const verticalNumbers: string[] = [];
  while (numbers.some((numbers) => numbers.length > 0)) {
    let num = '';
    for (let i = 0; i < numbers.length; i++) {
      num += numbers[i].slice(-1);
      numbers[i] = numbers[i].slice(0, -1);
    }

    if (num.trim() !== '') {
      verticalNumbers.push(num.trim());
    }
  }

  return verticalNumbers;
}

async function solution() {
  const lines = await readTextFile();

  let sum = 0;
  for (let i = 0; i < lines.numbers.length; i++) {
    const op = lines.operations[i].trim();
    const vertNum = getVerticalNumbers(lines.numbers[i]);

    const opTotal = vertNum.reduce(
      (acc, currVal) => {
        return applyOperation(acc, Number(currVal), op);
      },
      op === '+' || op === '-' ? 0 : 1
    );

    sum += opTotal;
  }

  console.log(sum);
}

solution();
