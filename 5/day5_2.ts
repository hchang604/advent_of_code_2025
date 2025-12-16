import { readFile } from 'fs/promises';

async function readTextFile(): Promise<{ idRanges: string[]; ids: string[] }> {
  const content = await readFile('data.txt', 'utf8');

  const splitContent = content.split(/\r?\n/);

  const blankLineIndex = splitContent.indexOf('');

  const idRanges = splitContent.slice(0, blankLineIndex);
  const ids = splitContent.slice(blankLineIndex + 1);

  return { idRanges, ids };
}

function getIds(
  ranges: Array<string | undefined>,
  currentRange: string,
  count: number
) {
  let newCount = count;
  let largestRange = currentRange;
  let largestRangeValue = 0;

  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];

    if (range) {
      const min = range.split('-')[0];
      const max = range.split('-')[1];

      const value = Number(max) - Number(min) + 1;

      if (largestRangeValue < value) {
        largestRangeValue = value;
        largestRange = range;
      }
    }
  }

  newCount = newCount + largestRangeValue;

  for (let i = 0; i < ranges.length; i++) {
    const range = ranges[i];

    if (range !== undefined && range !== largestRange) {
      const largestRangeMin = Number(largestRange.split('-')[0]);
      const largestRangeMax = Number(largestRange.split('-')[1]);

      const min = Number(range.split('-')[0]);
      const max = Number(range.split('-')[1]);

      if (
        min < largestRangeMin &&
        max >= largestRangeMin &&
        max <= largestRangeMax
      ) {
        ranges[i] = `${min}-${largestRangeMin - 1}`;
      }

      if (
        min >= largestRangeMin &&
        min <= largestRangeMax &&
        max > largestRangeMax
      ) {
        ranges[i] = `${largestRangeMax + 1}-${max}`;
      }

      if (min >= largestRangeMin && max <= largestRangeMax) {
        ranges[i] = undefined;
      }
    }
  }

  ranges = ranges.filter(
    (range) => range !== undefined && range !== largestRange
  );

  if (ranges.length === 0) {
    return newCount;
  } else {
    return getIds(ranges, largestRange, newCount);
  }
}

async function solution() {
  const { idRanges } = await readTextFile();

  const count = getIds(idRanges, '', 0);

  console.log(count);
}

solution();
