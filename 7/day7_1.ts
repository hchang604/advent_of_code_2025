import { readFile } from 'fs/promises';

async function readTextFile(): Promise<string[][]> {
  const content = await readFile('data.txt', 'utf8');

  const splitContent = content.split(/\r?\n/).map((line) => line.split(''));

  return splitContent;
}

async function solution() {
  const content = await readTextFile();

  let lineIndexes = [];
  let splitCount = 0;
  for (let i = 0; i < content.length; i++) {
    if (i === 0) {
      lineIndexes.push(content[i].indexOf('S'));
    } else {
      const newIndexMap = new Map<number, number[]>();

      for (let j = 0; j < lineIndexes.length; j++) {
        const currentIndex = lineIndexes[j];

        const currentVal = content[i][currentIndex];

        if (currentVal === '.') {
          content[i][currentIndex] = '|';
        } else if (currentVal === '^') {
          splitCount += 1;
          const rightIndex = currentIndex + 1;
          const leftIndex = currentIndex - 1;

          const newIndexArr = [];
          if (
            rightIndex >= 0 &&
            newIndexArr.findIndex((idx) => idx === rightIndex) === -1
          ) {
            newIndexArr.push(rightIndex);
            content[i][rightIndex] = '|';
          }
          if (
            leftIndex >= 0 &&
            newIndexArr.findIndex((idx) => idx === leftIndex) === -1
          ) {
            newIndexArr.push(leftIndex);
            content[i][leftIndex] = '|';
          }

          newIndexMap.set(currentIndex, newIndexArr);
        }
      }

      lineIndexes = lineIndexes.reduce((acc, currVal) => {
        const exists = newIndexMap.get(currVal);

        if (acc.find((v) => v === currVal) !== undefined) {
          return acc;
        }

        if (exists) {
          return [...acc, ...exists];
        } else {
          return [...acc, currVal];
        }
      }, []);
    }
  }

  console.log(splitCount);
}

solution();
