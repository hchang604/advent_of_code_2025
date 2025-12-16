import { readFile } from 'fs/promises';

async function readTextFile(): Promise<{ idRanges: string[], ids: string[] }> {
  const content = await readFile('data.txt', 'utf8');

  const splitContent = content.split(/\r?\n/);

  const blankLineIndex = splitContent.indexOf('');
  
  const idRanges = splitContent.slice(0, blankLineIndex);
  const ids = splitContent.slice(blankLineIndex + 1);

  return { idRanges, ids};
}


async function solution() {
    const { idRanges, ids } = await readTextFile();

    let freshIDsCount = 0;

    for(const id of ids) {
        for(const range of idRanges) {
            const min = Number(range.split('-')[0]);
            const max = Number(range.split('-')[1]);

            if(Number(id) >= min && Number(id) <= max) {
                freshIDsCount++;
                break;
            }
        }
    }

    console.log(freshIDsCount);
}

solution();