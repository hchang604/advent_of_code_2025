import { readFile } from 'fs/promises';

async function readTextFile(): Promise<{
  numbers: string[][];
  operations: string[];
}> {
  const content = await readFile('data.txt', 'utf8');

  const splitContent = content.split(/\r?\n/);

  const operations = splitContent
    .pop()
    .split(' ')
    .filter((op) => op !== '');

  const numbers = splitContent.map((line) =>
    line.split(' ').filter((num) => num !== '')
  );

  return { numbers, operations };
}

function applyOperation(num1: number, num2: number, operation: string): number {
  switch (operation) {
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

async function solution() {
  const lines = await readTextFile();

  let sum = 0;

  for (let i = 0; i < lines.operations.length; i++) {
    const op = lines.operations[i];

    let firstNum = undefined;
    let opResult = undefined;
    for (let j = 0; j < lines.numbers.length; j++) {
      const num = lines.numbers[j][i];

      if (firstNum === undefined) {
        firstNum = Number(num);
        opResult = firstNum;
      } else {
        opResult = applyOperation(opResult, Number(num), op);
      }
    }
    sum += opResult;
  }

  console.log('sum - ', sum);
}

solution();
